import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SOSBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sos-banner mb-4"
        >
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <p className="font-display font-bold text-sm text-destructive">
              🚨 Lost Pet Alert
            </p>
            <p className="text-xs text-destructive/80">
              Bella, a brown Labrador, was last seen near Oak Park. Tap to help!
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-destructive/20 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-destructive" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
