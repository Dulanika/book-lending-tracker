const LendRepository = require('../repositories/LendRepository');
const BookRepository = require('../repositories/BookRepository');
const mongoose = require('mongoose');

class LendService {
async lendBook(userId, bookId, borrowerName, lendDate = new Date()) {
  const book = await BookRepository.findById(bookId);
  if (!book || book.userId.toString() !== userId) {
    throw new Error('Book not found or unauthorized');
  }

  if (book.status === 'borrowed') {
    throw new Error('Book is already borrowed');
  }

  // Auto-calculate expected return ( 14 days later)
  const expectedReturnDate = new Date(lendDate);
  expectedReturnDate.setDate(expectedReturnDate.getDate() + 14);

  const lendRecord = await LendRepository.createLendRecord({
    userId,
    bookId,
    borrowerName,
    lendDate,
    expectedReturnDate,
  });

  await BookRepository.updateBook(bookId, { status: 'borrowed' });

  return lendRecord;
}


async returnBook(userId, bookId) {
  console.log('Received for return:', { userId, bookId });

  // Validate the format of bookId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error('Invalid bookId format');
  }

  const book = await BookRepository.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  if (book.userId.toString() !== userId) {
    throw new Error('Unauthorized user');
  }

  const lendRecord = await LendRepository.findActiveLendByBook(bookId);
  if (!lendRecord) {
    throw new Error('This book is not currently borrowed');
  }

  const returnDate = new Date();

  await LendRepository.markReturned(lendRecord._id, returnDate);
  await BookRepository.updateBook(bookId, {
    status: 'available',
    actualReturnDate: returnDate,
  });

  return lendRecord;
}



  async getLendHistory(userId) {
    return await LendRepository.findLendsByUser(userId);
  }
}

module.exports = new LendService();
