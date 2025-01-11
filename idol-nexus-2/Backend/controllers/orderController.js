import { db } from "../lib/index.js";
import { orders } from "../db/orderSchema.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await db.select().from(orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await db
      .select()
      .from(orders)
      .where(orders.id === Number(id));
    if (!entry.length) {
      return res.status(404).json({ message: "order not found" });
    }
    res.json(order[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

export const createOrder = async (req, res) => {
  const { ticketId, userId, totalAmount, quantity } = req.body;
  try {
    const newOrder = await db
      .insert(orders)
      .values({ ticketId, userId, totalAmount, quantity });
    res.status(201).json({ message: "Order created", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { ticketId, userId, totalAmount, quantity } = req.body;
  try {
    const updated = await db
      .update(orders)
      .set({ ticketId, userId, totalAmount, quantity })
      .where(orders.id === Number(id));
    res.json({ message: "orders updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(orders).where(orders.id === Number(id));
    res.json({ message: "order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
