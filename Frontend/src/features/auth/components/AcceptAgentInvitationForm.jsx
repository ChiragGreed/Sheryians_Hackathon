import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { verifyAgentInvitationToken, acceptAgentInvitation } from '../services/auth.api';
import { setCredentials } from '../store/authSlice';

const AcceptAgentInvitationForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No invitation token provided');
        setVerifying(false);
        return;
      }

      try {
        const response = await verifyAgentInvitationToken(token);
        setOrganizationName(response.data.invitation.organizationName);
        setInvitationEmail(response.data.invitation.email);
        setValidToken(true);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Invalid or expired invitation token');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleAcceptInvitation = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await acceptAgentInvitation(token, username, password);
      
      dispatch(setCredentials({ 
        user: response.data.user, 
        token: response.data.token 
      }));
      
      navigate('/chat');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to accept invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <section className="w-full flex items-center justify-center pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden bg-background min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant font-body-md">Verifying invitation...</p>
        </div>
      </section>
    );
  }

  if (!validToken) {
    return (
      <section className="w-full flex items-center justify-center pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden bg-background min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="relative z-10 text-center max-w-md">
          <h1 className="font-headline-md text-headline-md text-error mb-4">Invalid Invitation</h1>
          <p className="text-on-surface-variant font-body-md mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-body-md hover:bg-primary/90 transition"
          >
            Go Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:w-1/2 flex items-center justify-center pt-28 pb-12 px-6 lg:px-12 relative overflow-hidden bg-background min-h-screen">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-fixed/10 blur-[100px] rounded-full"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10">
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Accept Invitation</h1>
          <p className="text-on-surface-variant font-body-md">
            Join <span className="text-primary font-semibold">{organizationName}</span> as an Agent
          </p>
        </div>

        {/* Invitation Details */}
        <div className="mb-6 p-4 bg-surface-container rounded-lg border border-outline/20">
          <p className="text-sm text-on-surface-variant font-body-sm">
            Invitation sent to: <span className="text-primary font-medium">{invitationEmail}</span>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleAcceptInvitation}>
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-body-md font-body-md text-on-surface">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose your username"
              className="w-full px-4 py-3 bg-surface-container border border-outline rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-body-md font-body-md text-on-surface">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-surface-container border border-outline rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              disabled={loading}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-body-md font-body-md text-on-surface">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 bg-surface-container border border-outline rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-error text-body-sm font-body-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary rounded-lg font-body-md font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Accept Invitation & Create Account'}
          </button>
        </form>

        {/* Footer Info */}
        <p className="text-center text-on-surface-variant text-body-sm font-body-sm mt-6">
          By accepting, you agree to join <span className="text-primary font-medium">{organizationName}</span> as an Agent.
        </p>
      </div>
    </section>
  );
};

export default AcceptAgentInvitationForm;
