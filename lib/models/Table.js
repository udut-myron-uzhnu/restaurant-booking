import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, 'Номер столу обов\'язковий'],
      unique: true,
      min: [1, 'Номер має бути не менше 1'],
    },
    capacity: {
      type: Number,
      required: [true, 'Місткість обов\'язкова'],
      min: [1, 'Місткість має бути не менше 1'],
    },
    location: {
      type: String,
      enum: {
        values: ['main_hall', 'terrace', 'vip', 'bar'],
        message: 'Зона має бути: main_hall, terrace, vip або bar',
      },
      default: 'main_hall',
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [300, 'Опис не може бути довшим за 300 символів'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Table || mongoose.model('Table', tableSchema)
