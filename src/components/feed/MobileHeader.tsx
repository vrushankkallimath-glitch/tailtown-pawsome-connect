import { PawPrint, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MobileHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <PawPrint className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="font-display text-xl font-bold group-hover:text-gradient-primary transition-colors">
            TailTown
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <motion.button 
            className="btn-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button 
            className="btn-icon relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <motion.span 
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </div>
      </div>
    </header>
  );
};
