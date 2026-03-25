'use client';

import { useState } from 'react';
import { analyzeWallet, getWalletHistory } from '../../lib/api';
import WalletConnect from '../../components/WalletConnect';
import RiskScore from '../../components/RiskScore';

export default function WalletPage() {
  const [address, setAddress] = useState('');
  const [connectedAddr, setConnectedAddr] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    const scanAddr = address || connectedAddr;
    if (!scanAddr) {
      setError('Please enter a wallet address or connect Core Wallet.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeWallet(scanAddr);
      setResult(data);

      // Fetch history too
      const histData = await getWalletHistory(scanAddr);
      setHistory(histData.scans || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (addr) => {
    setConnectedAddr(addr);
    if (addr) setAddress(addr);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">👛 Wallet Risk Scanner</h1>
      <p className="text-gray-400 mb-8">
        Analyze any Ethereum wallet for scam interactions, suspicious patterns, and risk score.
      </p>

      {/* Connect + Input */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-4">
          <WalletConnect onConnect={handleConnect} />
          <span className="text-gray-500 text-sm">or enter manually ↓</span>
        </div>

        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x... Ethereum address"
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap disabled:opacity-50"
          >
            {loading ? '⏳ Scanning...' : '🔍 Scan Wallet'}
          </button>
        </form>

        {error && <p className="text-neon-red text-sm mt-3 animate-fade-in">{error}</p>}
      </div>

      {/* Result */}
      {result && (
        <div className="glass-card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <RiskScore score={result.riskScore} level={result.riskLevel} />

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">Scan Result</h2>
              <p className="text-sm font-mono text-gray-400 mb-4 break-all">{result.address}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Balance', value: result.details?.balance },
                  { label: 'Transactions', value: result.details?.txCount },
                  { label: 'Wallet Age', value: `${result.details?.walletAgeDays}d` },
                  { label: 'Scam Hits', value: result.details?.scamInteractions },
                ].map((stat) => (
                  <div key={stat.label} className="bg-dark-800/50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Flags */}
              {result.flags?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Risk Flags</p>
                  {result.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-dark-800/50 px-3 py-2 rounded-lg">
                      <span className="text-neon-red mt-0.5">⚠</span>
                      {flag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-white mb-4">📜 Scan History</h3>
          <div className="space-y-2">
            {history.map((scan, i) => (
              <div key={i} className="flex items-center justify-between bg-dark-800/50 px-4 py-3 rounded-xl">
                <span className="text-sm text-gray-400">
                  {new Date(scan.scannedAt).toLocaleString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  scan.riskLevel === 'LOW' ? 'risk-low' :
                  scan.riskLevel === 'MEDIUM' ? 'risk-medium' :
                  scan.riskLevel === 'HIGH' ? 'risk-high' : 'risk-critical'
                }`}>
                  {scan.riskLevel} — {scan.riskScore}/100
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
