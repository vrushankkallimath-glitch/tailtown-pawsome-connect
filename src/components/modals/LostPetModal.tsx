import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface LostPetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LostPetModal = ({ open, onOpenChange }: LostPetModalProps) => {
  const handleShare = async () => {
    const url = `${window.location.origin}/?alert=lost-pet-bella`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Lost Pet Alert: Bella", url });
        toast.success("Shared!");
        return;
      }

      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't share right now");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Lost Pet Alert
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-square w-full max-w-[200px] mx-auto rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
            <div className="text-center p-4">
              <p className="text-6xl mb-2">🐕</p>
              <p className="text-sm text-muted-foreground">Bella</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-display font-bold text-xl">Bella</h3>
            <p className="text-muted-foreground">Brown Labrador • 3 years old</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-destructive" />
              <span>Last seen near Oak Park, Downtown</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-destructive" />
              <span>Missing since Jan 15, 2026 at 3:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-destructive" />
              <span>Contact: (555) 123-4567</span>
            </div>
          </div>

          <p className="text-sm bg-muted p-3 rounded-xl">
            Bella is friendly but may be scared. She has a red collar with tags. 
            Please do not chase her - call the owner immediately if spotted.
          </p>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
              type="button"
              onClick={() => {
                toast.success("Thanks! We'll notify the owner.");
                onOpenChange(false);
              }}
            >
              I've Seen Bella
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold"
              type="button"
              onClick={handleShare}
            >
              Share Alert
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
