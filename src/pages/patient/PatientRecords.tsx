import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Eye,
  Upload,
  Search,
  Filter,
  Calendar,
  User
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

interface MedicalRecord {
  id: string;
  title: string;
  type: "lab_report" | "prescription" | "diagnosis" | "imaging" | "surgery";
  date: string;
  doctor: string;
  department: string;
  fileSize?: string;
}

const records: MedicalRecord[] = [
  {
    id: "1",
    title: "Complete Blood Count (CBC)",
    type: "lab_report",
    date: "Dec 15, 2025",
    doctor: "Dr. Sarah Johnson",
    department: "Pathology",
    fileSize: "245 KB",
  },
  {
    id: "2",
    title: "Cardiac Health Assessment",
    type: "diagnosis",
    date: "Dec 10, 2025",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    fileSize: "512 KB",
  },
  {
    id: "3",
    title: "Chest X-Ray Report",
    type: "imaging",
    date: "Dec 5, 2025",
    doctor: "Dr. Emily Parker",
    department: "Radiology",
    fileSize: "2.3 MB",
  },
  {
    id: "4",
    title: "Prescription - Hypertension Medication",
    type: "prescription",
    date: "Nov 28, 2025",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    fileSize: "89 KB",
  },
  {
    id: "5",
    title: "MRI Brain Scan",
    type: "imaging",
    date: "Nov 15, 2025",
    doctor: "Dr. James Wilson",
    department: "Neurology",
    fileSize: "15.7 MB",
  },
  {
    id: "6",
    title: "Annual Health Checkup Report",
    type: "diagnosis",
    date: "Oct 20, 2025",
    doctor: "Dr. Lisa Anderson",
    department: "General Medicine",
    fileSize: "1.2 MB",
  },
];

const typeLabels = {
  lab_report: { label: "Lab Report", color: "bg-info/10 text-info" },
  prescription: { label: "Prescription", color: "bg-success/10 text-success" },
  diagnosis: { label: "Diagnosis", color: "bg-primary/10 text-primary" },
  imaging: { label: "Imaging", color: "bg-warning/10 text-warning" },
  surgery: { label: "Surgery", color: "bg-destructive/10 text-destructive" },
};

export default function PatientRecords() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRecords = records.filter((record) => {
    const matchesFilter = filter === "all" || record.type === filter;
    const matchesSearch = record.title.toLowerCase().includes(search.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(search.toLowerCase()) ||
                         record.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout role="patient">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Medical Records
          </h1>
          <p className="text-muted-foreground">
            Access and manage your complete medical history.
          </p>
        </div>
        <Button variant="hero">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(typeLabels).map(([key, value]) => (
          <div key={key} className="bg-card rounded-xl border border-border p-4">
            <div className={`w-10 h-10 rounded-lg ${value.color} flex items-center justify-center mb-3`}>
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {records.filter(r => r.type === key).length}
            </p>
            <p className="text-sm text-muted-foreground">{value.label}s</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Records</SelectItem>
              <SelectItem value="lab_report">Lab Reports</SelectItem>
              <SelectItem value="prescription">Prescriptions</SelectItem>
              <SelectItem value="diagnosis">Diagnoses</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-card rounded-xl border border-border p-5 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${typeLabels[record.type].color}`}>
                  {typeLabels[record.type].label}
                </div>
                <span className="text-xs text-muted-foreground">{record.fileSize}</span>
              </div>

              <h3 className="font-semibold text-foreground mb-3 line-clamp-2">
                {record.title}
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{record.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{record.date}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-card rounded-xl border border-border p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No records found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
