import { create } from 'zustand'; 

const useBookStore = create((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (id) => set((state) => ({ books: state.books.filter(b => b.id !== id) })),
}));

export default useBookStore;