import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentCard, Appointment } from "@/components/dashboard/AppointmentCard";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  FileText,
  Activity
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Neha Verma",
    type: "Regular Checkup",
    date: "Today",
    time: "9:00 AM",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Amit Desai",
    type: "Follow-up",
    date: "Today",
    time: "10:30 AM",
    status: "completed",
  },
  {
    id: "3",
    patientName: "Kavita Nair",
    type: "Consultation",
    date: "Today",
    time: "11:00 AM",
    status: "confirmed",
  },
  {
    id: "4",
    patientName: "Rahul Mehta",
    type: "Emergency",
    date: "Today",
    time: "2:00 PM",
    status: "pending",
  },
  {
    id: "5",
    patientName: "Pooja Iyer",
    type: "Regular Checkup",
    date: "Today",
    time: "3:30 PM",
    status: "confirmed",
  },
];

const initialPatients = [
  { name: "Neha Verma", lastVisit: "Today", condition: "Hypertension" },
  { name: "Amit Desai", lastVisit: "Today", condition: "Diabetes" },
  { name: "Sanjay Kapoor", lastVisit: "Yesterday", condition: "Arthritis" },
  { name: "Deepika Rao", lastVisit: "2 days ago", condition: "Migraine" },
];

export default function DoctorDashboard() {
  const { toast } = useToast();

  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [patients, setPatients] = useState(initialPatients);
  const [doctorName, setDoctorName] = useState<string>("Dr. Sharma");
  const navigate = useNavigate();

  // Attendance state
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [attendanceTime, setAttendanceTime] = useState<string>("");

  // Patient detail dialog
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);

  // Load doctor/user name from localStorage (if registered)
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.firstName) {
          const title = `Dr. ${u.lastName || u.firstName}`;
          setDoctorName(title);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Load attendance from localStorage
  useEffect(() => {
    const attendance = localStorage.getItem("doctorAttendance");
    if (attendance) {
      try {
        const a = JSON.parse(attendance);
        setIsPresent(Boolean(a.present));
        setAttendanceTime(a.time || "");
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const todaysAppointmentsCount = appointments.length;
  const totalPatients = patients.length;
  const pendingConsultations = appointments.filter((a) => a.status === "pending").length;
  const completedToday = appointments.filter((a) => a.status === "completed").length;

  const stats = [
    { title: "Today's Appointments", value: todaysAppointmentsCount, icon: Calendar, variant: "primary" as const },
    { title: "Total Patients", value: totalPatients, icon: Users, variant: "success" as const },
    { title: "Pending Consultations", value: pendingConsultations, icon: Clock, variant: "warning" as const },
    { title: "Completed Today", value: completedToday, icon: CheckCircle, variant: "accent" as const },
  ];

  const handleAppointmentAction = (action: string, id: string) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        if (action === "confirm") return { ...a, status: "confirmed" };
        if (action === "cancel") return { ...a, status: "cancelled" };
        if (action === "complete") return { ...a, status: "completed" };
        return a;
      })
    );

    // If confirming/completing, ensure patient exists in recent list
    if (action === "confirm" || action === "complete") {
      const appt = appointments.find((a) => a.id === id);
      if (appt && appt.patientName) {
        setPatients((prev) => {
          const exists = prev.some((p) => p.name === appt.patientName);
          if (exists) return prev;
          return [{ name: appt.patientName, lastVisit: "Today", condition: appt.type || "" }, ...prev];
        });
      }
    }

    toast({
      title: `Appointment ${action}`,
      description: `Appointment ID: ${id} has been ${action}ed.`,
    });
  };

  const toggleAttendance = () => {
    if (!isPresent) {
      const time = new Date().toLocaleString();
      setIsPresent(true);
      setAttendanceTime(time);
      localStorage.setItem("doctorAttendance", JSON.stringify({ present: true, time }));
      toast({ title: "Attendance marked", description: `Marked present at ${time}` });
    } else {
      setIsPresent(false);
      setAttendanceTime("");
      localStorage.setItem("doctorAttendance", JSON.stringify({ present: false }));
      toast({ title: "Attendance cleared", description: "Your attendance has been cleared." });
    }
  };

  const openPatient = (patient: any) => {
    setSelectedPatient(patient);
    setPatientDialogOpen(true);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "prescription":
        toast({ title: "Prescription", description: "Opening prescription editor..." });
        // navigate to page if exists
        // navigate('/doctor/prescriptions');
        break;
      case "diagnosis":
        toast({ title: "Diagnosis", description: "Open diagnosis form..." });
        break;
      case "records":
        navigate("/doctor/patients");
        break;
    }
  };

  return (
    <DashboardLayout role="doctor">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Good morning, {doctorName}! 👨‍⚕️
        </h1>
        <p className="text-muted-foreground">
          You have {todaysAppointmentsCount} appointments scheduled for today.
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
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Today's Schedule
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/doctor/appointments">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  role="doctor"
                  onAction={handleAppointmentAction}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Attendance */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Attendance
            </h2>
              <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">{isPresent ? "Marked Present" : "Not Marked"}</p>
              <p className="text-sm text-muted-foreground">{isPresent ? attendanceTime : "--"}</p>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={toggleAttendance}>
              {isPresent ? "Clear Attendance" : "Mark Present"}
            </Button>
          </div>

          {/* Recent Patients */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Recent Patients
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/doctor/patients">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {patients.map((patient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => openPatient(patient)}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {patient.lastVisit}
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
              <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('prescription')}>
                <FileText className="w-4 h-4 mr-2" />
                Write Prescription
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('diagnosis')}>
                <Activity className="w-4 h-4 mr-2" />
                Add Diagnosis
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction('records')}>
                <Users className="w-4 h-4 mr-2" />
                Patient Records
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Patient Details Dialog */}
      <Dialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>View basic patient information.</DialogDescription>
          </DialogHeader>
          {selectedPatient ? (
            <div className="mt-4">
              <p className="font-medium text-foreground">{selectedPatient.name}</p>
              <p className="text-sm text-muted-foreground">Last Visit: {selectedPatient.lastVisit}</p>
              <p className="text-sm text-muted-foreground">Condition: {selectedPatient.condition}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={() => { setPatientDialogOpen(false); navigate('/doctor/patients'); }}>
                  View Full Record
                </Button>
                <Button variant="hero" onClick={() => { setPatientDialogOpen(false); toast({ title: 'Starting consultation', description: `Starting consultation for ${selectedPatient.name}` }); }}>
                  Start Consultation
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No patient selected.</p>
          )}
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
