import { motion } from "framer-motion";
import { MessageCircle, Share2, MoreHorizontal, Award, Camera, FileText } from "lucide-react";
import { BoopButton } from "./BoopButton";

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
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sage-light text-primary">
      <PostTypeIcon type={type} />
      {labels[type]}
    </span>
  );
};

export const PostCard = ({
  type,
  author,
  content,
  image,
  boops,
  comments,
  timeAgo,
  milestone,
}: PostCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-tailtown overflow-hidden break-inside-avoid mb-4"
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-secondary/20 overflow-hidden ring-2 ring-secondary/30">
              <img
                src={author.avatar}
                alt={author.petName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-display font-bold text-sm">{author.petName}</p>
              <p className="text-xs text-muted-foreground">
                {author.neighborhood} • {timeAgo}
              </p>
            </div>
          </div>
          <button className="p-1 hover:bg-muted rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-2">
          <PostTypeBadge type={type} />
        </div>
      </div>

      {/* Milestone Banner */}
      {type === "milestone" && milestone && (
        <div className="mx-4 mb-3 p-3 rounded-xl bg-terracotta-light border border-secondary/20">
          <p className="text-sm font-display font-bold text-secondary text-center">
            🏆 {milestone}
          </p>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Post content"
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 pt-3">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <BoopButton initialCount={boops} />
        <button className="btn-boop bg-sage-light text-muted-foreground hover:bg-primary hover:text-primary-foreground">
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors ml-auto">
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </motion.article>
  );
};
