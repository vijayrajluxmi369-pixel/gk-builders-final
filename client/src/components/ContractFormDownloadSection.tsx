import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CONTRACT_PDF_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/contract-form_4fd0d6aa.pdf";

export default function ContractFormDownloadSection() {
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = async () => {
    try {
      setDownloadState("loading");
      setErrorMessage("");

      // Fetch the PDF file
      const response = await fetch(CONTRACT_PDF_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Get the blob
      const blob = await response.blob();

      // Check if blob is valid
      if (blob.size === 0) {
        throw new Error("Downloaded file is empty");
      }

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "GK-Builders-Contract-Form.pdf";
      link.style.display = "none";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);

      // Show success message
      setDownloadState("success");
      setTimeout(() => {
        setDownloadState("idle");
      }, 3000);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadState("error");
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Download failed. Please try again or contact us."
      );

      // Reset error state after 5 seconds
      setTimeout(() => {
        setDownloadState("idle");
        setErrorMessage("");
      }, 5000);

      // Fallback: try to open in new tab
      try {
        window.open(CONTRACT_PDF_URL, "_blank");
      } catch (fallbackError) {
        console.error("Fallback open failed:", fallbackError);
      }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-5xl">
        {/* Main Container with white space */}
        <div className="flex flex-col items-center justify-center gap-12 px-4 md:px-8">
          {/* Decorative top line */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>

          {/* Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Get Your Contract Form
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download our professional contract form and start your project journey with GK Builders
            </p>
          </div>

          {/* Download Button with Status */}
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleDownload}
              disabled={downloadState === "loading"}
              className="group relative h-auto px-8 py-6 md:px-12 md:py-8 bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-white font-bold text-lg md:text-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {downloadState === "loading" ? (
                  <div className="w-8 h-8 md:w-10 md:h-10 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : downloadState === "success" ? (
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 animate-bounce" />
                ) : downloadState === "error" ? (
                  <AlertCircle className="w-8 h-8 md:w-10 md:h-10" />
                ) : (
                  <Download className="w-8 h-8 md:w-10 md:h-10" />
                )}
              </div>

              {/* Button Text - Bilingual */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm md:text-base font-semibold opacity-90">
                  {downloadState === "loading"
                    ? "डाउनलोड हो रहा है..."
                    : downloadState === "success"
                    ? "डाउनलोड पूर्ण!"
                    : downloadState === "error"
                    ? "डाउनलोड विफल"
                    : "डाउनलोड कॉन्ट्रैक्ट फॉर्म"}
                </span>
                <span className="text-base md:text-lg font-bold">
                  {downloadState === "loading"
                    ? "Downloading..."
                    : downloadState === "success"
                    ? "Download Complete!"
                    : downloadState === "error"
                    ? "Download Failed"
                    : "Download Contract Form"}
                </span>
              </div>

              {/* Decorative arrow */}
              {downloadState === "idle" && (
                <div className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              )}
            </Button>

            {/* Error Message */}
            {downloadState === "error" && errorMessage && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 w-full max-w-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Download Failed</p>
                  <p className="text-xs text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {downloadState === "success" && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 w-full max-w-md">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Download Successful!</p>
                  <p className="text-xs text-green-700">Your contract form is ready to use</p>
                </div>
              </div>
            )}
          </div>

          {/* Bilingual Instructions */}
          <div className="text-center space-y-4 max-w-2xl">
            <p className="text-base md:text-lg text-foreground font-medium">
              कृपया फॉर्म भरें और हमें जमा करें।
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Please fill the form and submit to us.
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6 w-full mt-8">
            {/* Info Card 1 */}
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-foreground text-center">
                Download Form
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Click the button above to download the PDF form
              </p>
            </div>

            {/* Info Card 2 */}
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-foreground text-center">
                Fill Details
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Complete all required fields with your project information
              </p>
            </div>

            {/* Info Card 3 */}
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-foreground text-center">
                Submit
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Submit your form and we'll contact you within 24 hours
              </p>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 max-w-2xl text-center">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> If the download doesn't start automatically, the file will open in a new tab. You can save it from there.
            </p>
          </div>

          {/* Decorative bottom line */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
