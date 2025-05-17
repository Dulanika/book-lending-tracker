import React from 'react';
import BookForm from '../features/books/BookForm';
import BookList from '../features/books/BookList';

function Library() {
  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold">My Library</h2>
      <BookForm />
      <BookList />
    </div>
  );
}

export default Library;
