// src/features/books/EditBookForm.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditBookForm = ({ book, onClose, refreshBooks }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [status, setStatus] = useState(book.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, genre, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update book');

      toast.success('Book updated!');
      refreshBooks();
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-md w-full">
      <h2 className="text-lg font-semibold mb-2">Edit Book</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="available">Available</option>
        <option value="borrowed">Borrowed</option>
      </select>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
