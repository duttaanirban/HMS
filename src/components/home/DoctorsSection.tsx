import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Stethoscope, Brain, Heart, Bone, Eye, Baby } from "lucide-react";

const specialties = [
  { icon: Heart, name: "Cardiology", count: 24 },
  { icon: Brain, name: "Neurology", count: 18 },
  { icon: Bone, name: "Orthopedics", count: 21 },
  { icon: Eye, name: "Ophthalmology", count: 15 },
  { icon: Baby, name: "Pediatrics", count: 28 },
  { icon: Stethoscope, name: "General", count: 45 },
];

const featuredDoctors = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.9,
    reviews: 328,
    available: true,
    image: "/placeholder.svg",
  },
  {
    name: "Dr. Rajesh Patel",
    specialty: "Neurologist",
    experience: "12 years",
    rating: 4.8,
    reviews: 256,
    available: true,
    image: "/placeholder.svg",
  },
  {
    name: "Dr. Ananya Gupta",
    specialty: "Pediatrician",
    experience: "10 years",
    rating: 4.9,
    reviews: 412,
    available: false,
    image: "/placeholder.svg",
  },
  {
    name: "Dr. Vikram Singh",
    specialty: "Orthopedic",
    experience: "18 years",
    rating: 4.7,
    reviews: 189,
    available: true,
    image: "/placeholder.svg",
  },
];

export function DoctorsSection() {
  return (
    <section id="doctors" className="py-20 lg:py-32 gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Doctors
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our{" "}
            <span className="text-gradient">Expert Specialists</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our team of highly qualified doctors is dedicated to providing the best 
            healthcare services with compassion and expertise.
          </p>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {specialties.map((specialty) => (
            <button
              key={specialty.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <specialty.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{specialty.name}</span>
              <span className="text-xs text-muted-foreground">({specialty.count})</span>
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredDoctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Doctor Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <div className="absolute inset-0 gradient-primary opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <Stethoscope className="w-12 h-12 text-primary" />
                  </div>
                </div>
                {doctor.available && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-success text-success-foreground text-xs font-medium">
                    Available
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">{doctor.specialty}</p>
                <p className="text-xs text-muted-foreground mb-3">{doctor.experience} experience</p>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/register">
              View All Doctors
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
