import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Heart, 
  Home, 
  Calendar, 
  FileText, 
  CreditCard, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Pill,
  Check,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "patient" | "doctor" | "admin";
}

const patientNavItems = [
  { icon: Home, label: "Dashboard", href: "/patient/dashboard" },
  { icon: User, label: "Profile", href: "/patient/profile" },
  { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
  { icon: FileText, label: "Medical Records", href: "/patient/records" },
  { icon: Pill, label: "Medications", href: "/patient/medications" },
  { icon: CreditCard, label: "Billing", href: "/patient/billing" },
  { icon: Settings, label: "Settings", href: "/patient/settings" },
];

const doctorNavItems = [
  { icon: Home, label: "Dashboard", href: "/doctor/dashboard" },
  { icon: User, label: "Profile", href: "/doctor/profile" },
  { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
  { icon: FileText, label: "Patients", href: "/doctor/patients" },
  { icon: Settings, label: "Settings", href: "/doctor/settings" },
];

const adminNavItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: User, label: "Users", href: "/admin/users" },
  { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
  { icon: CreditCard, label: "Finances", href: "/admin/finances" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const navItemsMap = {
  patient: patientNavItems,
  doctor: doctorNavItems,
  admin: adminNavItems,
};

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [userInitials, setUserInitials] = useState("JD");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Appointment confirmed with Dr. Priya Sharma", read: false, time: "2 hours ago" },
    { id: 2, message: "Lab results are ready", read: false, time: "4 hours ago" },
    { id: 3, message: "Prescription refilled", read: true, time: "1 day ago" },
    { id: 4, message: "Appointment reminder: Tomorrow at 10:00 AM", read: false, time: "1 day ago" },
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = navItemsMap[role];

  // Load user name from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const userData = JSON.parse(savedProfile);
        const firstName = userData.firstName || "John";
        const lastName = userData.lastName || "Doe";
        const fullName = `${firstName} ${lastName}`;
        const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
        
        setUserName(fullName);
        setUserInitials(initials);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate("/");
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-sidebar-foreground">
                MediCare<span className="text-sidebar-primary">Hub</span>
              </span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="font-display font-semibold text-foreground capitalize lg:hidden">
                {role} Portal
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-muted text-foreground transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-card rounded-xl border border-border shadow-xl z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-display font-semibold text-foreground">Notifications</h3>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-border">
                          {notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              className={cn(
                                "p-4 hover:bg-muted/50 transition-colors",
                                !notif.read && "bg-primary/5"
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <p className={cn(
                                    "text-sm",
                                    notif.read ? "text-muted-foreground" : "text-foreground font-medium"
                                  )}>
                                    {notif.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                                </div>
                                <div className="flex gap-2">
                                  {!notif.read && (
                                    <button
                                      onClick={() => markNotificationAsRead(notif.id)}
                                      className="p-1 rounded hover:bg-accent/20 text-accent transition-colors"
                                      title="Mark as read"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteNotification(notif.id)}
                                    className="p-1 rounded hover:bg-destructive/20 text-destructive transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                          <p className="text-muted-foreground text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {userInitials}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
