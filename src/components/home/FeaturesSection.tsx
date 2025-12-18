import { 
  Calendar, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  CreditCard,
  Activity,
  Bell
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Appointment Booking",
    description: "Schedule appointments with your preferred doctors in just a few clicks. Get instant confirmations and reminders.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Digital Medical Records",
    description: "Access your complete medical history, prescriptions, and test reports anytime, anywhere—securely stored in the cloud.",
    color: "success",
  },
  {
    icon: Users,
    title: "Expert Doctor Network",
    description: "Connect with over 200 verified specialists across multiple departments. Read reviews and choose the best care.",
    color: "info",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is protected with enterprise-grade encryption and strict privacy protocols.",
    color: "warning",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Access your dashboard, schedule appointments, and view records anytime—no waiting required.",
    color: "accent",
  },
  {
    icon: CreditCard,
    title: "Transparent Billing",
    description: "View itemized bills, track payments, and manage transactions with complete transparency.",
    color: "primary",
  },
  {
    icon: Activity,
    title: "Health Tracking",
    description: "Monitor your health metrics, track medications, and receive personalized health insights.",
    color: "success",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get timely reminders for appointments, medications, and important health updates.",
    color: "info",
  },
];

const colorMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/10 text-accent",
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for{" "}
            <span className="text-gradient">Better Healthcare</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform provides all the tools you need to manage your 
            healthcare journey efficiently and securely.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
