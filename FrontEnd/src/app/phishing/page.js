'use client';

import { useState } from 'react';
import { checkPhishing } from '../../lib/api';
import PhishingResult from '../../components/PhishingResult';

export default function PhishingPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL to check.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await checkPhishing(url.trim());
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Check failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">🛡️ Phishing URL Checker</h1>
      <p className="text-gray-400 mb-8">
        Paste any suspicious URL to check it against known phishing databases, typosquatting patterns, and domain intelligence.
      </p>

      {/* Input */}
      <div className="glass-card p-6 mb-8">
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://suspicious-site.com/..."
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-danger whitespace-nowrap disabled:opacity-50"
          >
            {loading ? '⏳ Checking...' : '🛡️ Check URL'}
          </button>
        </form>
        {error && <p className="text-neon-red text-sm mt-3 animate-fade-in">{error}</p>}
      </div>

      {/* Result */}
      {result && (
        <div className="animate-slide-up">
          <PhishingResult data={result} />
        </div>
      )}

      {/* Example URLs to try */}
      {!result && !loading && (
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Example suspicious URLs to try
          </h3>
          <div className="space-y-2">
            {[
              'https://metam4sk-login.com/connect',
              'https://uniswap-airdrop.com/claim',
              'https://free-eth-giveaway.com',
              'https://opensea-verify.com/wallet',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="block w-full text-left px-4 py-2.5 rounded-lg bg-dark-800/50 text-sm font-mono
                           text-gray-400 hover:text-white hover:bg-dark-600 transition-all"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
