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
    date: "Jan 25, 2026",
    time: "9:00 AM",
    attendees: 8,
    petSize: "All welcome",
    host: "Sarah M.",
  },
  {
    id: "2",
    title: "Small Dogs Playdate",
    location: "Riverside Dog Park",
    date: "Jan 26, 2026",
    time: "2:00 PM",
    attendees: 5,
    petSize: "Small dogs only",
    host: "Mike T.",
  },
  {
    id: "3",
    title: "Training Tips Meetup",
    location: "Community Center Garden",
    date: "Jan 27, 2026",
    time: "11:00 AM",
    attendees: 12,
    petSize: "All welcome",
    host: "Lisa K.",
  },
  {
    id: "4",
    title: "Golden Retriever Meetup",
    location: "Sunset Beach",
    date: "Jan 28, 2026",
    time: "10:00 AM",
    attendees: 15,
    petSize: "All welcome",
    host: "Emily R.",
  },
  {
    id: "5",
    title: "Puppy Yoga in the Park",
    location: "Central Park Meadow",
    date: "Jan 29, 2026",
    time: "8:00 AM",
    attendees: 20,
    petSize: "Puppies under 1 year",
    host: "Yoga with Paws",
  },
  {
    id: "6",
    title: "Cat Café Social",
    location: "Whiskers Café",
    date: "Jan 30, 2026",
    time: "3:00 PM",
    attendees: 8,
    petSize: "Cats only",
    host: "Tom B.",
  },
  {
    id: "7",
    title: "Agility Training Workshop",
    location: "Oakwood Dog Arena",
    date: "Feb 1, 2026",
    time: "10:30 AM",
    attendees: 10,
    petSize: "Medium & Large dogs",
    host: "Coach Dan",
  },
  {
    id: "8",
    title: "Senior Pets Stroll",
    location: "Lakeside Trail",
    date: "Feb 2, 2026",
    time: "4:00 PM",
    attendees: 6,
    petSize: "Senior pets (7+ years)",
    host: "Anna P.",
  },
  {
    id: "9",
    title: "Exotic Pets Show & Tell",
    location: "Community Hall",
    date: "Feb 3, 2026",
    time: "1:00 PM",
    attendees: 18,
    petSize: "All exotic pets",
    host: "Exotic Pet Club",
  },
  {
    id: "10",
    title: "Dachshund Derby",
    location: "Downtown Park",
    date: "Feb 4, 2026",
    time: "11:00 AM",
    attendees: 25,
    petSize: "Dachshunds only",
    host: "Wiener Dog Society",
  },
  {
    id: "11",
    title: "Pet Photography Session",
    location: "Botanical Gardens",
    date: "Feb 5, 2026",
    time: "9:30 AM",
    attendees: 12,
    petSize: "All welcome",
    host: "PawPrints Studio",
  },
  {
    id: "12",
    title: "Husky Howl Night",
    location: "Mountain View Park",
    date: "Feb 6, 2026",
    time: "6:00 PM",
    attendees: 14,
    petSize: "Huskies & Northern breeds",
    host: "Arctic Paws Club",
  },
  {
    id: "13",
    title: "Bunny Hop Social",
    location: "Meadow Gardens",
    date: "Feb 7, 2026",
    time: "2:30 PM",
    attendees: 9,
    petSize: "Rabbits only",
    host: "Bunny Lovers United",
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
                transition={{ delay: index * 0.05 }}
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
