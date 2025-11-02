import React, { useState } from 'react';
import { login, register } from '../api';

function validatePassword(password) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  // Using UTF-16 length as a reasonable client-side check
  // The backend will do the final UTF-8 length validation
  if (password.length > 64) {
    return 'Password is too long (maximum 64 characters)';
  }
  return null;
}

export default function AuthForm({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!isLogin) {  // Only validate on registration
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
        // After registration, automatically log in
        await login(email, password);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form card">
      <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            className="form-input"
            placeholder={isLogin ? "Password" : "Password (6+ characters)"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </div>

        <div className="auth-switch">
          <button
            type="button"
            className="btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}