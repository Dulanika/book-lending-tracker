const BookRepository = require('../repositories/BookRepository');
const LendRepository = require('../repositories/LendRepository');

// This service handles the business logic related to the dashboard
// It interacts with the BookRepository and LendRepository to fetch statistics
class DashboardService {
  async getDashboardStats(userId) {
    const allBooks = await BookRepository.findAllByUser(userId);
    const totalBooks = allBooks.length;

    const borrowedBooks = allBooks.filter(b => b.status === 'borrowed').length;

    const lendHistoryResult = await LendRepository.findLendsByUser(userId);
    const lendRecords = lendHistoryResult.records;

    const overdueBooks = lendRecords.filter(record => {
      return (
        !record.returned &&
        record.expectedReturnDate &&
        new Date(record.expectedReturnDate) < new Date()
      );
    }).length;

    return {
      totalBooks,
      borrowedBooks,
      overdueBooks
    };
  }
}


module.exports = new DashboardService();
