import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Analyze a wallet address.
 * @param {string} address - Ethereum address (0x...)
 */
export async function analyzeWallet(address) {
  const { data } = await api.post('/wallet/analyze', { address });
  return data.data;
}

/**
 * Get scan history for a wallet.
 * @param {string} address
 */
export async function getWalletHistory(address) {
  const { data } = await api.get(`/wallet/history/${address}`);
  return data.data;
}

/**
 * Analyze a transaction by hash.
 * @param {string} txHash
 */
export async function analyzeTransaction(txHash) {
  const { data } = await api.post('/transactions/analyze', { txHash });
  return data.data;
}

/**
 * Check a URL for phishing.
 * @param {string} url
 */
export async function checkPhishing(url) {
  const { data } = await api.post('/phishing/check', { url });
  return data.data;
}

export default api;
