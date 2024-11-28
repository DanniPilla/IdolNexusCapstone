import { db } from "./db/index.js";
import { events } from "./db/eventSchema.js";

async function seed() {
  await db.insert(events).values([
    {
      name: "JPop Idol Concert",
      description: "An amazing JPop event",
      date: new Date("2024-12-01"),
      location: "Tokyo Dome",
      price: "30.00",
    },
    {
      name: "Local Idol Meetup",
      description: "Meet your favorite idols!",
      date: new Date("2024-11-30"),
      location: "Osaka Hall",
      price: "15.00",
    },
    {
      name: "Virtual Idol Fest",
      description: "A global online concert",
      date: new Date("2024-12-05"),
      location: "Online",
      price: "10.00",
    },
  ]);

  console.log("Dummy data seeded successfully");
}

seed().catch((err) => {
  console.error("Error seeding data:", err);
});
