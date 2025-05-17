import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <h2 className="text-3xl font-bold mb-4">Welcome to Book Lending Tracker 📚</h2>
      <p className="mb-6">Track your personal library and lending activity with ease.</p>

      <div className="space-x-4">
        <Auth />
      </div>
    </div>
  );
}

export default Home;
