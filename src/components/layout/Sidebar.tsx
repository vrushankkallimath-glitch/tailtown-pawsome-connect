import { Home, MapPin, MessageCircle, User, PawPrint } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-sidebar-foreground">
            TailTown
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sage-light"
              )}
            >
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage-light">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">Jamie & Max</p>
            <p className="text-xs text-muted-foreground truncate">Downtown</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
