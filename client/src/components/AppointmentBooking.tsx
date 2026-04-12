import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  location: string;
  notes: string;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const serviceTypes = [
  "Site Consultation",
  "Project Quotation",
  "Design Discussion",
  "Material Selection",
  "Progress Review",
  "Other",
];

export default function AppointmentBooking() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    serviceType: "Site Consultation",
    location: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create WhatsApp message
      const message = `Hello! I'd like to book an appointment:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.serviceType}\nDate: ${formData.date}\nTime: ${formData.time}\nLocation: ${formData.location}\n\nNotes: ${formData.notes || "None"}`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/919675429092?text=${encodedMessage}`, "_blank");

      toast.success("Appointment request sent! Check WhatsApp for confirmation.");
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        serviceType: "Site Consultation",
        location: "",
        notes: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Book a Consultation</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Schedule a meeting with our team to discuss your construction project
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✓ Appointment Request Sent!</h3>
            <p className="text-green-800">
              Your appointment request has been sent via WhatsApp. Our team will confirm your booking shortly.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
              Your Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Project Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter project location"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
              Appointment Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us more about your project or any specific requirements..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  date: "",
                  time: "",
                  serviceType: "Site Consultation",
                  location: "",
                  notes: "",
                });
              }}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </Button>
          </div>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Note:</strong> After booking, you'll be redirected to WhatsApp to confirm your appointment with our team.
            </p>
          </div>
        </form>

        {/* Why Book With Us */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-bold text-foreground mb-2">Quick Response</h4>
            <p className="text-sm text-muted-foreground">
              Get a response within 2 hours during business hours
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">📍</div>
            <h4 className="font-bold text-foreground mb-2">Flexible Timing</h4>
            <p className="text-sm text-muted-foreground">
              Choose from multiple time slots that work for you
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">👥</div>
            <h4 className="font-bold text-foreground mb-2">Expert Team</h4>
            <p className="text-sm text-muted-foreground">
              Consult with our experienced construction professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
