const BookRepository = require('../repositories/BookRepository');

// This service handles the business logic related to books
// It interacts with the BookRepository to perform CRUD operations on books
class BookService {
  async addBook(userId, title, author, genre, status) {
    return await BookRepository.createBook({ userId, title, author, genre, status });
  }

  async getUserBooks(userId) {
    return await BookRepository.findAllByUser(userId);
  }

  async updateBook(bookId, userId, updateData) {
    const book = await BookRepository.findById(bookId);
    if (!book || book.userId.toString() !== userId) {
      throw new Error('Book not found or unauthorized');
    }
    return await BookRepository.updateBook(bookId, updateData);
  }

  async deleteBook(bookId, userId) {
    const book = await BookRepository.findById(bookId);
    if (!book || book.userId.toString() !== userId) {
      throw new Error('Book not found or unauthorized');
    }
    return await BookRepository.deleteBook(bookId);
  }
}

module.exports = new BookService();
