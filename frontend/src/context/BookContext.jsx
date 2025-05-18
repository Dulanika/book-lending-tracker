// src/context/BookContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const addBook = (book) => setBooks((prev) => [...prev, book]);
  const removeBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <BookContext.Provider value={{ books, setBooks, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
