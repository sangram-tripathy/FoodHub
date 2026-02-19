import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
  }]
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
