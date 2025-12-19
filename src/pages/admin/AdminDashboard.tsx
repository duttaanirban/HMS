import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Stethoscope,
  Calendar, 
  DollarSign,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  FileText,
  LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface DoctorApproval {
  id: number;
  name: string;
  specialty: string;
  submitted: string;
}

interface Activity {
  icon: typeof UserPlus;
  text: string;
  time: string;
  type: "success" | "warning" | "info";
}

interface StatItem {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "accent";
  trend?: { value: number; isPositive: boolean };
}

const activityTypeStyles = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

const initialActivities: Activity[] = [
  { icon: UserPlus, text: "New patient registered: Emily Davis", time: "10 mins ago", type: "success" },
  { icon: Calendar, text: "12 new appointments scheduled", time: "30 mins ago", type: "info" },
  { icon: DollarSign, text: "Payment received: ₹450", time: "1 hour ago", type: "success" },
  { icon: AlertCircle, text: "Low stock alert: Medical supplies", time: "2 hours ago", type: "warning" },
  { icon: Stethoscope, text: "Dr. Sarah Johnson marked present", time: "3 hours ago", type: "info" },
];

const departmentStats = [
  { name: "Cardiology", patients: 342, doctors: 8, revenue: "₹28,450" },
  { name: "Neurology", patients: 256, doctors: 6, revenue: "₹22,100" },
  { name: "Orthopedics", patients: 298, doctors: 7, revenue: "₹25,800" },
  { name: "Pediatrics", patients: 412, doctors: 10, revenue: "₹18,900" },
];

export default function AdminDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState<DoctorApproval[]>([
    { id: 1, name: "Dr. Dhoni Singh", specialty: "Orthopedic", submitted: "2 hours ago" },
    { id: 2, name: "Dr. Suresh Raina", specialty: "Pediatrics", submitted: "5 hours ago" },
    { id: 3, name: "Dr. Virat Kohli", specialty: "Cardiology", submitted: "1 day ago" },
  ]);

  const [recentActivities, setRecentActivities] = useState<Activity[]>(initialActivities);
  
  const [stats, setStats] = useState<StatItem[]>([
    { 
      title: "Total Patients", 
      value: "2,847", 
      icon: Users, 
      variant: "primary" as const,
      trend: { value: 12, isPositive: true }
    },
    { 
      title: "Active Doctors", 
      value: 48, 
      icon: Stethoscope, 
      variant: "success",
      trend: { value: 5, isPositive: true }
    },
    { 
      title: "Today's Appointments", 
      value: 156, 
      icon: Calendar, 
      variant: "warning" as const,
      trend: { value: 8, isPositive: true }
    },
    { 
      title: "Monthly Revenue", 
      value: "₹124,580", 
      icon: DollarSign, 
      variant: "accent" as const,
      trend: { value: 15, isPositive: true }
    },
  ]);

  const handleApprove = (doctor: DoctorApproval) => {
    // Remove from pending approvals
    setPendingApprovals(prev => prev.filter(d => d.id !== doctor.id));
    
    // Update active doctors count
    setStats(prev => prev.map(stat => 
      stat.title === "Active Doctors" 
        ? { ...stat, value: Number(stat.value) + 1 }
        : stat
    ));
    
    // Add activity
    const newActivity: Activity = {
      icon: CheckCircle,
      text: `${doctor.name} approved as ${doctor.specialty} specialist`,
      time: "Just now",
      type: "success"
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    
    toast.success(`${doctor.name} has been approved!`, {
      description: `${doctor.name} is now an active ${doctor.specialty} specialist.`
    });
  };

  const handleReject = (doctor: DoctorApproval) => {
    // Remove from pending approvals
    setPendingApprovals(prev => prev.filter(d => d.id !== doctor.id));
    
    // Add activity
    const newActivity: Activity = {
      icon: AlertCircle,
      text: `${doctor.name}'s application rejected`,
      time: "Just now",
      type: "warning"
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    
    toast.error(`${doctor.name}'s application rejected`, {
      description: `Notification has been sent to ${doctor.name}.`
    });
  };
  return (
    <DashboardLayout role="admin">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Admin Dashboard 🏥
        </h1>
        <p className="text-muted-foreground">
          System overview and management console.
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
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department Stats */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Department Overview
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/reports">
                  Full Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patients</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctors</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept, index) => (
                    <tr key={dept.name} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground">{dept.name}</p>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{dept.patients}</td>
                      <td className="py-4 px-4 text-muted-foreground">{dept.doctors}</td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-success">{dept.revenue}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activityTypeStyles[activity.type as keyof typeof activityTypeStyles]}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Pending Approvals
              </h2>
              <span className="px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                {pendingApprovals.length} pending
              </span>
            </div>
            {pendingApprovals.length > 0 ? (
              <div className="space-y-3">
                {pendingApprovals.map((doctor) => (
                  <div key={doctor.id} className="p-3 rounded-xl bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{doctor.submitted}</span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="success" 
                          className="h-7"
                          onClick={() => handleApprove(doctor)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="h-7"
                          onClick={() => handleReject(doctor)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-success/50 mb-3" />
                <p className="text-muted-foreground">All approvals processed!</p>
                <p className="text-sm text-muted-foreground mt-1">No pending doctor applications.</p>
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/admin/users">View All Requests</Link>
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/reports">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Reports
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/finances">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial Overview
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/settings">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  System Analytics
                </Link>
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              System Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Server Status</span>
                <span className="flex items-center gap-2 text-success">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Database</span>
                <span className="flex items-center gap-2 text-success">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">API Services</span>
                <span className="flex items-center gap-2 text-success">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Running
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
