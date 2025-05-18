import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import { toast } from 'react-toastify';

function BookForm() {
  const { addBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const newBook = { title, author, genre, status: 'available' };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add book');
      }

      // Add the book returned from backend to context state
      addBook(data);

      // Clear form fields
      setTitle('');
      setAuthor('');
      setGenre('');

      toast.success('Book added successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
}

export default BookForm;
