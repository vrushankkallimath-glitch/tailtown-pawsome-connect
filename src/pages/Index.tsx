import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { MobileHeader } from "@/components/feed/MobileHeader";
import { SOSBanner } from "@/components/feed/SOSBanner";
import { FeedTabs } from "@/components/feed/FeedTabs";
import { PostCard, PostType } from "@/components/feed/PostCard";

// Import pet images
import max from "@/assets/pets/max.jpg";
import mango from "@/assets/pets/mango.jpg";
import rio from "@/assets/pets/rio.png";
import sprinkles from "@/assets/pets/sprinkles.png";
import jellybean from "@/assets/pets/jellybean.png";
import jimmy from "@/assets/pets/jimmy.png";
import willow from "@/assets/pets/willow.png";
import iggy from "@/assets/pets/iggy.jpg";
import frosty from "@/assets/pets/frosty.png";
import goldie from "@/assets/pets/goldie.png";
import hedge from "@/assets/pets/hedge.jpg";
import olivia from "@/assets/pets/olivia.png";
import gertude from "@/assets/pets/gertude.png";
import charlie from "@/assets/pets/charlie.jpg";
import hunter from "@/assets/pets/hunter.png";
import jerry from "@/assets/pets/jerry.png";
import steve from "@/assets/pets/steve.jpg";
import slithers from "@/assets/pets/slithers.png";


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
      avatar: max,
      petName: "Max",
      neighborhood: "Oakwood",
    },
    content: "Someone's loving this sunny afternoon! Max couldn't resist rolling in the freshly cut grass 🌿",
    image: max,
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
      avatar: mango,
      petName: "Mango",
      neighborhood: "Downtown",
    },
    content: "Mango here's chillin by the window side! 🐾",
    image: mango,
    milestone: "Chillin' Pro",
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
      avatar: goldie,
      petName: "Goldie",
      neighborhood: "Riverside",
    },
    content: "Fish are such fascinating pets! Goldie has been swimming around all day, exploring every corner of her small bowl. 🐠 Anyone else have tips on creating a more enriching environment for their aquatic friends?",
    image: goldie,
    boops: 89,
    comments: 31,
    timeAgo: "5h ago",
    isLocal: false,
  },
  {
    id: "4",
    type: "photo",
    author: {
      name: "James B.",
      avatar: rio,
      petName: "Rio",
      neighborhood: "Chilltown",
    },
    content: "Rio is a parrot who loves to dance to music! Whenever I play some tunes, he starts bobbing his head and moving his feet. It's the cutest thing ever! 🦜",
    image: rio,
    boops: 64,
    comments: 9,
    timeAgo: "6h ago",
    isLocal: true,
  },
  {
    id: "5",
    type: "photo",
    author: {
      name: "David L.",
      avatar: jellybean,
      petName: "Jellybean",
      neighborhood: "Oakwood",
    },
    content: "Jellybean just turned 3 years!! He is a very active male hamster. He is very healthy and runs in his hamster wheel all day. 🐹",
    image: jellybean,
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
      avatar: willow,
      petName: "Willow",
      neighborhood: "Downtown",
    },
    content: "Willow has been such a curious little bunny lately! She's been hopping around the house, exploring every nook and cranny. 🐇 Anyone else have a bunny with an adventurous spirit?",
    image: willow,
    boops: 18,
    comments: 7,
    timeAgo: "12h ago",
    isLocal: true,
  },
  {
    id: "7",
    type: "photo",
    author: {
      name: "Noah D.",
      avatar: jimmy,
      petName: "Jimmy",
      neighborhood: "Riverside",
    },
    content: "Jimmy the Pomeranian looking dapper as ever! That fluffy coat is everything 🧡",
    image: jimmy,
    boops: 234,
    comments: 45,
    timeAgo: "14h ago",
    isLocal: false,
  },
  {
    id: "8",
    type: "photo",
    author: {
      name: "Lucas J.",
      avatar: iggy,
      petName: "Iggy",
      neighborhood: "Oakwood",
    },
    content: "Iggy the iguana is loving his new basking spot! 🦎",
    image: iggy,
    boops: 38,
    comments: 7,
    timeAgo: "16h ago",
    isLocal: true,
  },
  {
    id: "9",
    type: "photo",
    author: {
      name: "Olivia S.",
      avatar: frosty,
      petName: "Frosty",
      neighborhood: "Paris",
    },
    content: "Frosty the husky pup with those beautiful blue eyes! ❄️🐕",
    image: frosty,
    boops: 89,
    comments: 14,
    timeAgo: "18h ago",
    isLocal: false,
  },
  {
    id: "10",
    type: "photo",
    author: {
      name: "Ethan W.",
      avatar: sprinkles,
      petName: "Sprinkles",
      neighborhood: "Oakwood",
    },
    content: "Sprinkles the scorpion is ready for his close-up! Not your typical pet but absolutely fascinating 🦂",
    image: sprinkles,
    boops: 34,
    comments: 5,
    timeAgo: "20h ago",
    isLocal: true,
  },
  {
    id: "11",
    type: "photo",
    author: {
      name: "Rachel H.",
      avatar: hedge,
      petName: "Hedge",
      neighborhood: "Riverside",
    },
    content: "Hedge the hedgehog is looking extra adorable today! Those tiny little paws just melt my heart 🦔💕",
    image: hedge,
    boops: 156,
    comments: 28,
    timeAgo: "1d ago",
    isLocal: true,
  },
  {
    id: "12",
    type: "milestone",
    author: {
      name: "Kate M.",
      avatar: olivia,
      petName: "Olivia",
      neighborhood: "Downtown",
    },
    content: "Olivia is the most curious kitten! She loves exploring and finding the coziest spots to nap 🐱✨",
    image: olivia,
    milestone: "Curiosity Champion",
    boops: 203,
    comments: 41,
    timeAgo: "1d ago",
    isLocal: true,
  },
  {
    id: "13",
    type: "photo",
    author: {
      name: "Tom W.",
      avatar: gertude,
      petName: "Gertude",
      neighborhood: "Lakeside",
    },
    content: "Gertude the turtle soaking up the sun! Slow and steady wins the race 🐢☀️",
    image: gertude,
    boops: 87,
    comments: 15,
    timeAgo: "1d ago",
    isLocal: false,
  },
  {
    id: "14",
    type: "photo",
    author: {
      name: "Brian C.",
      avatar: charlie,
      petName: "Charlie",
      neighborhood: "Oakwood",
    },
    content: "Charlie the pug is living his best couch potato life! Those wrinkles are irresistible 🐶💤",
    image: charlie,
    boops: 178,
    comments: 32,
    timeAgo: "1d ago",
    isLocal: true,
  },
  {
    id: "15",
    type: "photo",
    author: {
      name: "Derek H.",
      avatar: hunter,
      petName: "Hunter",
      neighborhood: "Downtown",
    },
    content: "Hunter the tarantula showing off his gorgeous colors! Not everyone's cup of tea but I think he's beautiful 🕷️🖤",
    image: hunter,
    boops: 45,
    comments: 19,
    timeAgo: "2d ago",
    isLocal: true,
  },
  {
    id: "16",
    type: "milestone",
    author: {
      name: "Sam J.",
      avatar: jerry,
      petName: "Jerry",
      neighborhood: "Riverside",
    },
    content: "Jerry the chinchilla just discovered his love for cardboard boxes! The softest fluffball you'll ever see 🐭📦",
    image: jerry,
    milestone: "Box Explorer",
    boops: 134,
    comments: 24,
    timeAgo: "2d ago",
    isLocal: true,
  },
  {
    id: "17",
    type: "photo",
    author: {
      name: "Amy S.",
      avatar: steve,
      petName: "Steve",
      neighborhood: "Oakwood",
    },
    content: "Steve the hamster is having a GREAT hair day! Look at that majestic floof 🐹✨",
    image: steve,
    boops: 267,
    comments: 48,
    timeAgo: "2d ago",
    isLocal: true,
  },
  {
    id: "18",
    type: "photo",
    author: {
      name: "Chris P.",
      avatar: slithers,
      petName: "Slithers",
      neighborhood: "Downtown",
    },
    content: "Slithers is the sweetest little snake! Such beautiful patterns and so gentle 🐍💕",
    image: slithers,
    boops: 92,
    comments: 21,
    timeAgo: "2d ago",
    isLocal: false,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"local" | "global">("local");
  const navigate = useNavigate();

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

      {/* Floating Action Button - navigates to Profile */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/profile")}
        className="fab-button fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 animate-pulse-glow"
        aria-label="Go to profile"
        type="button"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </AppLayout>
  );
};

export default Index;


