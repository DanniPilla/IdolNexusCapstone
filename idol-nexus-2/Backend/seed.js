import { db } from "./db/index.js";
import { events } from "./db/eventSchema.js";
import { users } from "./db/userSchema.js";
import { tickets } from "./db/ticketSchema.js";
import { calendar } from "./db/calendarSchema.js";
import { payments } from "./db/paymentSchema.js";
import { venues } from "./db/venueSchema.js";
import { orders } from "./db/orderSchema";
import { organisers } from "./db/organiserSchema.js";

async function seed() {
  try {
    // Start a transaction
    await db.transaction(async (trx) => {
      // Seed Users
      const userIds = await trx.insert(users).values([
        {
          firebaseUid: "uid1",
          email: "user1@example.com",
          firstName: "John",
          lastName: "Doe",
          displayName: "JohnD",
          profilePicture: "https://example.com/johnd.jpg",
          role: "attendee",
        },
        {
          firebaseUid: "uid2",
          email: "user2@example.com",
          firstName: "Jane",
          lastName: "Smith",
          displayName: "JaneS",
          profilePicture: "https://example.com/janes.jpg",
          role: "organizer",
        },
      ]);

      // Seed Venues
      const venueIds = await trx.insert(venues).values([
        {
          name: "Grand Hall",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "USA",
          postalCode: "10001",
          capacity: 500,
        },
        {
          name: "Open Arena",
          address: "456 Broadway Ave",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          postalCode: "90001",
          capacity: 1000,
        },
      ]);

      // Seed Events
      const eventIds = await trx.insert(events).values([
        {
          name: "Music Fest",
          description: "A grand music festival featuring top artists.",
          category: "Music",
          tags: JSON.stringify(["music", "festival", "live"]),
          organizerId: userIds[1].id, // Assuming user 2 is the organizer
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // +2 days
          location: "Grand Hall",
          status: "upcoming",
          capacity: 500,
        },
        {
          name: "Tech Expo",
          description: "A technology exhibition showcasing innovations.",
          category: "Technology",
          tags: JSON.stringify(["tech", "expo", "innovation"]),
          organizerId: userIds[1].id,
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // +5 days
          location: "Open Arena",
          status: "upcoming",
          capacity: 1000,
        },
      ]);

      // Seed Tickets
      const ticketIds = await trx.insert(tickets).values([
        {
          eventId: eventIds[0].id,
          userId: userIds[0].id, // User 1 buys tickets
          ticketType: "VIP",
          price: 200.0,
          quantity: 2,
          status: "active",
        },
        {
          eventId: eventIds[1].id,
          userId: userIds[0].id,
          ticketType: "General",
          price: 100.0,
          quantity: 1,
          status: "active",
        },
      ]);

      // Seed Orders
      const orderIds = await trx.insert(orders).values([
        {
          userId: userIds[0].id,
          ticketId: ticketIds[0].id,
          quantity: 2,
          totalAmount: 400.0, // 2 tickets x $200
          orderStatus: "completed",
        },
        {
          userId: userIds[0].id,
          ticketId: ticketIds[1].id,
          quantity: 1,
          totalAmount: 100.0, // 1 ticket x $100
          orderStatus: "completed",
        },
      ]);

      // Seed Payments
      const paymentIds = await trx.insert(payments).values([
        {
          orderId: orderIds[0].id,
          userId: userIds[0].id,
          stripePaymentId: "pi_12345",
          amount: 400.0,
          currency: "USD",
          paymentStatus: "completed",
        },
        {
          orderId: orderIds[1].id,
          userId: userIds[0].id,
          stripePaymentId: "pi_67890",
          amount: 100.0,
          currency: "USD",
          paymentStatus: "completed",
        },
      ]);

      // Seed Calendar
      await trx.insert(calendar).values([
        {
          eventId: eventIds[0].id,
          userId: userIds[0].id,
        },
        {
          eventId: eventIds[1].id,
          userId: userIds[0].id,
        },
      ]);

      console.log("Seed data inserted successfully.");
    });
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
