import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { FileText, CheckCircle2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceContractForm() {
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    siteAddress: "",
    projectType: "New Construction" as "New Construction" | "Renovation" | "Material Supply",
    projectDescription: "",
    estimatedBudget: "",
    projectStartDate: "",
    agreedToTerms: false,
    termsAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitContractMutation = trpc.contracts.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.clientName || !formData.clientPhone || !formData.clientEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("You must agree to the service terms of GK Builders");
      return;
    }

    if (!formData.termsAgreed) {
      toast.error("You must read and agree to the GK Builders Service Terms");
      return;
    }

    setIsSubmitting(true);

    try {
      const projectStartDate = new Date(formData.projectStartDate);
      if (isNaN(projectStartDate.getTime())) {
        toast.error("Please select a valid project start date");
        setIsSubmitting(false);
        return;
      }

      await submitContractMutation.mutateAsync({
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail,
        siteAddress: formData.siteAddress,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        estimatedBudget: formData.estimatedBudget,
        projectStartDate,
        agreedToTerms: formData.agreedToTerms,
      });

      toast.success("Contract request submitted successfully!");
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        siteAddress: "",
        projectType: "New Construction",
        projectDescription: "",
        estimatedBudget: "",
        projectStartDate: "",
        agreedToTerms: false,
        termsAgreed: false,
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting contract:", error);
      toast.error("Failed to submit contract request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-4xl">
        {/* Header with Language Toggle */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-gray-200'
                }`}
              >
                हिंदी
              </button>
            </div>
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">{t('form.title')}</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            {t('form.subtitle')}
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2 text-lg">✓ Contract Request Submitted Successfully!</h3>
              <p className="text-green-800 font-semibold mb-2">
                GK Builders will contact you within 24 hours
              </p>
              <p className="text-green-700 text-sm">
                We have received your contract request and forwarded it to our team. You will receive a call or email from us shortly to discuss your project details and finalize the contract.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary">
          {/* Client Details Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
              Client Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Site Address */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Site Address *
                </label>
                <input
                  type="text"
                  name="siteAddress"
                  value={formData.siteAddress}
                  onChange={handleChange}
                  placeholder="Enter project site address"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
              Project Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
                >
                  <option value="New Construction">New Construction</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Material Supply">Material Supply</option>
                </select>
              </div>

              {/* Estimated Budget */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Estimated Budget (₹) *
                </label>
                <input
                  type="text"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  placeholder="e.g., 500000"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Project Start Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Project Start Date *
                </label>
                <input
                  type="date"
                  name="projectStartDate"
                  value={formData.projectStartDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Project Description (Optional)
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe your project in detail..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Terms and Conditions Details Section */}
          <div className="mb-8 p-6 bg-white rounded-lg border-2 border-gray-300">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary">
              GK Builders Service Terms & Conditions
            </h3>
            <div className="space-y-4 mb-6">
              {/* Payment Schedule */}
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Payment Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment shall be made as follows: (1) 20% advance payable upon signing the contract; (2) 70% progress payment to be paid in installments during the construction process as milestones are met, and must be cleared before the project is completed; (3) 10% final payment payable after final inspection and approval. Accepted payment methods include Bank Transfer, Cheque, or Cash. All payments must be made to GK Builders. Bank details will be provided upon contract finalization.
                  </p>
                </div>
              </div>

              {/* Material Quality */}
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Material Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    GK Builders commits to using only premium quality materials as per industry standards. All materials will be sourced from authorized suppliers and will include proper warranties. The client has the right to inspect all materials before installation.
                  </p>
                </div>
              </div>

              {/* Project Timeline */}
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Project Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    The project timeline mentioned in this contract is an estimate. GK Builders will make reasonable efforts to complete the project on schedule. However, delays due to weather, unforeseen circumstances, or client-requested changes may extend the timeline. The client will be notified of any delays in advance.
                  </p>
                </div>
              </div>

              {/* Site Access Requirements */}
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site Access Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    The client must provide safe and unobstructed access to the project site during working hours (8:00 AM - 6:00 PM). GK Builders is not responsible for any damage to existing structures or belongings on the site. The client must ensure proper site security after working hours.
                  </p>
                </div>
              </div>

              {/* Design Changes */}
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Design Changes</h4>
                  <p className="text-sm text-muted-foreground">
                    Any changes to the original design or scope of work must be approved in writing by both parties. Design changes may result in additional costs and timeline extensions. GK Builders will provide a revised quote for any approved changes within 48 hours of the request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Checkboxes Section */}
          <div className="mb-8 space-y-4">
            {/* First Checkbox - Service Terms */}
            <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 accent-primary rounded border-2 border-gray-300"
                />
                <span className="text-sm text-foreground">
                  <span className="font-semibold">I agree to the service terms of GK Builders *</span>
                  <br />
                  <span className="text-muted-foreground">
                    By checking this box, you confirm that you have read and agree to our service terms, conditions, and privacy policy. GK Builders will use your information to prepare and execute the service contract.
                  </span>
                </span>
              </label>
            </div>

            {/* Second Checkbox - Terms Agreement */}
            <div className="p-6 bg-red-50 rounded-lg border-2 border-red-300">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 accent-primary rounded border-2 border-gray-300"
                  required
                />
                <span className="text-sm text-foreground">
                  <span className="font-semibold text-red-900">I have read and agree to the GK Builders Service Terms *</span>
                  <br />
                  <span className="text-red-800">
                    This is a mandatory requirement. By checking this box, you acknowledge that you have thoroughly read and understood all the terms and conditions listed above, and you agree to comply with them throughout the project duration.
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit Contract Request"}
            </Button>
            <Button
              type="reset"
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-foreground hover:bg-gray-100 font-bold py-3 rounded-lg transition-all"
              onClick={() => {
                setFormData({
                  clientName: "",
                  clientPhone: "",
                  clientEmail: "",
                  siteAddress: "",
                  projectType: "New Construction",
                  projectDescription: "",
                  estimatedBudget: "",
                  projectStartDate: "",
                  agreedToTerms: false,
                  termsAgreed: false,
                });
              }}
            >
              Clear Form
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> All fields marked with * are required. Our team will review your submission and contact you within 24 business hours to finalize the contract.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
