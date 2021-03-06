const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  unitPrice: Number,
  unitQuantity: Number,
  status: { type: String, enum: ['processed'], default: 'processed' }
}, { timestamps: true });

purchaseSchema.virtual('totalPrice')
  .get(function() {
    return parseFloat((this.unitQuantity * this.unitPrice).toFixed(2));
  });

purchaseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
