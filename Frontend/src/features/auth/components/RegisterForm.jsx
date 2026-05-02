import React from 'react';
import { Link } from 'react-router';

const RegisterForm = () => {
  return (
    <section className="w-full md:w-1/2 flex items-center justify-center pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10">
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Create Account</h1>
          <p className="text-on-surface-variant font-body-md">Join SolveX to start your journey.</p>
        </div>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Username Field */}
          <div className="space-y-2">
            <label
              className="block text-xs text-on-surface-variant uppercase tracking-widest"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative group">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary-fixed transition-colors"
                data-icon="person"
              >
                person
              </span>
              <input
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-2 pl-12 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed input-focus-glow outline-none transition-all font-body-md"
                id="username"
                name="username"
                placeholder="John Doe"
                type="text"
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="space-y-2">
            <label
              className="block text-xs text-on-surface-variant uppercase tracking-widest"
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
                name="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="space-y-2">
            <label
              className="block text-xs text-on-surface-variant uppercase tracking-widest"
              htmlFor="password"
            >
              Password
            </label>
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
                name="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          {/* Role Field */}
          <div className="space-y-2">
            <label
              className="block text-xs text-on-surface-variant uppercase tracking-widest"
              htmlFor="role"
            >
              Role
            </label>
            <div className="relative group">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary-fixed transition-colors"
                data-icon="badge"
              >
                badge
              </span>
              <select
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-2 pl-12 pr-10 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed input-focus-glow outline-none transition-all font-body-md appearance-none"
                id="role"
                name="role"
                defaultValue="isOwner"
              >
                <option value="isAdmin" className="bg-surface-container-lowest">Admin</option>
                <option value="isOwner" className="bg-surface-container-lowest">Owner</option>
                <option value="isAgent" className="bg-surface-container-lowest">Agent</option>
              </select>
              {/* Dropdown chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-outline group-focus-within:text-primary-fixed">
                <span className="material-symbols-outlined text-xl">expand_more</span>
              </div>
            </div>
          </div>
          {/* Primary Action Button */}
          <button
            className="w-full bg-primary-fixed text-on-primary-fixed py-4 rounded-lg font-label-bold text-label-bold uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all duration-200 mt-4 shadow-lg shadow-primary-fixed/10"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-on-surface-variant text-sm font-body-md">
            Already have an account?
            <Link className="text-primary-fixed font-bold hover:underline ml-1" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
