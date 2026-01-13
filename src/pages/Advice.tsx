import { AppLayout } from "@/components/layout/AppLayout";
import { MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
    author: "Emily R.",
    answers: 12,
    hasTrustedAnswer: true,
    timeAgo: "3h ago",
  },
  {
    id: "2",
    title: "How to stop leash pulling during walks?",
    category: "Training",
    author: "Tom B.",
    answers: 8,
    hasTrustedAnswer: false,
    timeAgo: "5h ago",
  },
  {
    id: "3",
    title: "Grain-free vs regular kibble - thoughts?",
    category: "Nutrition",
    author: "Anna P.",
    answers: 23,
    hasTrustedAnswer: true,
    timeAgo: "1d ago",
  },
];

const Advice = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">Bark Board</h1>
          <p className="text-muted-foreground">Get advice from fellow pet parents!</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex-shrink-0 px-4 py-2 rounded-full bg-sage-light text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {mockQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
      </div>
    </AppLayout>
  );
};

export default Advice;
