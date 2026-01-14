import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { MobileHeader } from "@/components/feed/MobileHeader";
import { SOSBanner } from "@/components/feed/SOSBanner";
import { FeedTabs } from "@/components/feed/FeedTabs";
import { PostCard, PostType } from "@/components/feed/PostCard";

// Import images
import dogGolden from "@/assets/dog-golden.jpg";
import catOrange from "@/assets/cat-orange.jpg";
import dogFrenchie from "@/assets/dog-frenchie.jpg";
import dogCorgi from "@/assets/dog-corgi.jpg";
import dogBorderCollie from "@/assets/dog-border-collie.jpg";

interface Post {
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
  isLocal: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    type: "photo",
    author: {
      name: "Sarah M.",
      avatar: dogGolden,
      petName: "Max",
      neighborhood: "Oakwood",
    },
    content: "Someone's loving this sunny afternoon! Max couldn't resist rolling in the freshly cut grass 🌿",
    image: dogGolden,
    boops: 42,
    comments: 8,
    timeAgo: "2h ago",
    isLocal: true,
  },
  {
    id: "2",
    type: "milestone",
    author: {
      name: "Mike T.",
      avatar: dogFrenchie,
      petName: "Biscuit",
      neighborhood: "Downtown",
    },
    content: "After 3 weeks of training, someone finally learned to catch! So proud of my little champion 🏆",
    image: dogFrenchie,
    milestone: "Biscuit learned to catch!",
    boops: 127,
    comments: 23,
    timeAgo: "4h ago",
    isLocal: true,
  },
  {
    id: "3",
    type: "text",
    author: {
      name: "Emily R.",
      avatar: catOrange,
      petName: "Mango",
      neighborhood: "Riverside",
    },
    content: "Does anyone else's cat judge them for sleeping in on weekends? Mango literally sat on my face at 6am demanding breakfast. I swear he has a tiny alarm clock hidden somewhere 😴🐱",
    boops: 89,
    comments: 31,
    timeAgo: "5h ago",
    isLocal: false,
  },
  {
    id: "4",
    type: "photo",
    author: {
      name: "Lisa K.",
      avatar: dogCorgi,
      petName: "Buttercup",
      neighborhood: "Maple Heights",
    },
    content: "The famous corgi butt making an appearance on our evening walk! 🍑",
    image: dogCorgi,
    boops: 234,
    comments: 45,
    timeAgo: "6h ago",
    isLocal: false,
  },
  {
    id: "5",
    type: "photo",
    author: {
      name: "Tom B.",
      avatar: dogBorderCollie,
      petName: "Scout",
      neighborhood: "Oakwood",
    },
    content: "Best trail buddy I could ask for! Anyone want to join us for a hike next Saturday? 🥾🐕",
    image: dogBorderCollie,
    boops: 56,
    comments: 12,
    timeAgo: "8h ago",
    isLocal: true,
  },
  {
    id: "6",
    type: "text",
    author: {
      name: "Anna P.",
      avatar: catOrange,
      petName: "Whiskers",
      neighborhood: "Downtown",
    },
    content: "PSA: The new organic cat food at Petland is amazing! Whiskers has been so much more energetic since we switched. Highly recommend for senior cats! 🌟",
    boops: 18,
    comments: 7,
    timeAgo: "12h ago",
    isLocal: true,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"local" | "global">("local");

  const filteredPosts = activeTab === "local" 
    ? mockPosts.filter(post => post.isLocal)
    : mockPosts;

  return (
    <AppLayout>
      <MobileHeader />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Page Title for Desktop */}
        <div className="hidden md:block mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">Town Square</h1>
          <p className="text-muted-foreground">See what your furry neighbors are up to!</p>
        </div>

        {/* SOS Banner */}
        <SOSBanner />

        {/* Tabs */}
        <div className="mb-6 flex justify-center md:justify-start">
          <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Masonry Feed */}
        <div className="masonry-grid">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts yet in your neighborhood!</p>
            <p className="text-sm text-muted-foreground mt-1">Be the first to share something 🐾</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fab-button fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 animate-pulse-glow"
        aria-label="Create new post"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </AppLayout>
  );
};

export default Index;
