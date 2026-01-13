import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BoopButtonProps {
  initialCount?: number;
  isBooped?: boolean;
}

export const BoopButton = ({ initialCount = 0, isBooped = false }: BoopButtonProps) => {
  const [booped, setBooped] = useState(isBooped);
  const [count, setCount] = useState(initialCount);

  const handleBoop = () => {
    if (booped) {
      setCount((c) => c - 1);
    } else {
      setCount((c) => c + 1);
    }
    setBooped(!booped);
  };

  return (
    <motion.button
      onClick={handleBoop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "btn-boop",
        booped && "bg-secondary text-secondary-foreground"
      )}
    >
      <motion.span
        animate={booped ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {booped ? "🐾" : "👃"}
      </motion.span>
      <span>{count} {count === 1 ? "Boop" : "Boops"}</span>
    </motion.button>
  );
};
