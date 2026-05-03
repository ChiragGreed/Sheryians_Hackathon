import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { loginApi } from '../services/auth.api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes lf-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lf-pulseDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.35); }
        }
        @keyframes lf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes lf-shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }

        .lf-fade { opacity: 0; animation: lf-fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) forwards; }
        .lf-d1 { animation-delay: 0.06s; }
        .lf-d2 { animation-delay: 0.13s; }
        .lf-d3 { animation-delay: 0.20s; }
        .lf-d4 { animation-delay: 0.27s; }
        .lf-d5 { animation-delay: 0.34s; }
        .lf-d6 { animation-delay: 0.41s; }

        .lf-page {
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

        .lf-ambient {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,230,118,0.055) 0%, transparent 65%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .lf-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.032);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 44px 40px 36px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 0 0 1px rgba(0,230,118,0.06),
            0 36px 72px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.055);
        }

        /* Green corner accents on the card */
        .lf-card::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 18px; height: 18px;
          border-top: 1px solid rgba(0,230,118,0.45);
          border-left: 1px solid rgba(0,230,118,0.45);
          border-radius: 14px 0 0 0;
        }
        .lf-card::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 18px; height: 18px;
          border-bottom: 1px solid rgba(0,230,118,0.45);
          border-right: 1px solid rgba(0,230,118,0.45);
          border-radius: 0 0 14px 0;
        }

        .lf-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(0,230,118,0.65);
          margin-bottom: 14px;
        }

        .lf-headline {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: rgba(255,255,255,0.92);
          margin-bottom: 7px;
        }

        .lf-sub {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          line-height: 1.55;
          margin-bottom: 34px;
        }

        .lf-label {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 9px;
        }

        .lf-field {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 9px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 26px;
        }
        .lf-field::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 100%; height: 1px;
          background: #00e676;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.32s cubic-bezier(.22,.68,0,1.2);
        }
        .lf-field:focus-within::after { transform: scaleX(1); }
        .lf-field:focus-within { border-color: transparent; }

        .lf-icon {
          font-size: 15px !important;
          color: rgba(255,255,255,0.18);
          flex-shrink: 0;
          transition: color 0.25s;
          user-select: none;
        }
        .lf-field:focus-within .lf-icon { color: rgba(0,230,118,0.6); }

        .lf-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.88);
          caret-color: #00e676;
        }
        .lf-input::placeholder { color: rgba(255,255,255,0.17); }

        .lf-toggle {
          background: none; border: none; cursor: pointer; padding: 0;
          color: rgba(255,255,255,0.18); display: flex; align-items: center;
          transition: color 0.2s; flex-shrink: 0;
        }
        .lf-toggle:hover { color: rgba(0,230,118,0.6); }

        .lf-pw-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 9px;
        }
        .lf-forgot {
          font-family: 'Courier New', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0,230,118,0.48);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lf-forgot:hover { color: #00e676; }

        .lf-error {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; margin-bottom: 22px;
          border: 1px solid rgba(210,70,70,0.28);
          border-radius: 6px;
          background: rgba(210,70,70,0.06);
          color: #d24646;
          font-family: 'Courier New', monospace;
          font-size: 0.68rem; letter-spacing: 0.03em;
        }

        .lf-btn {
          position: relative; overflow: hidden;
          width: 100%;
          background: #00e676;
          color: #050a07;
          border: none; border-radius: 7px;
          padding: 13px 0;
          font-family: 'Courier New', monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; margin-top: 6px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .lf-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
          background-size: 200% 100%;
          background-position: -200% center;
        }
        .lf-btn:hover::after { animation: lf-shimmer 0.55s ease forwards; }
        .lf-btn:hover { opacity: 0.91; }
        .lf-btn:active { transform: scale(0.989); }
        .lf-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .lf-spinner {
          display: inline-block;
          width: 11px; height: 11px;
          border: 1.5px solid rgba(5,10,7,0.25);
          border-top-color: #050a07;
          border-radius: 50%;
          animation: lf-spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        .lf-footer {
          margin-top: 26px; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 0.62rem; letter-spacing: 0.07em;
          color: rgba(255,255,255,0.22);
        }
        .lf-footer a { color: #00e676; text-decoration: none; transition: opacity 0.2s; }
        .lf-footer a:hover { opacity: 0.72; }

        .lf-status {
          position: absolute; top: 26px; right: 28px; z-index: 20;
          display: flex; align-items: center; gap: 7px;
        }
        .lf-pip {
          width: 6px; height: 6px; border-radius: 50%; background: #00e676;
          animation: lf-pulseDot 2.4s ease-in-out infinite;
        }
        .lf-pip-txt {
          font-family: 'Courier New', monospace;
          font-size: 0.57rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.18);
        }

        .lf-version {
          position: absolute; bottom: 22px; left: 28px; z-index: 20;
          font-family: 'Courier New', monospace;
          font-size: 0.54rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.1);
        }
      `}</style>

      <div className="lf-page">
        <div className="lf-ambient" />

        <div className="lf-status lf-fade lf-d1">
          <span className="lf-pip" />
          <span className="lf-pip-txt">Secure</span>
        </div>

        <div className="lf-version lf-fade lf-d1">SXP v2.4.1</div>

        <div className="lf-card">
          <p className="lf-eyebrow lf-fade lf-d1">// SolveX Platform</p>
          <h1 className="lf-headline lf-fade lf-d2">Welcome Back.</h1>
          <p className="lf-sub lf-fade lf-d2">Sign in to continue to your workspace.</p>

          {error && (
            <div className="lf-error">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error_outline</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>

            <div className="lf-fade lf-d3">
              <label className="lf-label" htmlFor="email">Email Address</label>
              <div className="lf-field">
                <span className="material-symbols-outlined lf-icon">mail</span>
                <input
                  className="lf-input"
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="lf-fade lf-d4">
              <div className="lf-pw-row">
                <label className="lf-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
                <a href="#" className="lf-forgot">Forgot?</a>
              </div>
              <div className="lf-field">
                <span className="material-symbols-outlined lf-icon">lock</span>
                <input
                  className="lf-input"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="lf-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="lf-fade lf-d5">
              <button className="lf-btn" type="submit" disabled={loading}>
                {loading
                  ? <><span className="lf-spinner" />Authenticating…</>
                  : 'Sign In to Dashboard →'
                }
              </button>
            </div>

          </form>

          <div className="lf-footer lf-fade lf-d6">
            New to SolveX?{' '}
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;