import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Camera, AlertTriangle } from "lucide-react";

interface ReportLostPetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportLostPetModal = ({ open, onOpenChange }: ReportLostPetModalProps) => {
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lost pet alert created! We'll notify the community immediately 🚨");
    onOpenChange(false);
    setPetName("");
    setSpecies("");
    setDescription("");
    setLastSeen("");
    setContactPhone("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Report Lost Pet
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center cursor-pointer border-2 border-dashed border-destructive/30"
            >
              <Camera className="w-8 h-8 text-destructive" />
            </motion.div>
          </div>
          <p className="text-center text-sm text-muted-foreground">Add a photo of your pet</p>

          <div className="space-y-2">
            <Label htmlFor="petName">Pet Name</Label>
            <Input
              id="petName"
              placeholder="What's your pet's name?"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Select value={species} onValueChange={setSpecies}>
              <SelectTrigger>
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">🐕 Dog</SelectItem>
                <SelectItem value="cat">🐱 Cat</SelectItem>
                <SelectItem value="bird">🐦 Bird</SelectItem>
                <SelectItem value="other">🐾 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your pet (color, size, collar, distinguishing features)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastSeen">Last Seen Location</Label>
            <Input
              id="lastSeen"
              placeholder="e.g., Near Oak Park, Downtown"
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="(555) 123-4567"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold"
          >
            Create Alert
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
