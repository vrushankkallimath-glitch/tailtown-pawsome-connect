import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MessageCircle, CheckCircle, ChevronRight, Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { AskQuestionModal } from "@/components/modals/AskQuestionModal";
import { ReportLostPetModal } from "@/components/modals/ReportLostPetModal";
import { toast } from "sonner";

const categories = [
  { id: "health", label: "🏥 Health", count: 52 },
  { id: "training", label: "🎓 Training", count: 48 },
  { id: "nutrition", label: "🍖 Nutrition", count: 35 },
  { id: "gear", label: "🎾 Gear", count: 29 },
];

const mockQuestions = [
  // Health questions
  {
    id: "1",
    title: "Best flea treatment for sensitive skin?",
    category: "Health",
    categoryId: "health",
    author: "Emily R.",
    answers: 12,
    hasTrustedAnswer: true,
    timeAgo: "3h ago",
  },
  {
    id: "h2",
    title: "How often should I take my dog to the vet?",
    category: "Health",
    categoryId: "health",
    author: "Mark S.",
    answers: 8,
    hasTrustedAnswer: true,
    timeAgo: "5h ago",
  },
  {
    id: "h3",
    title: "My cat is sneezing a lot - should I be worried?",
    category: "Health",
    categoryId: "health",
    author: "Lisa M.",
    answers: 15,
    hasTrustedAnswer: true,
    timeAgo: "8h ago",
  },
  {
    id: "h4",
    title: "Signs of dental problems in dogs?",
    category: "Health",
    categoryId: "health",
    author: "Jake P.",
    answers: 6,
    hasTrustedAnswer: false,
    timeAgo: "12h ago",
  },
  {
    id: "h5",
    title: "How to check for ticks after a hike?",
    category: "Health",
    categoryId: "health",
    author: "Susan K.",
    answers: 11,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "h6",
    title: "My rabbit isn't eating - emergency signs to watch for?",
    category: "Health",
    categoryId: "health",
    author: "Amy L.",
    answers: 9,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "h7",
    title: "Best pet insurance for older dogs?",
    category: "Health",
    categoryId: "health",
    author: "David W.",
    answers: 14,
    hasTrustedAnswer: false,
    timeAgo: "2d ago",
  },
  {
    id: "h8",
    title: "How to help my anxious cat during thunderstorms?",
    category: "Health",
    categoryId: "health",
    author: "Nina T.",
    answers: 7,
    hasTrustedAnswer: true,
    timeAgo: "2d ago",
  },
  {
    id: "h9",
    title: "Symptoms of heartworm in dogs?",
    category: "Health",
    categoryId: "health",
    author: "Chris B.",
    answers: 10,
    hasTrustedAnswer: true,
    timeAgo: "3d ago",
  },
  {
    id: "h10",
    title: "Is it normal for puppies to sleep this much?",
    category: "Health",
    categoryId: "health",
    author: "Rachel H.",
    answers: 18,
    hasTrustedAnswer: true,
    timeAgo: "3d ago",
  },
  {
    id: "h11",
    title: "How to clean my dog's ears safely?",
    category: "Health",
    categoryId: "health",
    author: "Kevin O.",
    answers: 5,
    hasTrustedAnswer: false,
    timeAgo: "4d ago",
  },

  // Training questions
  {
    id: "2",
    title: "How to stop leash pulling during walks?",
    category: "Training",
    categoryId: "training",
    author: "Tom B.",
    answers: 8,
    hasTrustedAnswer: false,
    timeAgo: "5h ago",
  },
  {
    id: "t2",
    title: "Best way to crate train a puppy?",
    category: "Training",
    categoryId: "training",
    author: "Jessica F.",
    answers: 22,
    hasTrustedAnswer: true,
    timeAgo: "6h ago",
  },
  {
    id: "t3",
    title: "How to stop my dog from barking at strangers?",
    category: "Training",
    categoryId: "training",
    author: "Michael D.",
    answers: 16,
    hasTrustedAnswer: true,
    timeAgo: "10h ago",
  },
  {
    id: "t4",
    title: "Teaching 'stay' command - my dog keeps breaking it",
    category: "Training",
    categoryId: "training",
    author: "Laura G.",
    answers: 9,
    hasTrustedAnswer: false,
    timeAgo: "14h ago",
  },
  {
    id: "t5",
    title: "How to introduce a new cat to my resident cat?",
    category: "Training",
    categoryId: "training",
    author: "Brian C.",
    answers: 13,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "t6",
    title: "Potty training regression in 6-month-old puppy?",
    category: "Training",
    categoryId: "training",
    author: "Samantha J.",
    answers: 11,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "t7",
    title: "Best positive reinforcement treats for training?",
    category: "Training",
    categoryId: "training",
    author: "Derek H.",
    answers: 7,
    hasTrustedAnswer: false,
    timeAgo: "2d ago",
  },
  {
    id: "t8",
    title: "How to stop my cat from scratching furniture?",
    category: "Training",
    categoryId: "training",
    author: "Monica R.",
    answers: 19,
    hasTrustedAnswer: true,
    timeAgo: "2d ago",
  },
  {
    id: "t9",
    title: "Clicker training basics - where to start?",
    category: "Training",
    categoryId: "training",
    author: "Steve L.",
    answers: 14,
    hasTrustedAnswer: true,
    timeAgo: "3d ago",
  },
  {
    id: "t10",
    title: "My dog won't come when called at the park",
    category: "Training",
    categoryId: "training",
    author: "Katie N.",
    answers: 20,
    hasTrustedAnswer: true,
    timeAgo: "4d ago",
  },
  {
    id: "t11",
    title: "How to socialize a shy rescue dog?",
    category: "Training",
    categoryId: "training",
    author: "Paul V.",
    answers: 12,
    hasTrustedAnswer: false,
    timeAgo: "5d ago",
  },

  // Nutrition questions
  {
    id: "3",
    title: "Grain-free vs regular kibble - thoughts?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Anna P.",
    answers: 23,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "n2",
    title: "How much should I feed my 3-month-old puppy?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Tyler M.",
    answers: 10,
    hasTrustedAnswer: true,
    timeAgo: "7h ago",
  },
  {
    id: "n3",
    title: "Is raw diet safe for dogs?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Rebecca S.",
    answers: 28,
    hasTrustedAnswer: true,
    timeAgo: "9h ago",
  },
  {
    id: "n4",
    title: "Best food for cats with sensitive stomachs?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Andrew K.",
    answers: 15,
    hasTrustedAnswer: true,
    timeAgo: "15h ago",
  },
  {
    id: "n5",
    title: "Human foods that are toxic for pets - complete list?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Diana L.",
    answers: 31,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
  {
    id: "n6",
    title: "My dog is overweight - best diet plan?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "George T.",
    answers: 17,
    hasTrustedAnswer: true,
    timeAgo: "2d ago",
  },
  {
    id: "n7",
    title: "Recommended supplements for senior dogs?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Helen W.",
    answers: 9,
    hasTrustedAnswer: false,
    timeAgo: "2d ago",
  },
  {
    id: "n8",
    title: "Wet food vs dry food for cats?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Ian F.",
    answers: 21,
    hasTrustedAnswer: true,
    timeAgo: "3d ago",
  },
  {
    id: "n9",
    title: "Best treats that won't cause weight gain?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Julia A.",
    answers: 12,
    hasTrustedAnswer: false,
    timeAgo: "4d ago",
  },
  {
    id: "n10",
    title: "How to transition to a new dog food brand?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Kyle D.",
    answers: 8,
    hasTrustedAnswer: true,
    timeAgo: "5d ago",
  },
  {
    id: "n11",
    title: "Homemade dog food recipes that are vet-approved?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Megan B.",
    answers: 14,
    hasTrustedAnswer: false,
    timeAgo: "6d ago",
  },

  // Gear questions
  {
    id: "g1",
    title: "Best harness for dogs that pull?",
    category: "Gear",
    categoryId: "gear",
    author: "Nathan C.",
    answers: 19,
    hasTrustedAnswer: true,
    timeAgo: "4h ago",
  },
  {
    id: "g2",
    title: "Recommendations for durable chew toys?",
    category: "Gear",
    categoryId: "gear",
    author: "Olivia J.",
    answers: 24,
    hasTrustedAnswer: true,
    timeAgo: "8h ago",
  },
  {
    id: "g3",
    title: "Best GPS tracker collar for cats?",
    category: "Gear",
    categoryId: "gear",
    author: "Peter R.",
    answers: 11,
    hasTrustedAnswer: true,
    timeAgo: "11h ago",
  },
  {
    id: "g4",
    title: "Automatic feeder recommendations?",
    category: "Gear",
    categoryId: "gear",
    author: "Quinn S.",
    answers: 16,
    hasTrustedAnswer: true,
    timeAgo: "16h ago",
  },
  {
    id: "g5",
    title: "Best car seat cover for dogs?",
    category: "Gear",
    categoryId: "gear",
    author: "Ryan M.",
    answers: 7,
    hasTrustedAnswer: false,
    timeAgo: "1d ago",
  },
  {
    id: "g6",
    title: "Heated pet bed - worth it for older dogs?",
    category: "Gear",
    categoryId: "gear",
    author: "Sophia L.",
    answers: 13,
    hasTrustedAnswer: true,
    timeAgo: "2d ago",
  },
  {
    id: "g7",
    title: "Best pet camera with treat dispenser?",
    category: "Gear",
    categoryId: "gear",
    author: "Thomas K.",
    answers: 18,
    hasTrustedAnswer: true,
    timeAgo: "2d ago",
  },
  {
    id: "g8",
    title: "Recommendations for a good pet stroller?",
    category: "Gear",
    categoryId: "gear",
    author: "Uma N.",
    answers: 9,
    hasTrustedAnswer: false,
    timeAgo: "3d ago",
  },
  {
    id: "g9",
    title: "Best litter box for multiple cats?",
    category: "Gear",
    categoryId: "gear",
    author: "Victor P.",
    answers: 22,
    hasTrustedAnswer: true,
    timeAgo: "4d ago",
  },
  {
    id: "g10",
    title: "Water fountain vs regular bowl for cats?",
    category: "Gear",
    categoryId: "gear",
    author: "Wendy H.",
    answers: 15,
    hasTrustedAnswer: true,
    timeAgo: "5d ago",
  },
  {
    id: "g11",
    title: "Best brush for double-coated dogs?",
    category: "Gear",
    categoryId: "gear",
    author: "Xavier T.",
    answers: 10,
    hasTrustedAnswer: false,
    timeAgo: "6d ago",
  },
];

const Advice = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [lostPetModalOpen, setLostPetModalOpen] = useState(false);

  const filteredQuestions = activeCategory
    ? mockQuestions.filter(q => q.categoryId === activeCategory)
    : mockQuestions;

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
      toast.info(`Showing ${categories.find(c => c.id === categoryId)?.label} questions`);
    }
  };

  const handleQuestionClick = (question: typeof mockQuestions[0]) => {
    toast.info(`Opening "${question.title}"`);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">Bark Board</h1>
          <p className="text-muted-foreground">Get advice from fellow pet parents!</p>
        </div>

        {/* Lost Pet Alert Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLostPetModalOpen(true)}
          className="w-full mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 hover:bg-destructive/15 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <span className="font-semibold text-destructive">Report a Lost Pet</span>
          <ChevronRight className="w-5 h-5 text-destructive ml-auto" />
        </motion.button>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-sage-light hover:bg-primary/20"
              }`}
            >
              {cat.label} ({cat.count})
            </motion.button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuestionClick(question)}
              className="card-tailtown p-4 cursor-pointer hover:shadow-tailtown-lg transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-secondary">{question.category}</span>
                    {question.hasTrustedAnswer && (
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Trusted Answer
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold mb-2">{question.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>by {question.author}</span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {question.answers} answers
                    </span>
                    <span>{question.timeAgo}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions in this category yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Be the first to ask! 🐾</p>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAskModalOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <AskQuestionModal open={askModalOpen} onOpenChange={setAskModalOpen} />
      <ReportLostPetModal open={lostPetModalOpen} onOpenChange={setLostPetModalOpen} />
    </AppLayout>
  );
};

export default Advice;
