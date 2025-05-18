import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LendingHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async (page = 1) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/lend/history?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load history');
      setHistory(data.records);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Borrower</th>
            <th className="border px-4 py-2">Lend Date</th>
            <th className="border px-4 py-2">Expected Return ( 14 days from lend date)</th>
            <th className="border px-4 py-2">Returned</th>
            <th className="border px-4 py-2">Actual Return</th>
          </tr>
        </thead>
       <tbody>
  {history.map((record) => (
    <tr
      key={record._id}
      className={record.isOverdue ? 'bg-red-100 text-red-700' : ''}
    >
      <td className="border px-4 py-2">{record.bookId?.title || 'Deleted Book'}</td>
      <td className="border px-4 py-2">{record.borrowerName}</td>
      <td className="border px-4 py-2">{new Date(record.lendDate).toLocaleDateString()}</td>
      <td className="border px-4 py-2">{new Date(record.expectedReturnDate).toLocaleDateString()}</td>
      <td className="border px-4 py-2">{record.returned ? 'Yes' : 'No'}</td>
      <td className="border px-4 py-2">
        {record.returned ? new Date(record.actualReturnDate).toLocaleDateString() : '-'}
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LendingHistory;
