import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MapPin, Calendar, Users, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { CreatePlaydateModal } from "@/components/modals/CreatePlaydateModal";
import { toast } from "sonner";

const mockEvents = [
  {
    id: "1",
    title: "Saturday Morning Dog Walk",
    location: "Oak Park",
    date: "Jan 18, 2026",
    time: "9:00 AM",
    attendees: 8,
    petSize: "All welcome",
    host: "Sarah M.",
  },
  {
    id: "2",
    title: "Small Dogs Playdate",
    location: "Riverside Dog Park",
    date: "Jan 19, 2026",
    time: "2:00 PM",
    attendees: 5,
    petSize: "Small dogs only",
    host: "Mike T.",
  },
  {
    id: "3",
    title: "Training Tips Meetup",
    location: "Community Center Garden",
    date: "Jan 20, 2026",
    time: "11:00 AM",
    attendees: 12,
    petSize: "All welcome",
    host: "Lisa K.",
  },
];

const Events = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  const handleJoinEvent = (eventId: string, eventTitle: string) => {
    if (joinedEvents.includes(eventId)) {
      setJoinedEvents(joinedEvents.filter(id => id !== eventId));
      toast.info(`Left ${eventTitle}`);
    } else {
      setJoinedEvents([...joinedEvents, eventId]);
      toast.success(`Joined ${eventTitle}! 🎉`);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">Playdates</h1>
          <p className="text-muted-foreground">Find local meetups for your furry friends!</p>
        </div>

        <div className="space-y-4">
          {mockEvents.map((event, index) => {
            const isJoined = joinedEvents.includes(event.id);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-tailtown p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-lg">{event.title}</h3>
                  <span className="personality-tag">{event.petSize}</span>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees + (isJoined ? 1 : 0)} attending • Hosted by {event.host}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleJoinEvent(event.id, event.title)}
                  className={`mt-4 w-full py-2 rounded-xl font-semibold text-sm transition-colors ${
                    isJoined
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isJoined ? "✓ Joined" : "Join Event"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <CreatePlaydateModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </AppLayout>
  );
};

export default Events;
