const BookService = require('../services/BookService');

class BookController {
  async addBook(req, res) {
    try {
      const { title, author, genre, status } = req.body;
      const book = await BookService.addBook(req.user._id, title, author, genre, status);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getBooks(req, res) {
    try {
      const books = await BookService.getUserBooks(req.user._id);
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const book = await BookService.updateBook(id, req.user._id.toString(), updateData);
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      await BookService.deleteBook(id, req.user._id.toString());
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new BookController();
