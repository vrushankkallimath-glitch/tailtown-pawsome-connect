import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Settings, Edit3, Plus, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AddPetModal } from "@/components/modals/AddPetModal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Import pet images
import max from "@/assets/pets/max.jpg";
import mango from "@/assets/pets/mango.jpg";

const initialProfile = {
  name: "Jamie Wilson",
  neighborhood: "Downtown",
  bio: "Pet parent to Max & Mango. Love outdoor adventures!",
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
    image: max,
    tags: ["#Zoomies", "#BallIsLife", "#SwimLover"],
  },
  {
    id: "2",
    name: "Mango",
    breed: "Persian Cat",
    age: "4 years",
    energyLevel: "Medium",
    image: mango,
    tags: ["#CuddleBug", "#NapQueen", "#TreatMotivated"],
  },
];

const Profile = () => {
  const [addPetModalOpen, setAddPetModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    neighborhood: profile.neighborhood,
    bio: profile.bio,
  });

  const handleEditClick = () => {
    setEditForm({
      name: profile.name,
      neighborhood: profile.neighborhood,
      bio: profile.bio,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({
      ...profile,
      name: editForm.name,
      neighborhood: editForm.neighborhood,
      bio: editForm.bio,
    });
    setIsEditing(false);
    toast.success("Profile updated! 🎉");
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      neighborhood: profile.neighborhood,
      bio: profile.bio,
    });
    setIsEditing(false);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold">My Pack</h1>
          <Link to="/settings" className="p-2 rounded-xl hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-tailtown p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
              {(isEditing ? editForm.name : profile.name).charAt(0)}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Your name"
                    className="font-display font-bold text-lg"
                  />
                  <Input
                    value={editForm.neighborhood}
                    onChange={(e) => setEditForm({ ...editForm, neighborhood: e.target.value })}
                    placeholder="Neighborhood"
                    className="text-sm"
                  />
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-xl">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    📍 {profile.neighborhood} • Member since {profile.memberSince}
                  </p>
                </>
              )}
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEditClick}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            )}
          </div>

          {/* Bio */}
          {isEditing ? (
            <Input
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              placeholder="Write a short bio..."
              className="mb-4"
            />
          ) : (
            <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
          )}

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-sage-light">
              <p className="font-display font-bold text-xl">{profile.stats.posts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="p-3 rounded-xl bg-terracotta-light">
              <p className="font-display font-bold text-xl">{profile.stats.boops}</p>
              <p className="text-xs text-muted-foreground">Boops</p>
            </div>
            <div className="p-3 rounded-xl bg-sage-light">
              <p className="font-display font-bold text-xl">{profile.stats.friends}</p>
              <p className="text-xs text-muted-foreground">Friends</p>
            </div>
          </div>
        </motion.div>

        {/* Pets Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl">My Pets</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddPetModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Pet
          </motion.button>
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
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
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

      <AddPetModal open={addPetModalOpen} onOpenChange={setAddPetModalOpen} />
    </AppLayout>
  );
};

export default Profile;
