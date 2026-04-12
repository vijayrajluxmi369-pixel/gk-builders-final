import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = trpc.testimonials.getApproved.useQuery();

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real testimonials from satisfied customers who trusted GK Builders with their construction projects
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any) => (
              <Card key={testimonial.id} className="p-8 hover:shadow-lg transition duration-300">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "fill-red-600 text-red-600"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 italic">"{testimonial.reviewText}"</p>

                {/* Client Info */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900">{testimonial.clientName}</h3>
                  <p className="text-sm text-gray-600">{testimonial.clientLocation}</p>
                  <p className="text-sm text-red-600 font-medium mt-2">{testimonial.projectType}</p>
                  {testimonial.projectDescription && (
                    <p className="text-sm text-gray-600 mt-2">{testimonial.projectDescription}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
