import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { MobileHeader } from "@/components/feed/MobileHeader";
import { SOSBanner } from "@/components/feed/SOSBanner";
import { FeedTabs } from "@/components/feed/FeedTabs";
import { PostCard, PostType } from "@/components/feed/PostCard";

// Placeholder images from placeholder.com
const images1 = "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=500&h=500&fit=crop";
const images2 = "https://images.unsplash.com/photo-1633722715463-d30628519d50?w=500&h=500&fit=crop";
const images3 = "https://images.unsplash.com/photo-1568938764329-f61523b1d2e4?w=500&h=500&fit=crop";
const unnamed = "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=500&h=500&fit=crop";
const unnamed1 = "https://images.unsplash.com/photo-1535241749838-299f5865b642?w=500&h=500&fit=crop";
const unnamed2 = "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&h=500&fit=crop";
const unnamed3 = "https://images.unsplash.com/photo-1567439034433-c48137f4d310?w=500&h=500&fit=crop";
const unnamed4 = "https://images.unsplash.com/photo-1469022785867-39a639ab983f?w=500&h=500&fit=crop";
const unnamed5 = "https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=500&h=500&fit=crop";
const unnamed6 = "https://images.unsplash.com/photo-1633056452045-73263daa5c34?w=500&h=500&fit=crop";
const unnamed7 = "https://images.unsplash.com/photo-1623810914620-501a3b22e94b?w=500&h=500&fit=crop";
const unnamed8 = "https://images.unsplash.com/photo-1597955216563-430f63602d4b?w=500&h=500&fit=crop";
const unnamed9 = "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&h=500&fit=crop";
const unnamed10 = "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=500&fit=crop";
const unnamed11 = "https://images.unsplash.com/photo-1615751072765-f7fdfcf0f445?w=500&h=500&fit=crop";
const unnamed12 = "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=500&fit=crop";
const hedgehog = "https://images.unsplash.com/photo-1608848461950-0fed8e8f50aa?w=500&h=500&fit=crop";

const max = images2;
const mango = images3;
const golide = unnamed5;
const steve = unnamed;
const jellybean = unnamed1;
const willow = unnamed2;
const gertrude = unnamed3;
const rio = unnamed4;
const frosty = unnamed6;
const sprinkles = unnamed7;
const mikey = unnamed8;
const jimmy = unnamed9;
const jerry = unnamed10;
const hunter = unnamed11;
const slithers = unnamed12;
const iggy = images1;
const hedge = hedgehog;


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
    image: images2,
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
    content: "Mango here's chillin by the window side!🐾",
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
      avatar: golide,
      petName: "Goldie",
      neighborhood: "Riverside",
    },
    content: "Fish are such fascinating pets! Goldie has been swimming around all day, exploring every corner of her small bowl. 🐠 Anyone else have tips on creating a more enriching environment for their aquatic friends?",
    image: golide,
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
      avatar: steve,
      petName: "Steve",
      neighborhood: "Maple Heights",
    },
content: "steve is literally just a sentient potato who's really majestic, and his real cuteness in his cheeks!!! 10/10 no thoughts, just gives steve harrington vibes, and a total main character moment every time he finds a sunflower seed",
    image: steve, 
    boops: 234,
    comments: 45,
    timeAgo: "6h ago",
    isLocal: false,
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
    content: "jellybean just turned 3 years!! he is a very active male hamster.  he is very healthy and runs in his hamster wheel all day.",
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
      name: "Sophia G.",
      avatar: gertrude,
      petName: "Gertrude",
      neighborhood: "SunnyVale",
    },
    content: "Gertrude here is living her best life soaking up the sun!",
    image: gertrude,
    boops: 75,
    comments: 15,
    timeAgo: "14h ago",
    isLocal: false,
  },
  {
    id: "8",
    type: "photo",  
    author: {
      name: "James B.",
      avatar: rio,
      petName: "Rio",
      neighborhood: "Chilltown",
    },
    content: "Rio is a parrot who loves to dance to music! Whenever I play some tunes, he starts bobbing his head and moving his feet. It's the cutest thing ever! ", 
    image: rio,
    boops: 64,
    comments: 9,
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
    content: "Frosty the husky pup enjoying his first snow day!",
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
    content: "Sprinkles Scorpion is ready for his close-up!",
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
      name: "Mia H.",
      avatar: mikey,
      petName: "Mikey",
      neighborhood: "Downtown",
    },
    content: "Mikey the lizard basking under his heat lamp!",
    image: mikey,
    boops: 47,
    comments: 11,
    timeAgo: "22h ago",
    isLocal: false,
  },
  {
    id: "12",
    type: "photo",
    author: {
      name: "Noah D.",
      avatar: jimmy,
      petName: "Jimmy",
      neighborhood: "Riverside",
    },
    content: "Jimmy the pomerianian looking dapper as ever!",
    image: jimmy,
    boops: 29,
    comments: 6,
    timeAgo: "1d ago",
    isLocal: true,
  },
  {
    id: "13",
    type: "photo", 
    author: {
      name: "Ava C.",
      avatar: jerry,
      petName: "Jerry",
      neighborhood: "Maple Heights",
    },
    content: "Jerry the mouse is the cutest and softest thing alive!",
    image: jerry,
    boops: 53,
    comments: 13,
    timeAgo: "1d ago",
    isLocal: false,
  },
  {
    id: "14",
    type: "photo",
    author: {
      name: "Liam S.",
      avatar: hunter,
      petName: "Hunter",
      neighborhood: "SunnyVale",
    },
    content: "Hunter the ferret is always up to some mischief!",
    image: hunter,
    boops: 61, 
    comments: 10,
    timeAgo: "1d ago",
    isLocal: true,
  },
  {
    id: "15",
    type: "photo", 
    author: {
      name: "Isabella M.",
      avatar: slithers,
      petName: "Slithers",
      neighborhood: "Chilltown",
    },
    content: "Slithers the snake is looking extra shiny after his shed!",
    image: slithers,
    boops: 22,
    comments: 4,
    timeAgo: "2d ago",
    isLocal: false,
  },
  {
    id: "16",
    type: "photo",    
    author: {
      name: "Lucas J.",
      avatar: iggy,
      petName: "Iggy",
      neighborhood: "Oakwood",
    },
    content: "Iggy the iguana is loving his new basking spot!",
    image: iggy,
    boops: 38,
    comments: 7,
    timeAgo: "2d ago",
    isLocal: true,
  },
  {
    id: "17",
    type: "photo",  
    author: {
      name: "Charlotte V.",
      avatar: hedge,
      petName: "Hedge",
      neighborhood: "Downtown",  
    },
    content: "Hedge the hedgehog is ready for his close-up!",
    image: hedgehog,
    boops: 45,
    comments: 9,
    timeAgo: "2d ago",
    isLocal: false,
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


