import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Eye, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const { data: contracts = [], isLoading } = trpc.admin.contracts.useQuery();
  const { data: testimonials = [], isLoading: testimonialsLoading } = trpc.admin.testimonials.useQuery();
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const updateStatusMutation = trpc.admin.updateContractStatus.useMutation();
  const approveTestimonialMutation = trpc.admin.approveTestimonial.useMutation();
  const rejectTestimonialMutation = trpc.admin.rejectTestimonial.useMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "converted":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const filteredContracts = statusFilter === "all" 
    ? contracts 
    : contracts.filter((c: any) => c.status === statusFilter);

  const statusCounts = {
    pending: contracts.filter((c: any) => c.status === "pending").length,
    reviewed: contracts.filter((c: any) => c.status === "reviewed").length,
    approved: contracts.filter((c: any) => c.status === "approved").length,
    rejected: contracts.filter((c: any) => c.status === "rejected").length,
  };

  const conversionRate = contracts.length > 0 
    ? ((statusCounts.approved / contracts.length) * 100).toFixed(1)
    : 0;

  const serviceStats = contracts.reduce((acc: Record<string, number>, contract: any) => {
    acc[contract.serviceType] = (acc[contract.serviceType] || 0) + 1;
    return acc;
  }, {});

  const serviceData = Object.entries(serviceStats).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#DC2626", "#1F2937", "#6B7280", "#9CA3AF", "#D1D5DB"];

  const handleStatusChange = async (contractId: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        contractId,
        status: newStatus as "pending" | "reviewed" | "approved" | "rejected",
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleApproveTestimonial = async (testimonialId: number) => {
    try {
      await approveTestimonialMutation.mutateAsync({ testimonialId });
      window.location.reload();
    } catch (error) {
      console.error("Failed to approve testimonial:", error);
    }
  };

  const handleRejectTestimonial = async (testimonialId: number) => {
    try {
      await rejectTestimonialMutation.mutateAsync({ testimonialId });
      window.location.reload();
    } catch (error) {
      console.error("Failed to reject testimonial:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">Loading contracts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage leads, contracts, and testimonials</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{contracts.length}</div>
              <p className="text-xs text-gray-500 mt-1">All submitted contracts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{statusCounts.pending}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
              <p className="text-xs text-gray-500 mt-1">Leads converted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{testimonials.length}</div>
              <p className="text-xs text-gray-500 mt-1">Client reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Status Distribution</CardTitle>
              <CardDescription>Breakdown of all leads by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: "Pending", value: statusCounts.pending },
                  { name: "Reviewed", value: statusCounts.reviewed },
                  { name: "Approved", value: statusCounts.approved },
                  { name: "Rejected", value: statusCounts.rejected },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#DC2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Services by number of inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name || 'Other'}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Contracts Table */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>View and manage all submitted contracts</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : filteredContracts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No contracts found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Client Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.map((contract: any) => (
                      <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{contract.clientName}</p>
                            <p className="text-xs text-gray-500">{contract.clientEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{contract.serviceType}</td>
                        <td className="py-3 px-4 text-gray-600">₹{contract.budget?.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Select value={contract.status} onValueChange={(value) => handleStatusChange(contract.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">
                          {new Date(contract.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContract(contract)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Testimonials Management */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonials Management</CardTitle>
            <CardDescription>Review and approve client testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            {testimonialsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No testimonials yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{testimonial.clientName}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-yellow-500">
                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(testimonial.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                            testimonial.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {testimonial.status}
                          </span>
                        </div>
                      </div>
                      {testimonial.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveTestimonial(testimonial.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectTestimonial(testimonial.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
