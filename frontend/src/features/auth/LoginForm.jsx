import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

 try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
    const { userData, token } = response.data; // <-- get userData and token
    console.log('Login response:', response.data);
    login(userData, token); // <-- pass userData to login
    toast.success('Logged in successfully!');
  } catch (err) {
    console.error('Login error:', err);
    toast.error(err.response?.data?.message || 'Login failed!');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-br from-blue-900 to-purple-900 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
