import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Lock, 
  Eye, 
  LogOut,
  Save,
  Check
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function PatientSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    labResultAlerts: true,
    prescriptionUpdates: true,
    promotionalEmails: false,
    smsNotifications: true,
    twoFactorAuth: false,
    activityLog: true,
    profileVisibility: "private" as const,
    language: "english" as const,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Change",
      description: "Password reset link sent to your email.",
    });
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and privacy settings.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display font-semibold text-lg text-foreground">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Appointment Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before your appointments</p>
                </div>
                <Switch 
                  checked={settings.appointmentReminders}
                  onCheckedChange={() => handleToggle('appointmentReminders')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Lab Results Alerts</p>
                  <p className="text-sm text-muted-foreground">Notifications when lab results are ready</p>
                </div>
                <Switch 
                  checked={settings.labResultAlerts}
                  onCheckedChange={() => handleToggle('labResultAlerts')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Prescription Updates</p>
                  <p className="text-sm text-muted-foreground">Updates about your prescriptions</p>
                </div>
                <Switch 
                  checked={settings.prescriptionUpdates}
                  onCheckedChange={() => handleToggle('prescriptionUpdates')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                </div>
                <Switch 
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleToggle('smsNotifications')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Promotional Emails</p>
                  <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
                </div>
                <Switch 
                  checked={settings.promotionalEmails}
                  onCheckedChange={() => handleToggle('promotionalEmails')}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-display font-semibold text-lg text-foreground">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleChangePassword}
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
                <Switch 
                  checked={settings.twoFactorAuth}
                  onCheckedChange={() => handleToggle('twoFactorAuth')}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-medium text-foreground">Activity Log</p>
                  <p className="text-sm text-muted-foreground">View your account activity</p>
                </div>
                <Button variant="outline" size="sm">
                  View Log
                </Button>
              </div>
            </div>
          </div>

          {/* Privacy & Preferences */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-success" />
              </div>
              <h2 className="font-display font-semibold text-lg text-foreground">
                Privacy & Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Profile Visibility
                </label>
                <select 
                  value={settings.profileVisibility}
                  onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="private">Private - Only you can see your profile</option>
                  <option value="doctors">Doctors - Your doctors can see your profile</option>
                  <option value="public">Public - Everyone can see your profile</option>
                </select>
              </div>

              <div className="border-t border-border pt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language
                </label>
                <select 
                  value={settings.language}
                  onChange={(e) => handleSelectChange('language', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Account
            </h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Logout All Devices
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Account
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button 
              variant="hero" 
              className="flex-1"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Check className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
