import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MessageCircle, CheckCircle, ChevronRight, Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { AskQuestionModal } from "@/components/modals/AskQuestionModal";
import { ReportLostPetModal } from "@/components/modals/ReportLostPetModal";
import { toast } from "sonner";

const categories = [
  { id: "health", label: "🏥 Health", count: 42 },
  { id: "training", label: "🎓 Training", count: 38 },
  { id: "nutrition", label: "🍖 Nutrition", count: 25 },
  { id: "gear", label: "🎾 Gear", count: 19 },
];

const mockQuestions = [
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
    id: "3",
    title: "Grain-free vs regular kibble - thoughts?",
    category: "Nutrition",
    categoryId: "nutrition",
    author: "Anna P.",
    answers: 23,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
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
              transition={{ delay: index * 0.1 }}
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
