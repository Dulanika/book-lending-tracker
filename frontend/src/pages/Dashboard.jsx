// src/pages/Dashboard.jsx

import StatCard from '../components/StatCard';
import LendingHistory from '../features/books/LendingHistory';
import { useBookStats } from '../hooks/useBookStats';

const Dashboard = () => {
  const stats = useBookStats();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Books" value={stats.totalBooks} color="blue" />
        <StatCard title="Borrowed Books" value={stats.borrowedBooks} color="yellow" />
        <StatCard title="Overdue Books" value={stats.overdueBooks} color="red" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-6 mb-4">Lending History</h2>
        <div className="bg-white shadow rounded-lg p-4">
        <LendingHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
