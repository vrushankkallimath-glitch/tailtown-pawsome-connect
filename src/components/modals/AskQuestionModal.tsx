import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AskQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AskQuestionModal = ({ open, onOpenChange }: AskQuestionModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Question posted! The community will help you soon 🐾");
    onOpenChange(false);
    setTitle("");
    setCategory("");
    setDetails("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Ask a Question</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Your Question</Label>
            <Input
              id="title"
              placeholder="e.g., Best flea treatment for sensitive skin?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">🏥 Health</SelectItem>
                <SelectItem value="training">🎓 Training</SelectItem>
                <SelectItem value="nutrition">🍖 Nutrition</SelectItem>
                <SelectItem value="gear">🎾 Gear</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">More Details (optional)</Label>
            <Textarea
              id="details"
              placeholder="Add more context to help others understand your question..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            Post Question
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
