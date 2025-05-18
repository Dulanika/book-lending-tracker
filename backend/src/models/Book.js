const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  status: { type: String, enum: ['available', 'borrowed'], default: 'available' },
  actualReturnDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
