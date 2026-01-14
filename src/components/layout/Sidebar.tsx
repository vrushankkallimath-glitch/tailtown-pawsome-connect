import { Home, MapPin, MessageCircle, User, PawPrint, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Town Square", path: "/" },
  { icon: MapPin, label: "Playdates", path: "/events" },
  { icon: MessageCircle, label: "Bark Board", path: "/advice" },
  { icon: User, label: "My Pack", path: "/profile" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <PawPrint className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-2xl font-bold text-sidebar-foreground group-hover:text-gradient-primary transition-colors">
            TailTown
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={cn(
                  "sidebar-link",
                  isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                    layoutId="activeIndicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Settings Link */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/settings"
          className="sidebar-link sidebar-link-inactive text-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </div>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <motion.div 
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage-light cursor-pointer"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">Jamie & Max</p>
            <p className="text-xs text-muted-foreground truncate">Downtown</p>
          </div>
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </aside>
  );
};
