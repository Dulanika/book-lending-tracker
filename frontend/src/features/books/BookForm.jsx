import React, { useState } from 'react';
import useBookStore from '../../store/bookStore';

function BookForm() {
  const { addBook } = useBookStore();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ id: Date.now(), title, author, status: 'available' });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full"/>
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} className="border p-2 w-full"/>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  );
}

export default BookForm;
