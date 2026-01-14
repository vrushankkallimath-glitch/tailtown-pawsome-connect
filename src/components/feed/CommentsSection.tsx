import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

interface CommentsSectionProps {
  postId: string;
  initialComments?: Comment[];
  isOpen: boolean;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: { name: "Max", avatar: "/placeholder.svg" },
    content: "So adorable! 🐾",
    timeAgo: "2m ago",
  },
  {
    id: "2",
    author: { name: "Bella", avatar: "/placeholder.svg" },
    content: "We should have a playdate!",
    timeAgo: "5m ago",
  },
];

export const CommentsSection = ({ postId, initialComments, isOpen }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments || mockComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate adding a comment
    const comment: Comment = {
      id: Date.now().toString(),
      author: { name: "You", avatar: "/placeholder.svg" },
      content: newComment.trim(),
      timeAgo: "Just now",
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden border-t border-border/50"
        >
          <div className="p-4 space-y-4">
            {/* Comments List */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-sage-light flex-shrink-0">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-sage-light/50 rounded-xl px-3 py-2">
                        <p className="text-xs font-semibold text-foreground">
                          {comment.author.name}
                        </p>
                        <p className="text-sm text-foreground/90 break-words">
                          {comment.content}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-1">
                        {comment.timeAgo}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {comments.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground text-center py-4"
                >
                  No comments yet. Be the first! 🐾
                </motion.p>
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-sage-light flex-shrink-0">
                <img
                  src="/placeholder.svg"
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  maxLength={500}
                  className={cn(
                    "flex-1 bg-sage-light/50 rounded-full px-4 py-2 text-sm",
                    "placeholder:text-muted-foreground/60",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    "transition-all duration-200"
                  )}
                />
                <motion.button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center",
                    "bg-primary text-primary-foreground",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200"
                  )}
                  aria-label="Post comment"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
