import { db } from "../lib/index.js";
import { payments } from "../db/paymentSchema.js";

export const getAllPayments = async (req, res) => {
  try {
    const allPayments = await db.select().from(payments);
    res.json(allPayments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

export const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await db
      .select()
      .from(payments)
      .where(payments.id === Number(id));
    if (!payment.length) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment[0]);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Error fetching payment", error });
  }
};

export const createPayment = async (req, res) => {
  const { orderId, stripePaymentId, amount } = req.body;
  try {
    const newPayment = await db.insert(payments).values({
      orderId,
      stripePaymentId,
      amount,
    });
    res
      .status(201)
      .json({ message: "Payment created successfully", newPayment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Error creating payment", error });
  }
};

export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { stripePaymentId, amount } = req.body;
  try {
    const updatedPayment = await db
      .update(payments)
      .set({ stripePaymentId, amount })
      .where(payments.id === Number(id))
      .returning();
    res.json({ message: "Payment updated successfully", updatedPayment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Error updating payment", error });
  }
};

export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(payments).where(payments.id === Number(id));
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Error deleting payment", error });
  }
};
