import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Camera } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: {
    name: string;
    neighborhood: string;
  };
}

export const EditProfileModal = ({ open, onOpenChange, profile }: EditProfileModalProps) => {
  const [name, setName] = useState(profile.name);
  const [neighborhood, setNeighborhood] = useState(profile.neighborhood);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated! 🎉");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center cursor-pointer"
            >
              <span className="text-primary-foreground font-display font-bold text-3xl">
                {name.charAt(0)}
              </span>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Camera className="w-4 h-4 text-secondary-foreground" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Input
              id="neighborhood"
              placeholder="e.g., Downtown"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            Save Changes
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
