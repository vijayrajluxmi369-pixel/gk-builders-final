import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Zap, Hammer, Palette, Wrench, RefreshCw, Sparkles, Home, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import AppointmentBooking from "@/components/AppointmentBooking";


/**
 * GK Builders - Premium Construction Company Website
 * Design: Modern Minimalism with Industrial Strength
 * Color Theme: Red (#DC2626), Black (#1F2937), White (#FFFFFF)
 * Typography: Poppins (headings), Inter (body)
 */

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const services: Service[] = [
  {
    id: "house-construction",
    title: "House Construction",
    description: "Complete residential construction from foundation to finishing, with premium quality and attention to detail.",
    icon: <Home className="w-8 h-8 text-primary" />,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/service-house-construction-hi29fVqRK9UPqHpMWR5Wmn.webp",
  },
  {
    id: "renovation",
    title: "Renovation Work",
    description: "Expert renovation and remodeling services to transform your existing spaces with modern design.",
    icon: <RefreshCw className="w-8 h-8 text-primary" />,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/service-renovation-oEBG4vyAkvrgLutd7hgVXi.webp",
  },
  {
    id: "tiles-marble",
    title: "Tiles & Marble Work",
    description: "Premium tile and marble installation with expert craftsmanship for luxurious finishes.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/service-tiles-marble-DqBGrTDL6GMBYTGiaefkRq.webp",
  },
  {
    id: "painting-plaster",
    title: "Painting & Plaster",
    description: "Professional painting and plastering services for perfect wall finishes and aesthetic appeal.",
    icon: <Palette className="w-8 h-8 text-primary" />,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/service-renovation-oEBG4vyAkvrgLutd7hgVXi.webp",
  },
  {
    id: "electrical",
    title: "Electrical Work",
    description: "Expert electrical installation and maintenance services with modern safety standards.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/service-electrical-UXqiyP6KGfr9rrGBxWDaz7.webp",
  },
];

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return Array.from(newSet);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message
    const message = `Hello, I'm ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919675429092?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const isVisible = (id: string) => visibleSections.includes(id);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">GK Builders</h1>
              <p className="text-xs text-muted-foreground">Civil Contractor</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="/portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="/testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            {isAuthenticated && <a href="/admin" className="text-foreground hover:text-primary transition-colors">Admin</a>}
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <a href={getLoginUrl()} className="btn-primary md:block hidden">Call Now</a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative h-screen md:h-96 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/hero-banner-main-DaG9fLp2vUoUz8p2HHQbtU.webp"
          alt="Construction Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Quality Construction, Trusted Service</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">Professional civil contractor providing premium construction and renovation services</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">Contact Now</a>
              <a href="https://wa.me/919675429092?text=Hello%20GK%20Builders" target="_blank" rel="noopener noreferrer" className="btn-secondary bg-white text-primary hover:bg-gray-100">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate className={`py-20 bg-white transition-opacity duration-700 ${isVisible("about") ? "opacity-100" : "opacity-0"}`}>
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto mb-4"></div>
            <h2 className="text-heading-md mb-4">About GK Builders</h2>
            <p className="text-lg text-muted-foreground">Trusted contractor providing quality construction and renovation services</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-heading-sm mb-4">Gautam Kumar</h3>
              <p className="text-lg font-semibold text-primary mb-4">Civil Contractor</p>
              <p className="text-foreground mb-4 leading-relaxed">
                With years of experience in the construction industry, Gautam Kumar has established GK Builders as a trusted name in civil construction and renovation services. Our commitment to quality, timely delivery, and customer satisfaction sets us apart.
              </p>
              <p className="text-foreground leading-relaxed">
                We specialize in residential construction, renovation work, premium finishes, and electrical installations. Every project is executed with precision, professionalism, and attention to detail.
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Hammer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Years of Experience</h4>
                    <p className="text-muted-foreground">Proven track record in construction excellence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Professional Team</h4>
                    <p className="text-muted-foreground">Skilled and certified construction professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Quality Assurance</h4>
                    <p className="text-muted-foreground">Premium materials and meticulous workmanship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" data-animate className={`py-20 bg-gray-50 transition-opacity duration-700 ${isVisible("services") ? "opacity-100" : "opacity-0"}`}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-4"></div>
            <h2 className="text-heading-md mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Comprehensive construction solutions tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border rounded-lg bg-white ${
                  isVisible("services") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible("services") ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <a href="#contact" className="text-primary font-semibold hover:gap-2 inline-flex items-center gap-1 transition-all">
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <AppointmentBooking />

      {/* Contact Section */}
      <section id="contact" data-animate className={`py-20 bg-white transition-opacity duration-700 ${isVisible("contact") ? "opacity-100" : "opacity-0"}`}>
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-4"></div>
            <h2 className="text-heading-md mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Ready to start your construction project? Contact us today</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a href="tel:09627506169" className="text-primary hover:underline text-lg">
                    09627506169
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-foreground">Rishikesh, Uttarakhand, India</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                  <a href="https://wa.me/919675429092?text=Hello%20GK%20Builders" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Chat with us
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">Scan to chat with Gautam Kumar on WhatsApp</p>
                  <img 
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/whatsapp-qr-code_3de2443c.png" 
                    alt="WhatsApp QR Code" 
                    className="w-32 h-32 border-2 border-primary rounded-lg p-2 bg-white shadow-sm"
                  />
                </div>
              </div>
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:09627506169" className="btn-primary text-sm py-2 px-4">Call Now</a>
                  <a href="https://wa.me/919675429092?text=Hello%20GK%20Builders" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-4">WhatsApp</a>
                  <a href="/contract" className="bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2"><FileText className="w-4 h-4" />Contract Form</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    placeholder="Tell us about your project"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message via WhatsApp
                </button>
                {formSubmitted && (
                  <p className="text-green-600 text-sm text-center">Message sent! Opening WhatsApp...</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Hammer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">GK Builders</h3>
              </div>
              <p className="text-gray-300">Trusted contractor providing quality construction and renovation services.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300 mb-2">Phone: <a href="tel:9675429092" className="text-primary hover:underline">9675429092</a></p>
              <p className="text-gray-300">Location: Rishikesh, Uttarakhand, India</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="text-lg font-semibold text-primary mb-2">Kaam mein quality aur bharosa</p>
            <p>&copy; 2026 GK Builders. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a
        href="tel:9675429092"
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 md:hidden"
        title="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
