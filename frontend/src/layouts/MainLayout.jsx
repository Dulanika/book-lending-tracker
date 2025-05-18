import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');            
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">📚 Book Lending Tracker</h1>
        <nav className="flex gap-4 items-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/library">Library</Link>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-purple-100 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-2">
        © 2025 Book Lending Tracker
      </footer>
    </div>
  );
}

export default MainLayout;
