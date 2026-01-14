import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Share2, MoreHorizontal, Award, Camera, FileText, Bookmark } from "lucide-react";
import { BoopButton } from "./BoopButton";
import { CommentsSection } from "./CommentsSection";
import { cn } from "@/lib/utils";

export type PostType = "photo" | "text" | "milestone";

interface PostCardProps {
  id: string;
  type: PostType;
  author: {
    name: string;
    avatar: string;
    petName: string;
    neighborhood: string;
  };
  content: string;
  image?: string;
  boops: number;
  comments: number;
  timeAgo: string;
  milestone?: string;
}

const PostTypeIcon = ({ type }: { type: PostType }) => {
  switch (type) {
    case "photo":
      return <Camera className="w-3.5 h-3.5" />;
    case "milestone":
      return <Award className="w-3.5 h-3.5" />;
    default:
      return <FileText className="w-3.5 h-3.5" />;
  }
};

const PostTypeBadge = ({ type }: { type: PostType }) => {
  const labels = {
    photo: "Photo",
    text: "Update",
    milestone: "Milestone 🎉",
  };

  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sage-light text-primary"
    >
      <PostTypeIcon type={type} />
      {labels[type]}
    </motion.span>
  );
};

export const PostCard = ({
  id,
  type,
  author,
  content,
  image,
  boops,
  comments,
  timeAgo,
  milestone,
}: PostCardProps) => {
  const [saved, setSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <motion.article
      className="card-tailtown overflow-hidden break-inside-avoid mb-4"
      layout
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ x: 2 }}
          >
            <div className="w-11 h-11 avatar-ring bg-secondary/20">
              <img
                src={author.avatar}
                alt={author.petName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <p className="font-display font-bold text-sm group-hover:text-primary transition-colors">
                {author.petName}
              </p>
              <p className="text-xs text-muted-foreground">
                {author.neighborhood} • {timeAgo}
              </p>
            </div>
          </motion.div>
          <motion.button 
            className="btn-icon"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        <div className="mt-2">
          <PostTypeBadge type={type} />
        </div>
      </div>

      {/* Milestone Banner */}
      {type === "milestone" && milestone && (
        <motion.div 
          className="mx-4 mb-3 p-3 rounded-xl bg-terracotta-light border border-secondary/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p 
            className="text-sm font-display font-bold text-secondary text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🏆 {milestone}
          </motion.p>
        </motion.div>
      )}

      {/* Image */}
      {image && (
        <motion.div 
          className="relative overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.01 }}
        >
          {!imageLoaded && (
            <div className="w-full h-48 bg-sage-light animate-pulse" />
          )}
          <img
            src={image}
            alt="Post content"
            className={cn(
              "w-full object-cover transition-all duration-500",
              "group-hover:brightness-105",
              imageLoaded ? "opacity-100" : "opacity-0 h-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      )}

      {/* Content */}
      <div className="p-4 pt-3">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <BoopButton initialCount={boops} />
        
        <motion.button 
          className={cn(
            "btn-boop",
            commentsOpen 
              ? "bg-primary text-primary-foreground" 
              : "bg-sage-light text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCommentsOpen(!commentsOpen)}
          aria-label={`${comments} comments`}
          aria-expanded={commentsOpen}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </motion.button>
        
        <div className="ml-auto flex items-center gap-1">
          <motion.button 
            className="btn-icon"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            aria-label={saved ? "Unsave post" : "Save post"}
            aria-pressed={saved}
          >
            <Bookmark 
              className={cn(
                "w-4 h-4 transition-colors",
                saved ? "fill-secondary text-secondary" : "text-muted-foreground"
              )} 
            />
          </motion.button>
          <motion.button 
            className="btn-icon"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share post"
          >
          <Share2 className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection postId={id} isOpen={commentsOpen} />
    </motion.article>
  );
};
