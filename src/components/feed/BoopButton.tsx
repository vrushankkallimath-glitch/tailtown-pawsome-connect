import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BoopButtonProps {
  initialCount?: number;
  isBooped?: boolean;
}

export const BoopButton = ({ initialCount = 0, isBooped = false }: BoopButtonProps) => {
  const [booped, setBooped] = useState(isBooped);
  const [count, setCount] = useState(initialCount);
  const [showParticles, setShowParticles] = useState(false);

  const handleBoop = () => {
    if (!booped) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 600);
    }
    
    if (booped) {
      setCount((c) => c - 1);
    } else {
      setCount((c) => c + 1);
    }
    setBooped(!booped);
  };

  return (
    <div className="relative">
      {/* Particle burst effect */}
      <AnimatePresence>
        {showParticles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-xs pointer-events-none"
                initial={{ 
                  opacity: 1, 
                  scale: 0.5,
                  x: 20,
                  y: 10
                }}
                animate={{ 
                  opacity: 0, 
                  scale: 1,
                  x: 20 + Math.cos((i * 60) * Math.PI / 180) * 30,
                  y: 10 + Math.sin((i * 60) * Math.PI / 180) * 30
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                🐾
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleBoop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        className={cn(
          "btn-boop relative overflow-hidden",
          booped && "bg-secondary text-secondary-foreground animate-pulse-glow"
        )}
        aria-label={booped ? "Remove boop" : "Boop this post"}
        aria-pressed={booped}
      >
        <motion.span
          animate={booped ? { 
            scale: [1, 1.4, 1],
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {booped ? "🐾" : "👃"}
        </motion.span>
        <motion.span
          key={count}
          initial={{ y: booped ? -10 : 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {count} {count === 1 ? "Boop" : "Boops"}
        </motion.span>
      </motion.button>
    </div>
  );
};
