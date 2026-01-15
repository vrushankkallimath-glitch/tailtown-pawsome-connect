import { AppLayout } from "@/components/layout/AppLayout";
import { Settings, Edit3, Plus } from "lucide-react";
import { motion } from "framer-motion";

import dogGolden from "@/assets/images(2).jpg";
import catOrange from "@/assets/unnamed.png";

const userProfile = {
  name: "Jamie Wilson",
  neighborhood: "Downtown",
  memberSince: "2024",
  stats: {
    posts: 47,
    boops: 892,
    friends: 23,
  },
};

const pets = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    energyLevel: "High",
    image: dogGolden,
    tags: ["#Zoomies", "#BallIsLife", "#SwimLover"],
  },
  {
    id: "2",
    name: "Mango",
    breed: "Orange Tabby",
    age: "4 years",
    energyLevel: "Medium",
    image: catOrange,
    tags: ["#CuddleBug", "#NapQueen", "#TreatMotivated"],
  },
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold">My Pack</h1>
          <button className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-tailtown p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
              {userProfile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-xl">{userProfile.name}</h2>
              <p className="text-sm text-muted-foreground">
                📍 {userProfile.neighborhood} • Member since {userProfile.memberSince}
              </p>
            </div>
            <button className="p-2 rounded-xl hover:bg-muted transition-colors">
              <Edit3 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-sage-light">
              <p className="font-display font-bold text-xl">{userProfile.stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="p-3 rounded-xl bg-terracotta-light">
              <p className="font-display font-bold text-xl">{userProfile.stats.boops}</p>
              <p className="text-xs text-muted-foreground">Boops</p>
            </div>
            <div className="p-3 rounded-xl bg-sage-light">
              <p className="font-display font-bold text-xl">{userProfile.stats.friends}</p>
              <p className="text-xs text-muted-foreground">Friends</p>
            </div>
          </div>
        </motion.div>

        {/* Pets Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl">My Pets</h2>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add Pet
          </button>
        </div>

        <div className="space-y-4">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-tailtown overflow-hidden"
            >
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-lg">{pet.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      pet.energyLevel === "High" 
                        ? "bg-secondary/20 text-secondary" 
                        : pet.energyLevel === "Medium"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      ⚡ {pet.energyLevel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pet.breed} • {pet.age}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {pet.tags.map((tag) => (
                      <span key={tag} className="personality-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
