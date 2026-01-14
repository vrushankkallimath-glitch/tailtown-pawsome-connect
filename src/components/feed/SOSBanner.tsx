import { useState } from "react";
import { AlertTriangle, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SOSBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="sos-banner mb-4 group"
          role="alert"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <p className="font-display font-bold text-sm text-destructive">
              🚨 Lost Pet Alert
            </p>
            <p className="text-xs text-destructive/80">
              Bella, a brown Labrador, was last seen near Oak Park. Tap to help!
            </p>
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ChevronRight className="w-5 h-5 text-destructive" />
          </motion.div>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="p-1.5 rounded-full hover:bg-destructive/20 transition-colors"
            aria-label="Dismiss alert"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-destructive" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
