// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Add loading flag
    const navigate = useNavigate();

  // Load user & token from localStorage
  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      const storedUser = userString ? JSON.parse(userString) : null;
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (err) {
      console.error('Failed to parse localStorage:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false); // ✅ Done loading
    }
  }, []);

const login = (userData, authToken) => {
  // If userData is an array: [id, email, name]
  const [id, email, name] = userData;
  const userObj = { id, email, name };

  setUser(userObj);
  setToken(authToken);
  localStorage.setItem('user', JSON.stringify(userObj)); // Store as object
  localStorage.setItem('token', authToken);
  navigate('/dashboard');
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
