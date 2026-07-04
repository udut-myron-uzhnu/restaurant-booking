import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true, // позиції одного замовлення
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
      index: true, // "у яких замовленнях цей стіл?"
    },
    guestCount: { type: Number, required: true, min: 1, max: 20 },
    capacitySnapshot: { type: Number, required: true, min: 0 }, // snapshot місткості
  },
  { timestamps: true }
);

export default mongoose.models.OrderItem ||
  mongoose.model("OrderItem", orderItemSchema);
