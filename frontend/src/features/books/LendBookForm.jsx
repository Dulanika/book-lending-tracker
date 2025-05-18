// src/components/LendBookForm.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';

const LendBookForm = ({ bookId, onClose, refreshBooks }) => {
  const [borrower, setBorrower] = useState('');
  const [lendDate, setLendDate] = useState('');
  // const [expectedReturnDate, setExpectedReturnDate] = useState('');


  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lend/${bookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId,
        borrowerName: borrower,
        lendDate,
        // expectedReturnDate: expectedReturnDate,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to lend book');

    toast.success('Book lent successfully!');
    refreshBooks();
    onClose();
  } catch (err) {
    toast.error(err.message);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Lend this Book</h2>

      <input
        type="text"
        placeholder="Borrower's Name"
        value={borrower}
        onChange={(e) => setBorrower(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <label>Lend Date</label>
      <input
        type="date"
        value={lendDate}
        onChange={(e) => setLendDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* <label>Return Date</label>
      <input
        type="date"
        value={expectedReturnDate}
        onChange={(e) => setExpectedReturnDate(e.target.value)}
        className="w-full border p-2 rounded"
      /> */}

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Lend</button>
      </div>
    </form>
  );
};

export default LendBookForm;
