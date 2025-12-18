import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { AppointmentCard, Appointment } from "@/components/dashboard/AppointmentCard";
import { 
  Calendar, 
  Clock, 
  Plus,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const appointments: Appointment[] = [
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
  {
    id: "4",
    doctorName: "Dr. Vikram Singh",
    specialty: "Orthopedic",
    date: "Dec 15, 2025",
    time: "3:00 PM",
    status: "completed",
  },
  {
    id: "5",
    doctorName: "Dr. Meera Reddy",
    specialty: "Pediatrician",
    date: "Dec 10, 2025",
    time: "9:00 AM",
    status: "completed",
  },
  {
    id: "6",
    doctorName: "Dr. Suresh Kumar",
    specialty: "General Physician",
    date: "Dec 5, 2025",
    time: "4:00 PM",
    status: "cancelled",
  },
];

export default function PatientAppointments() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleAction = (action: string, id: string) => {
    toast({
      title: `Appointment ${action}`,
      description: `Appointment has been ${action}ed successfully.`,
    });
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch = apt.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
                         apt.specialty?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const upcomingCount = appointments.filter(a => a.status === "pending" || a.status === "confirmed").length;
  const completedCount = appointments.filter(a => a.status === "completed").length;

  return (
    <DashboardLayout role="patient">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            My Appointments
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your medical appointments.
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/patient/appointments/new">
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{upcomingCount}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {appointments.filter(a => a.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {appointments.filter(a => a.status === "cancelled").length}
              </p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by doctor or specialty..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              role="patient"
              onAction={handleAction}
            />
          ))
        ) : (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No appointments found</h3>
            <p className="text-muted-foreground mb-4">
              {search || filter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "You haven't booked any appointments yet."}
            </p>
            <Button variant="hero" asChild>
              <Link to="/patient/appointments/new">
                <Plus className="w-4 h-4 mr-2" />
                Book Your First Appointment
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
