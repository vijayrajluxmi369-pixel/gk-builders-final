import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Send, CheckCircle } from "lucide-react";

interface TestimonialData {
  id: number;
  clientName: string;
  clientLocation: string;
  reviewText: string;
  rating: number;
  projectType: string;
  projectDescription?: string | null;
  clientImageUrl?: string | null;
  isApproved: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Testimonials() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientLocation: "",
    reviewText: "",
    rating: 5,
    projectType: "House Construction",
    projectDescription: "",
  });

  const { data: testimonials = [], isLoading, refetch } = trpc.testimonials.getApproved.useQuery();
  const submitMutation = trpc.testimonials.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMutation.mutateAsync({
        clientName: formData.clientName,
        clientLocation: formData.clientLocation,
        reviewText: formData.reviewText,
        rating: formData.rating,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription || undefined,
      });

      setSubmitSuccess(true);
      setFormData({
        clientName: "",
        clientLocation: "",
        reviewText: "",
        rating: 5,
        projectType: "House Construction",
        projectDescription: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
        refetch();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-600">
            Hear from our satisfied clients about their experience with GK Builders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Testimonials List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : testimonials.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500 mb-4">No testimonials yet. Be the first to share your experience!</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {testimonials.map((testimonial: TestimonialData) => (
                  <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {testimonial.clientName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{testimonial.clientName}</h3>
                          <p className="text-sm text-gray-500">{testimonial.clientLocation}</p>
                          <div className="mt-2">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.reviewText}</p>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">Project:</span> {testimonial.projectType}
                        </p>
                        {testimonial.projectDescription && (
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold text-gray-900">Details:</span> {testimonial.projectDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Verified Client</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Submission Form */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Tell us about your project with GK Builders</CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="font-semibold text-gray-900 mb-2">Thank You!</p>
                    <p className="text-sm text-gray-600">
                      Your testimonial has been submitted and will be reviewed by our team.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Location *
                      </label>
                      <Input
                        type="text"
                        name="clientLocation"
                        value={formData.clientLocation}
                        onChange={handleInputChange}
                        placeholder="Your city/area"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Rating *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleSelectChange(star.toString(), "rating")}
                            className="focus:outline-none transition"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formData.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Service Type *
                      </label>
                      <Select value={formData.projectType} onValueChange={(value) => handleSelectChange(value, "projectType")}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="House Construction">House Construction</SelectItem>
                          <SelectItem value="Renovation">Renovation</SelectItem>
                          <SelectItem value="Tiles & Marble">Tiles & Marble</SelectItem>
                          <SelectItem value="Painting & Plaster">Painting & Plaster</SelectItem>
                          <SelectItem value="Electrical Work">Electrical Work</SelectItem>
                          <SelectItem value="Material Supply">Material Supply</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Your Review *
                      </label>
                      <Textarea
                        name="reviewText"
                        value={formData.reviewText}
                        onChange={handleInputChange}
                        placeholder="Share your experience with GK Builders (minimum 10 characters)"
                        required
                        minLength={10}
                        className="w-full h-24 resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.reviewText.length} characters
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Project Details (Optional)
                      </label>
                      <Textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your project briefly"
                        className="w-full h-20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || formData.reviewText.length < 10}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Your testimonial will be reviewed before appearing on our website.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{testimonials.length}+</div>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {testimonials.length > 0
                    ? (
                        testimonials.reduce((sum: number, t: TestimonialData) => sum + t.rating, 0) /
                        testimonials.length
                      ).toFixed(1)
                    : "N/A"}
                </div>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
