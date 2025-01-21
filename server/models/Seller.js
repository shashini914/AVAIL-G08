const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Painter', 'Tutors', 'Builders', 'Electricians', 'Plumbers'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

SellerSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing


module.exports = mongoose.model('Seller', SellerSchema);