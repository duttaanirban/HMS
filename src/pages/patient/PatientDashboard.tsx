import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentCard, Appointment } from "@/components/dashboard/AppointmentCard";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  CreditCard, 
  Activity,
  Plus,
  ArrowRight,
  Pill,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Upcoming Appointments", value: 3, icon: Calendar, variant: "primary" as const },
  { title: "Medical Records", value: 12, icon: FileText, variant: "success" as const },
  { title: "Prescriptions", value: 5, icon: Pill, variant: "warning" as const },
  { title: "Pending Bills", value: "₹245", icon: CreditCard, variant: "accent" as const },
];

const upcomingAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    date: "Dec 20, 2025",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "2",
    doctorName: "Dr. Rajesh Patel",
    specialty: "Neurologist",
    date: "Dec 22, 2025",
    time: "2:30 PM",
    status: "pending",
  },
  {
    id: "3",
    doctorName: "Dr. Ananya Gupta",
    specialty: "Dermatologist",
    date: "Dec 28, 2025",
    time: "11:00 AM",
    status: "confirmed",
  },
];

const healthMetrics = [
  { label: "Blood Pressure", value: "120/80", status: "normal", icon: Activity },
  { label: "Heart Rate", value: "72 BPM", status: "normal", icon: Heart },
  { label: "Blood Sugar", value: "95 mg/dL", status: "normal", icon: Activity },
];

export default function PatientDashboard() {
  return (
    <DashboardLayout role="patient">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your health dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointments Section */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Upcoming Appointments
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/patient/appointments">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  role="patient"
                />
              ))}
            </div>

            <Button className="w-full mt-4" variant="hero" asChild>
              <Link to="/patient/appointments/new">
                <Plus className="w-4 h-4 mr-2" />
                Book New Appointment
              </Link>
            </Button>
          </div>
        </div>

        {/* Health Metrics & Quick Actions */}
        <div className="space-y-6">
          {/* Health Metrics */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Health Metrics
            </h2>
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="font-semibold text-foreground">{metric.value}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium capitalize">
                    {metric.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/patient/records">
                  <FileText className="w-4 h-4 mr-2" />
                  View Medical Records
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/patient/medications">
                  <Pill className="w-4 h-4 mr-2" />
                  My Medications
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/patient/billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Bills
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
