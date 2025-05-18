// src/hooks/useBookStats.js

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useBookStats = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in first');
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch stats');

        setStats({
          totalBooks: data.totalBooks,
          borrowedBooks: data.borrowedBooks,
          overdueBooks: data.overdueBooks,
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchStats();
  }, [navigate]);

  return stats;
};
