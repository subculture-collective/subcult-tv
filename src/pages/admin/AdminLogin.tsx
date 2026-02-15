import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Terminal header */}
        <div className="bg-soot border border-fog">
          <div className="flex items-center gap-2 px-3 py-2 bg-ash border-b border-fog">
            <span className="w-2.5 h-2.5 rounded-full bg-signal" />
            <span className="w-2.5 h-2.5 rounded-full bg-flicker" />
            <span className="w-2.5 h-2.5 rounded-full bg-static" />
            <span className="flex-1 text-center font-mono text-xs text-dust">
              subcvlt://auth
            </span>
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display text-signal tracking-widest mb-2">
                SUBCVLT
              </h1>
              <p className="font-mono text-xs text-dust">
                &gt; CONTROL PANEL ACCESS
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-ash border border-signal font-mono text-xs text-signal">
                ERR: {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-dust uppercase mb-1">
                  &gt; IDENT
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal focus:outline-none transition-colors"
                  placeholder="username"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-dust uppercase mb-1">
                  &gt; PASSKEY
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-void border border-fog text-chalk font-mono text-sm px-3 py-2 focus:border-signal focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-signal text-void font-mono text-sm font-bold tracking-wider
                           hover:bg-signal-dim transition-colors cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </button>
            </form>

            {/* Bottom text */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="font-mono text-xs text-dust hover:text-bone transition-colors"
              >
                ← return to subcult.tv
              </a>
            </div>
          </div>
        </div>

        {/* Footer blink */}
        <div className="mt-4 text-center font-mono text-xs text-fog">
          <span className="cursor-blink">&gt; awaiting input</span>
        </div>
      </div>
    </div>
  );
}
