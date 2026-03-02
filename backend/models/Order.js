import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    'postal-code': {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  items: [{
    id: String,
    name: String,
    price: String,
    quantity: Number
  }],
  totalAmount: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
