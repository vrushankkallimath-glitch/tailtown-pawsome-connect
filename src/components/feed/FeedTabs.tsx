import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeedTabsProps {
  activeTab: "local" | "global";
  onTabChange: (tab: "local" | "global") => void;
}

export const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-sage-light rounded-full w-fit relative">
      {/* Animated background pill */}
      <motion.div
        className="absolute h-[calc(100%-8px)] rounded-full bg-primary"
        initial={false}
        animate={{
          x: activeTab === "local" ? 4 : "calc(100% + 4px)",
          width: activeTab === "local" ? "48%" : "44%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      
      <button
        onClick={() => onTabChange("local")}
        className={cn(
          "tab-pill relative z-10",
          activeTab === "local" ? "text-primary-foreground" : "tab-pill-inactive"
        )}
        aria-pressed={activeTab === "local"}
      >
        <motion.span
          animate={activeTab === "local" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="mr-1"
        >
          🏘️
        </motion.span>
        My Neighborhood
      </button>
      <button
        onClick={() => onTabChange("global")}
        className={cn(
          "tab-pill relative z-10",
          activeTab === "global" ? "text-primary-foreground" : "tab-pill-inactive"
        )}
        aria-pressed={activeTab === "global"}
      >
        <motion.span
          animate={activeTab === "global" ? { rotate: 360 } : {}}
          transition={{ duration: 0.5 }}
          className="mr-1 inline-block"
        >
          🌍
        </motion.span>
        Global Paws
      </button>
    </div>
  );
};
