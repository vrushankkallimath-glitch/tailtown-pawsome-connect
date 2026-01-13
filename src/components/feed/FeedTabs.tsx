import { cn } from "@/lib/utils";

interface FeedTabsProps {
  activeTab: "local" | "global";
  onTabChange: (tab: "local" | "global") => void;
}

export const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-sage-light rounded-full w-fit">
      <button
        onClick={() => onTabChange("local")}
        className={cn(
          "tab-pill",
          activeTab === "local" ? "tab-pill-active" : "tab-pill-inactive"
        )}
      >
        🏘️ My Neighborhood
      </button>
      <button
        onClick={() => onTabChange("global")}
        className={cn(
          "tab-pill",
          activeTab === "global" ? "tab-pill-active" : "tab-pill-inactive"
        )}
      >
        🌍 Global Paws
      </button>
    </div>
  );
};
