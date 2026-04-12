import { useState } from "react";
import { Building2, Hammer, Package, ChevronDown } from "lucide-react";

interface PortfolioItem {
  id: string;
  category: "homes" | "construction" | "materials";
  title: string;
  caption: string;
  image: string;
  focus: "Durability" | "Expertise" | "Customer Trust";
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "home-1",
    category: "homes",
    title: "Modern Luxury Home",
    caption: "Premium residential construction showcasing durability and expert craftsmanship in Rishikesh",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-completed-home-1-327rSuuzQ2rLdYdtw4gsc2.webp",
    focus: "Durability",
  },
  {
    id: "home-2",
    category: "homes",
    title: "Luxury Stone Residence",
    caption: "Built with premium materials and expert attention to detail, trusted by Rishikesh families",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-completed-home-2-gwi8FHDtdViUbf4yNR3n74.webp",
    focus: "Customer Trust",
  },
  {
    id: "construction-1",
    category: "construction",
    title: "Multi-Story Commercial Project",
    caption: "Professional construction expertise with organized site management and quality standards",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-ongoing-construction-1-adBocpWq35hAqUEfPBTKhX.webp",
    focus: "Expertise",
  },
  {
    id: "construction-2",
    category: "construction",
    title: "Residential Complex Under Development",
    caption: "Modern construction techniques ensuring durability and quality in every phase",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-ongoing-construction-2-HNFY9V3rBgUn5FrZSYtzdS.webp",
    focus: "Durability",
  },
  {
    id: "materials-1",
    category: "materials",
    title: "Premium Material Collection",
    caption: "High-quality tiles, marble, and bricks trusted by builders across Rishikesh",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-material-supply-1-NaqSuVjw4DU6kM8YyAj5Fd.webp",
    focus: "Customer Trust",
  },
  {
    id: "materials-2",
    category: "materials",
    title: "Exclusive Material Showroom",
    caption: "Comprehensive range of durable, premium construction materials for all projects",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-material-supply-2-Q4Vswci9gnvVD4xTZN3Sag.webp",
    focus: "Expertise",
  },
];

const categories = [
  { id: "homes", label: "Completed Homes", icon: Building2 },
  { id: "construction", label: "Ongoing Construction Sites", icon: Hammer },
  { id: "materials", label: "Building Material Supply", icon: Package },
];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<"homes" | "construction" | "materials">("homes");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = portfolioItems.filter((item) => item.category === activeCategory);

  const getFocusColor = (focus: string) => {
    switch (focus) {
      case "Durability":
        return "bg-red-100 text-red-700";
      case "Expertise":
        return "bg-blue-100 text-blue-700";
      case "Customer Trust":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Work Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our expertise, durability, and the trust our clients place in GK Builders across Rishikesh
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as "homes" | "construction" | "materials")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-foreground border-2 border-gray-200 hover:border-primary"
                }`}
              >
                <Icon className="w-5 h-5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getFocusColor(item.focus)}`}>
                    {item.focus}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-2">{item.caption}</p>
              </div>

              {/* Expand Indicator */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/40 transition-all">
                <ChevronDown className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Expanded View */}
        {expandedId && (
          <div className="mt-12 bg-white rounded-xl shadow-2xl p-8 border-l-4 border-primary">
            {(() => {
              const item = portfolioItems.find((i) => i.id === expandedId);
              return item ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="mb-4">
                      <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getFocusColor(item.focus)}`}>
                        Focus: {item.focus}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-4">{item.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{item.caption}</p>
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                      <h3 className="font-bold text-foreground mb-3">Why Choose GK Builders?</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">✓</span>
                          <span>Built with premium materials ensuring long-term durability</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">✓</span>
                          <span>Expert team with years of construction experience in Rishikesh</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary font-bold">✓</span>
                          <span>Trusted by hundreds of satisfied clients and families</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg mb-6">Join hundreds of satisfied clients who trust GK Builders</p>
            <a
              href="/contract"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Get Your Free Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
