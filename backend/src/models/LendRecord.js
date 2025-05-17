const mongoose = require('mongoose');

const lendRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowerName: { type: String, required: true },
  lendDate: { type: Date, required: true },
  expectedReturnDate: { type: Date },
  returned: { type: Boolean, default: false },
  actualReturnDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('LendRecord', lendRecordSchema);
