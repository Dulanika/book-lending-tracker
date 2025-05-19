const Book = require('../models/Book');

// This repository handles all database operations related to books

class BookRepository {
  async createBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

async findAllByUser(userId) {
  return await Book.find({ userId }).select('title author genre status actualReturnDate');
}

  async findById(id) {
    return await Book.findById(id);
  }

  async updateBook(id, updateData) {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteBook(id) {
    return await Book.findByIdAndDelete(id);
  }
}

module.exports = new BookRepository();
