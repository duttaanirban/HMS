import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Calendar, Droplet, Edit, Camera, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface PatientProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  allergies: string;
  medicalConditions: string;
}

export default function PatientProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<PatientProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (234) 567-890",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bloodGroup: "O+",
    address: "123 Main Street, Healthcare City, HC 12345",
    emergencyContact: "+1 (234) 567-891",
    allergies: "Penicillin, Peanuts",
    medicalConditions: "Hypertension (controlled)",
  });

  // Load user profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const userData = JSON.parse(savedProfile);
        setProfile(prev => ({
          ...prev,
          firstName: userData.firstName || prev.firstName,
          lastName: userData.lastName || prev.lastName,
          email: userData.email || prev.email,
          phone: userData.phone || prev.phone,
        }));
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Update localStorage with profile changes
    const userData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      bloodGroup: profile.bloodGroup,
      address: profile.address,
      emergencyContact: profile.emergencyContact,
      allergies: profile.allergies,
      medicalConditions: profile.medicalConditions,
      registeredAt: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')!).registeredAt : new Date().toISOString(),
    };
    localStorage.setItem('userProfile', JSON.stringify(userData));
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and medical details.
            </p>
          </div>
          <Button
            variant={isEditing ? "hero" : "outline"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Profile Header */}
          <div className="gradient-primary p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  JD
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card flex items-center justify-center text-foreground shadow-md">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-display font-bold text-primary-foreground">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-primary-foreground/80">Patient ID: PAT-2025-001234</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="mt-2"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label>Phone</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Birth</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(value) => setProfile({ ...profile, gender: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="mt-2"
                    rows={2}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-foreground border-b border-border pb-2">
                  Medical Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Blood Group</Label>
                    <div className="relative mt-2">
                      <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Select
                        value={profile.bloodGroup}
                        onValueChange={(value) => setProfile({ ...profile, bloodGroup: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input
                      type="tel"
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                      className="mt-2"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label>Known Allergies</Label>
                  <Textarea
                    value={profile.allergies}
                    onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                    className="mt-2"
                    rows={2}
                    placeholder="List any known allergies..."
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Medical Conditions</Label>
                  <Textarea
                    value={profile.medicalConditions}
                    onChange={(e) => setProfile({ ...profile, medicalConditions: e.target.value })}
                    className="mt-2"
                    rows={2}
                    placeholder="List any existing medical conditions..."
                    disabled={!isEditing}
                  />
                </div>

                {/* Quick Stats */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium text-foreground mb-3">Account Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Member Since</p>
                      <p className="font-medium text-foreground">Jan 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Visits</p>
                      <p className="font-medium text-foreground">12</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Visit</p>
                      <p className="font-medium text-foreground">Dec 10, 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Primary Doctor</p>
                      <p className="font-medium text-foreground">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
