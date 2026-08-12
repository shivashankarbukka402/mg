import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password, form.phone);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="flex border rounded-t-lg overflow-hidden">
        <button onClick={() => setTab('login')} className={`flex-1 py-2.5 font-medium ${tab === 'login' ? 'bg-primary text-white' : 'bg-gray-50'}`}>Login</button>
        <button onClick={() => setTab('register')} className={`flex-1 py-2.5 font-medium ${tab === 'register' ? 'bg-primary text-white' : 'bg-gray-50'}`}>Register</button>
      </div>
      <form onSubmit={handleSubmit} className="border border-t-0 rounded-b-lg p-6 space-y-4">
        <h2 className="font-semibold text-lg">{tab === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {tab === 'register' && (
          <input
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-primary text-white py-2.5 rounded font-medium hover:bg-primary-dark">
          {tab === 'login' ? 'LOGIN' : 'REGISTER'}
        </button>
      </form>
    </div>
  );
}
