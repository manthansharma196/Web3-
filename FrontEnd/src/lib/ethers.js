import { BrowserProvider } from 'ethers';

/**
 * Connect to Core Wallet and return the signer + address.
 * @returns {{ provider, signer, address }}
 */
export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Core Wallet is not installed. Please install the Core browser extension.');
  }

  // Request account access
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = accounts[0];

  return { provider, signer, address };
}

/**
 * Get the currently connected address (if any).
 * @returns {string|null}
 */
export async function getConnectedAddress() {
  if (typeof window === 'undefined' || !window.ethereum) return null;

  const accounts = await window.ethereum.request({
    method: 'eth_accounts',
  });

  return accounts.length > 0 ? accounts[0] : null;
}

/**
 * Listen for account changes.
 * @param {Function} callback
 */
export function onAccountChange(callback) {
  if (typeof window === 'undefined' || !window.ethereum) return;
  window.ethereum.on('accountsChanged', (accounts) => {
    callback(accounts[0] || null);
  });
}
