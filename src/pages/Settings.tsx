import { AppLayout } from "@/components/layout/AppLayout";
import { Bell, Moon, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  const settingsItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Push notifications for boops & comments",
      hasSwitch: true,
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Moon,
      label: "Dark Mode",
      description: "Switch to dark theme",
      hasSwitch: true,
      value: darkMode,
      onChange: setDarkMode,
    },
    {
      icon: Shield,
      label: "Location Sharing",
      description: "Share neighborhood for local posts",
      hasSwitch: true,
      value: locationSharing,
      onChange: setLocationSharing,
    },
  ];

  const linkItems = [
    {
      icon: HelpCircle,
      label: "Help & Support",
      danger: false,
      onClick: () => toast.info("Help & Support coming soon"),
    },
    {
      icon: LogOut,
      label: "Log Out",
      danger: true,
      onClick: () => {
        toast.success("Logged out");
        navigate("/");
      },
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences</p>
        </div>

        <div className="space-y-3 mb-6">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-tailtown p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.hasSwitch && (
                  <Switch
                    checked={item.value}
                    onCheckedChange={item.onChange}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          {linkItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (settingsItems.length + index) * 0.1 }}
              onClick={item.onClick}
              type="button"
              className={`w-full card-tailtown p-4 flex items-center gap-4 ${
                item.danger ? "hover:bg-destructive/5" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.danger ? "bg-destructive/10" : "bg-sage-light"
              }`}>
                <item.icon className={`w-5 h-5 ${item.danger ? "text-destructive" : "text-primary"}`} />
              </div>
              <span className={`flex-1 text-left font-semibold ${item.danger ? "text-destructive" : ""}`}>
                {item.label}
              </span>
              <ChevronRight className={`w-5 h-5 ${item.danger ? "text-destructive" : "text-muted-foreground"}`} />
            </motion.button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          TailTown v1.0.0 • Made with 🐾
        </p>
      </div>
    </AppLayout>
  );
};

export default Settings;
