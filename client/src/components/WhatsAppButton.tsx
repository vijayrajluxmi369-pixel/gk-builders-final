import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919675429092"; // Gautam's WhatsApp number
  const businessName = "GK Builders";

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in learning more about GK Builders' services.`
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Quick Message Menu */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-2xl p-4 min-w-max mb-2 border border-gray-200 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm font-semibold text-gray-800 mb-3">Quick Messages</p>
            <button
              onClick={() => handleQuickMessage("I want to inquire about your construction services.")}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors mb-2"
            >
              💼 Construction Services
            </button>
            <button
              onClick={() => handleQuickMessage("I need a renovation quote for my property.")}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors mb-2"
            >
              🔨 Renovation Quote
            </button>
            <button
              onClick={() => handleQuickMessage("Can I schedule a site visit?")}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              📅 Schedule Visit
            </button>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us on WhatsApp
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-75"></div>
        </button>

        {/* Alternative Direct Call Button */}
        <button
          onClick={handleWhatsAppClick}
          className="absolute bottom-0 right-16 bg-white border-2 border-green-500 text-green-500 rounded-full p-3 shadow-lg hover:bg-green-50 transition-all duration-300 hidden group-hover:flex items-center justify-center"
          title="Open WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile-optimized WhatsApp CTA */}
      <div className="fixed bottom-20 right-6 z-30 md:hidden">
        <button
          onClick={handleWhatsAppClick}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
      </div>
    </>
  );
}
