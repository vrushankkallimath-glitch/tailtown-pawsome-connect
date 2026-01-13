import { PawPrint, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const MobileHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">TailTown</span>
        </Link>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-xl hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
};
