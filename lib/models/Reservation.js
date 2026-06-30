import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: [true, 'Стіл обов\'язковий'],
    },
    guestName: {
      type: String,
      required: [true, 'Ім\'я гостя обов\'язкове'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    date: {
      type: Date,
      required: [true, 'Дата обов\'язкова'],
    },
    time: {
      type: String,
      required: [true, 'Час обов\'язковий'],
      match: [/^\d{2}:\d{2}$/, 'Час має бути у форматі HH:MM'],
    },
    guestCount: {
      type: Number,
      required: [true, 'Кількість гостей обов\'язкова'],
      min: [1, 'Має бути щонайменше 1 гість'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema)
