'use client';

import { useState } from 'react';
import { analyzeTransaction } from '../../lib/api';
import TransactionCard from '../../components/TransactionCard';
import RiskScore from '../../components/RiskScore';

export default function TransactionsPage() {
  const [txHash, setTxHash] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!txHash.trim()) {
      setError('Please enter a transaction hash.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeTransaction(txHash.trim());
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">🔍 Transaction Analyzer</h1>
      <p className="text-gray-400 mb-8">
        Decode any Ethereum transaction and analyze it for risk — suspicious recipients, abnormal gas, and more.
      </p>

      {/* Input */}
      <div className="glass-card p-6 mb-8">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x... transaction hash (64 hex chars)"
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap disabled:opacity-50"
          >
            {loading ? '⏳ Analyzing...' : '🔍 Analyze'}
          </button>
        </form>
        {error && <p className="text-neon-red text-sm mt-3 animate-fade-in">{error}</p>}
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-6 animate-slide-up">
          <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
            <RiskScore score={result.riskScore} level={result.riskLevel} />
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Analysis Complete</h2>
              <p className="text-sm font-mono text-gray-400 break-all">{result.txHash}</p>
            </div>
          </div>

          <TransactionCard data={result} />
        </div>
      )}

      {/* Help */}
      {!result && !loading && (
        <div className="glass-card p-6 text-center text-gray-500">
          <p className="text-4xl mb-3">🔎</p>
          <p className="text-sm">
            Enter any Ethereum transaction hash above to decode and score it.
            <br />
            The analyzer will check for risky contracts, excessive gas, and more.
          </p>
        </div>
      )}
    </div>
  );
}
