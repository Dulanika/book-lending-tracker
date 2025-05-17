// src/features/books/BookList.jsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LendBookForm from './LendBookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showLendForm, setShowLendForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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

  return (
    <>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author} — {book.genre}</p>
            <p className="text-sm mt-1">
              Status: <span className={book.status === 'borrowed' ? 'text-red-600' : 'text-green-600'}>
                {book.status}
              </span>
            </p>

            <button
              onClick={() => openLendForm(book._id)}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={book.status === 'borrowed'}
            >
              {book.status === 'borrowed' ? 'Already Lent' : 'Lend Book'}
            </button>
          </li>
        ))}
      </ul>

      {showLendForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <LendBookForm
            bookId={selectedBookId}
            onClose={closeLendForm}
            refreshBooks={fetchBooks}
          />
        </div>
      )}
    </>
  );
};

export default BookList;
