import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    // https://employe-tango-backend.onrender.com/tango/api/login
    try {
      const response = await axios.post('http://localhost:5000/tango/api/login', {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("organizationDetails", JSON.stringify(response.data));
  
      navigate('/homepage');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen font-poppins">
      <section className="flex rounded-lg overflow-hidden gap-10">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://png.pngtree.com/png-vector/20220707/ourmid/pngtree-remotely-working-at-home-employees-png-image_5784279.png"
            alt="Working from Home"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-11" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Company Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                placeholder="Enter your company email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/companycreate" className="text-indigo-600 font-medium hover:underline">
              Create a new company
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
