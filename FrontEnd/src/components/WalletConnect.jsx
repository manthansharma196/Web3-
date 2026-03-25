'use client';

import { useState, useEffect } from 'react';
import { connectWallet, getConnectedAddress, onAccountChange } from '../lib/ethers';

export default function WalletConnect({ onConnect }) {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already connected
    getConnectedAddress().then((addr) => {
      if (addr) {
        setAddress(addr);
        onConnect?.(addr);
      }
    });

    // Listen for account changes
    onAccountChange((newAddr) => {
      setAddress(newAddr);
      onConnect?.(newAddr);
    });
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    setError('');
    try {
      const { address: addr } = await connectWallet();
      setAddress(addr);
      onConnect?.(addr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const truncateAddress = (addr) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (address) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-xl">
        <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
        <span className="text-sm font-mono text-gray-300">
          {truncateAddress(address)}
        </span>
        <button
          onClick={() => {
            setAddress(null);
            onConnect?.(null);
          }}
          className="text-xs text-gray-500 hover:text-neon-red transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={loading}
        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Connecting...
          </>
        ) : (
          <>
            <span>❄️</span>
            Connect Core Wallet
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-neon-red animate-fade-in">{error}</p>
      )}
    </div>
  );
}
