import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LendBookForm from './LendBookForm';
import EditBookForm from './EditBookForm';
import { useBooks } from '../../context/BookContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showLendForm, setShowLendForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch books');
      setBooks(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openLendForm = (bookId) => {
    setSelectedBookId(bookId);
    setShowLendForm(true);
  };

  const closeLendForm = () => {
    setSelectedBookId(null);
    setShowLendForm(false);
  };

  const openEditForm = (book) => setEditingBook(book);
  const closeEditForm = () => setEditingBook(null);

  const handleDelete = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');

      toast.success('Book deleted');
      fetchBooks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReturn = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      console.log('Sending return request for:', bookId);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/lend/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to return book');

      toast.success('Book returned successfully!');
      fetchBooks(); // Refresh book status in UI
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white border border-gray-300 p-4 rounded shadow"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">
              {book.author} — {book.genre}
            </p>
            <p className="text-sm mt-1">
              Status:{' '}
              <span
                className={
                  book.status === 'borrowed'
                    ? 'text-red-600'
                    : 'text-green-600'
                }
              >
                {book.status === 'borrowed' ? 'Borrowed' : 'Available'}
              </span>
            </p>

            {book.actualReturnDate && (
              <p className="text-sm text-gray-500">
                Returned on:{' '}
                {new Date(book.actualReturnDate).toLocaleDateString()}
              </p>
            )}

            {book.status === 'borrowed' ? (
              <button
               onClick={() => handleReturn(book._id)}
                className="mt-2 mx-1 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Return
              </button>
            ) : (
              <button
                onClick={() => openLendForm(book._id)}
                className="mt-2 mx-1 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Lend
              </button>
            )}

            <button
              onClick={() => openEditForm(book)}
              className="mt-2 mx-1 px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(book._id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showLendForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <LendBookForm
            bookId={selectedBookId}
            onClose={closeLendForm}
            refreshBooks={fetchBooks}
          />
        </div>
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <EditBookForm
            book={editingBook}
            onClose={closeEditForm}
            refreshBooks={fetchBooks}
          />
        </div>
      )}
    </>
  );
};

export default BookList;
