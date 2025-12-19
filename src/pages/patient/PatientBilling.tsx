import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Download, 
  Eye,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  description: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

export default function PatientBilling() {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "INV-001", date: "Dec 10, 2025", amount: 450, status: "paid", description: "General Checkup" },
    { id: "INV-002", date: "Nov 28, 2025", amount: 320, status: "paid", description: "Blood Test & Analysis" },
    { id: "INV-003", date: "Nov 15, 2025", amount: 280, status: "pending", description: "Consultation Fee" },
    { id: "INV-004", date: "Oct 30, 2025", amount: 150, status: "overdue", description: "Follow-up Visit" },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "Visa", lastFour: "4242", expiryDate: "12/25", isDefault: true },
    { id: "2", type: "MasterCard", lastFour: "5555", expiryDate: "08/26", isDefault: false },
  ]);

  const handlePayInvoice = (invoice: Invoice) => {
    if (invoice.status !== "paid") {
      setInvoices(invoices.map(inv => 
        inv.id === invoice.id ? { ...inv, status: "paid" } : inv
      ));
      toast({
        title: "Payment Successful",
        description: `Invoice ${invoice.id} has been paid.`,
      });
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "overdue":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status !== "paid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <DashboardLayout role="patient">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Billing & Invoices
          </h1>
          <p className="text-muted-foreground">
            View and manage your invoices and payments.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-foreground">₹{totalAmount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Paid Amount</p>
                <p className="text-2xl font-bold text-success">₹{paidAmount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Pending/Overdue</p>
                <p className="text-2xl font-bold text-warning">₹{pendingAmount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            Recent Invoices
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{invoice.id}</td>
                    <td className="py-4 px-4 text-muted-foreground">{invoice.date}</td>
                    <td className="py-4 px-4 text-muted-foreground">{invoice.description}</td>
                    <td className="py-4 px-4 font-medium text-foreground">₹{invoice.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4 text-foreground" />
                        </button>
                        {invoice.status !== "paid" && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handlePayInvoice(invoice)}
                          >
                            Pay
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg text-foreground">
              Payment Methods
            </h2>
            <Button variant="outline" size="sm">
              Add Payment Method
            </Button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{method.type}</p>
                    <p className="text-sm text-muted-foreground">•••• {method.lastFour} • Expires {method.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {method.isDefault && (
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                      Default
                    </span>
                  )}
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
