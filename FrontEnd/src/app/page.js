'use client';

import Link from 'next/link';
import WalletConnect from '../components/WalletConnect';

const features = [
  {
    icon: '👛',
    title: 'Wallet Risk Scan',
    description: 'Analyze any Ethereum address for scam interactions, dust attacks, and suspicious activity.',
    href: '/wallet',
    color: 'from-shield-500 to-neon-blue',
  },
  {
    icon: '🔍',
    title: 'Transaction Analyzer',
    description: 'Decode and score any on-chain transaction. Detect risky recipients and abnormal gas usage.',
    href: '/transactions',
    color: 'from-neon-purple to-shield-500',
  },
  {
    icon: '🛡️',
    title: 'Phishing Checker',
    description: 'Verify URLs against blocklists, typosquatting analysis, and domain intelligence.',
    href: '/phishing',
    color: 'from-neon-green to-shield-500',
  },
];

const stats = [
  { label: 'Risk Factors Tracked', value: '8+', icon: '📊' },
  { label: 'Blocklist Domains', value: '10+', icon: '🚫' },
  { label: 'Risk Score Range', value: '0–100', icon: '🎯' },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12 sm:py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-shield-500/30 bg-shield-500/5 text-shield-400 text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          Blockchain Security Toolkit
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
          <span className="gradient-text">Web3 Shield</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Protect your blockchain interactions with real-time wallet analysis,
          transaction decoding, and phishing detection — all scored 0 to 100.
        </p>
        <div className="flex justify-center">
          <WalletConnect />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-5 text-center">
            <p className="text-3xl mb-1">{stat.icon}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href} className="group">
            <div className="glass-card-hover p-6 h-full flex flex-col">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color}
                              flex items-center justify-center text-xl mb-4
                              group-hover:shadow-lg group-hover:shadow-shield-500/20 transition-all`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-shield-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 flex-1">
                {feature.description}
              </p>
              <div className="mt-4 text-sm text-shield-500 font-medium flex items-center gap-1">
                Open tool
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* How It Works */}
      <section className="glass-card p-8">
        <h2 className="text-xl font-bold text-white mb-6 text-center">How Risk Scoring Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Input', desc: 'Enter a wallet address, tx hash, or URL' },
            { step: '02', title: 'Analyze', desc: 'We query Etherscan & run heuristic checks' },
            { step: '03', title: 'Score', desc: 'Weighted flags produce a 0–100 risk score' },
            { step: '04', title: 'Report', desc: 'Get detailed flags & risk level instantly' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-3xl font-extrabold gradient-text mb-2">{item.step}</div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
