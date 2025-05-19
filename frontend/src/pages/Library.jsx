import React from 'react';
import BookForm from '../features/books/BookForm';
import BookList from '../features/books/BookList';

function Library() {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Library</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <BookForm />
        </div>

        <div className="lg:col-span-9">
          <BookList />
        </div>
      </div>
    </div>
  );
}

export default Library;
