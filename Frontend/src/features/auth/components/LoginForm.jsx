import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { loginApi } from '../services/auth.api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      
      dispatch(setCredentials({ user: response.data.user }));
      
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full md:w-1/2 flex items-center justify-center pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10">
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant font-body-md">Enter your credentials to access the platform.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/50 rounded-lg text-error text-sm font-body-md text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="block font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative group">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary-fixed transition-colors"
                data-icon="mail"
              >
                mail
              </span>
              <input
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-2 pl-12 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed input-focus-glow outline-none transition-all font-body-md"
                id="email"
                placeholder="name@company.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="block font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="text-xs font-label-bold text-primary-fixed hover:text-white transition-colors"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary-fixed transition-colors"
                data-icon="lock"
              >
                lock
              </span>
              <input
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-2 pl-12 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed input-focus-glow outline-none transition-all font-body-md"
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Primary Action Button */}
          <button
            className="w-full bg-primary-fixed text-on-primary-fixed py-4 rounded-lg font-label-bold text-label-bold uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all duration-200 mt-4 shadow-lg shadow-primary-fixed/10 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-on-surface-variant text-sm font-body-md">
            New to SolveX?
            <Link className="text-primary-fixed font-bold hover:underline ml-1" to="/register">
              Sign up for an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
