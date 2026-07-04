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

// Каскадне видалення: прибираємо позиції з цим столом, а замовлення,
// що залишилися без жодного столу, видаляємо повністю
tableSchema.pre('findOneAndDelete', async function () {
  const doc = await this.model.findOne(this.getFilter())
  if (doc) {
    const OrderItem = mongoose.model('OrderItem')
    const Order = mongoose.model('Order')
    const affected = await OrderItem.find({ table: doc._id }).distinct('order')
    await OrderItem.deleteMany({ table: doc._id })
    for (const orderId of affected) {
      const left = await OrderItem.countDocuments({ order: orderId })
      if (left === 0) {
        await Order.deleteOne({ _id: orderId })
      }
    }
  }
})

export default mongoose.models.Table || mongoose.model('Table', tableSchema)
