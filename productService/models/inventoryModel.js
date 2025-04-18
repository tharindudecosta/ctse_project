const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
