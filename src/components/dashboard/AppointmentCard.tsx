import { cn } from "@/lib/utils";
import { Calendar, Clock, User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Appointment {
  id: string;
  patientName?: string;
  doctorName?: string;
  specialty?: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  role: "patient" | "doctor" | "admin";
  onAction?: (action: string, id: string) => void;
}

const statusStyles = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-info/10 text-info border-info/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function AppointmentCard({ appointment, role, onAction }: AppointmentCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
            {role === "patient" 
              ? appointment.doctorName?.charAt(0) || "D"
              : appointment.patientName?.charAt(0) || "P"
            }
          </div>
          <div>
            <p className="font-medium text-foreground">
              {role === "patient" ? appointment.doctorName : appointment.patientName}
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.specialty || appointment.type}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction?.("view", appointment.id)}>
              View Details
            </DropdownMenuItem>
            {appointment.status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => onAction?.("confirm", appointment.id)}>
                  Confirm
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAction?.("cancel", appointment.id)}
                  className="text-destructive"
                >
                  Cancel
                </DropdownMenuItem>
              </>
            )}
            {appointment.status === "confirmed" && role === "doctor" && (
              <DropdownMenuItem onClick={() => onAction?.("complete", appointment.id)}>
                Mark Complete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <span className={cn(
        "inline-flex px-3 py-1 rounded-full text-xs font-medium border capitalize",
        statusStyles[appointment.status]
      )}>
        {appointment.status}
      </span>
    </div>
  );
}
