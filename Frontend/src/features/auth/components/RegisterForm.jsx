import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { register } from '../services/auth.api';
import { setCredentials } from '../store/authSlice';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await register(username, email, password, organizationName);
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes rf-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rf-pulseDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.35); }
        }
        @keyframes rf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes rf-shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }

        .rf-fade { opacity: 0; animation: rf-fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) forwards; }
        .rf-d1 { animation-delay: 0.06s; }
        .rf-d2 { animation-delay: 0.12s; }
        .rf-d3 { animation-delay: 0.18s; }
        .rf-d4 { animation-delay: 0.24s; }
        .rf-d5 { animation-delay: 0.30s; }
        .rf-d6 { animation-delay: 0.36s; }
        .rf-d7 { animation-delay: 0.42s; }
        .rf-d8 { animation-delay: 0.48s; }

        .rf-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background-color: #07100c;
          background-image: radial-gradient(circle, rgba(0,230,118,0.07) 1px, transparent 1px);
          background-size: 26px 26px;
          position: relative;
          overflow: hidden;
        }

        .rf-ambient {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,230,118,0.055) 0%, transparent 65%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .rf-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.032);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 40px 38px 32px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 0 0 1px rgba(0,230,118,0.06),
            0 36px 72px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.055);
        }
        .rf-card::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 18px; height: 18px;
          border-top: 1px solid rgba(0,230,118,0.45);
          border-left: 1px solid rgba(0,230,118,0.45);
          border-radius: 14px 0 0 0;
        }
        .rf-card::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 18px; height: 18px;
          border-bottom: 1px solid rgba(0,230,118,0.45);
          border-right: 1px solid rgba(0,230,118,0.45);
          border-radius: 0 0 14px 0;
        }

        .rf-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(0,230,118,0.65);
          margin-bottom: 14px;
        }
        .rf-headline {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: rgba(255,255,255,0.92);
          margin-bottom: 7px;
        }
        .rf-sub {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          line-height: 1.55;
          margin-bottom: 28px;
        }

        /* Two-column grid for fields */
        .rf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 20px;
        }
        .rf-full { grid-column: 1 / -1; }

        .rf-label {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 8px;
        }

        .rf-field {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 22px;
        }
        .rf-field::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 100%; height: 1px;
          background: #00e676;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.32s cubic-bezier(.22,.68,0,1.2);
        }
        .rf-field:focus-within::after { transform: scaleX(1); }
        .rf-field:focus-within { border-color: transparent; }
        .rf-field:focus-within .rf-icon { color: rgba(0,230,118,0.6); }

        .rf-icon {
          font-size: 15px !important;
          color: rgba(255,255,255,0.18);
          flex-shrink: 0;
          transition: color 0.25s;
          user-select: none;
        }
        .rf-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.88);
          caret-color: #00e676;
          min-width: 0;
        }
        .rf-input::placeholder { color: rgba(255,255,255,0.17); }

        .rf-toggle {
          background: none; border: none; cursor: pointer; padding: 0;
          color: rgba(255,255,255,0.18); display: flex; align-items: center;
          transition: color 0.2s; flex-shrink: 0;
        }
        .rf-toggle:hover { color: rgba(0,230,118,0.6); }

        .rf-error {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; margin-bottom: 20px;
          border: 1px solid rgba(210,70,70,0.28);
          border-radius: 6px;
          background: rgba(210,70,70,0.06);
          color: #d24646;
          font-family: 'Courier New', monospace;
          font-size: 0.68rem; letter-spacing: 0.03em;
        }

        .rf-btn {
          position: relative; overflow: hidden;
          width: 100%;
          background: #00e676; color: #050a07;
          border: none; border-radius: 7px;
          padding: 13px 0;
          font-family: 'Courier New', monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; margin-top: 4px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .rf-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
          background-size: 200% 100%;
          background-position: -200% center;
        }
        .rf-btn:hover::after { animation: rf-shimmer 0.55s ease forwards; }
        .rf-btn:hover { opacity: 0.91; }
        .rf-btn:active { transform: scale(0.989); }
        .rf-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .rf-spinner {
          display: inline-block;
          width: 11px; height: 11px;
          border: 1.5px solid rgba(5,10,7,0.25);
          border-top-color: #050a07;
          border-radius: 50%;
          animation: rf-spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        .rf-footer {
          margin-top: 22px; padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 0.62rem; letter-spacing: 0.07em;
          color: rgba(255,255,255,0.22);
        }
        .rf-footer a { color: #00e676; text-decoration: none; transition: opacity 0.2s; }
        .rf-footer a:hover { opacity: 0.72; }

        .rf-status {
          position: absolute; top: 26px; right: 28px; z-index: 20;
          display: flex; align-items: center; gap: 7px;
        }
        .rf-pip {
          width: 6px; height: 6px; border-radius: 50%; background: #00e676;
          animation: rf-pulseDot 2.4s ease-in-out infinite;
        }
        .rf-pip-txt {
          font-family: 'Courier New', monospace;
          font-size: 0.57rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.18);
        }
        .rf-version {
          position: absolute; bottom: 22px; left: 28px; z-index: 20;
          font-family: 'Courier New', monospace;
          font-size: 0.54rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.1);
        }
      `}</style>

      <div className="rf-page">
        <div className="rf-ambient" />

        <div className="rf-status rf-fade rf-d1">
          <span className="rf-pip" />
          <span className="rf-pip-txt">Secure</span>
        </div>
        <div className="rf-version rf-fade rf-d1">SXP v2.4.1</div>

        <div className="rf-card">
          <p className="rf-eyebrow rf-fade rf-d1">// SolveX Platform</p>
          <h1 className="rf-headline rf-fade rf-d2">Create Account.</h1>
          <p className="rf-sub rf-fade rf-d2">Join SolveX to start your journey.</p>

          {error && (
            <div className="rf-error">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error_outline</span>
              {error}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit}>
            <div className="rf-grid">

              {/* Username */}
              <div className="rf-fade rf-d3">
                <label className="rf-label" htmlFor="username">Username</label>
                <div className="rf-field">
                  <span className="material-symbols-outlined rf-icon">person</span>
                  <input
                    className="rf-input"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Organization */}
              <div className="rf-fade rf-d4">
                <label className="rf-label" htmlFor="organizationName">Organization</label>
                <div className="rf-field">
                  <span className="material-symbols-outlined rf-icon">domain</span>
                  <input
                    className="rf-input"
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    placeholder="Acme Corp"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email — full width */}
              <div className="rf-full rf-fade rf-d5">
                <label className="rf-label" htmlFor="email">Email Address</label>
                <div className="rf-field">
                  <span className="material-symbols-outlined rf-icon">mail</span>
                  <input
                    className="rf-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password — full width */}
              <div className="rf-full rf-fade rf-d6">
                <label className="rf-label" htmlFor="password">Password</label>
                <div className="rf-field">
                  <span className="material-symbols-outlined rf-icon">lock</span>
                  <input
                    className="rf-input"
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rf-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Submit */}
            <div className="rf-fade rf-d7">
              <button className="rf-btn" type="submit" disabled={loading}>
                {loading
                  ? <><span className="rf-spinner" />Creating Account…</>
                  : 'Create Account →'
                }
              </button>
            </div>

          </form>

          <div className="rf-footer rf-fade rf-d8">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;