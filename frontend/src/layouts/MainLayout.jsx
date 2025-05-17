import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">📚 Book Lending Tracker</h1>
        <nav className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/library">Library</Link>
          <Link to="/">Home</Link>
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
