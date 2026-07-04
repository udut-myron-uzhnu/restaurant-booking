import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Користувач обов'язковий"],
      index: true,
    },
    totalGuests: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "seated", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    notes: { type: String, maxlength: 300, default: "", trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.index({ user: 1, createdAt: -1 });

// Virtual populate: Order.items — зворотній зв'язок з OrderItem.order
orderSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "order",
});

// Каскадне видалення: при видаленні замовлення прибираємо всі його позиції
orderSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await mongoose.model("OrderItem").deleteMany({ order: doc._id });
  }
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
