'use client';

export default function TransactionCard({ data }) {
  if (!data) return null;

  const { txHash, riskScore, riskLevel, flags, decoded } = data;

  const riskClass = {
    LOW: 'risk-low',
    MEDIUM: 'risk-medium',
    HIGH: 'risk-high',
    CRITICAL: 'risk-critical',
  }[riskLevel] || 'risk-low';

  const truncate = (str) =>
    str && str.length > 16 ? `${str.slice(0, 8)}...${str.slice(-6)}` : str;

  return (
    <div className="glass-card-hover p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-gray-400">
          TX: {truncate(txHash)}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${riskClass}`}>
          {riskLevel} — {riskScore}/100
        </span>
      </div>

      {/* Decoded Details */}
      {decoded && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="text-sm font-mono text-gray-300">{truncate(decoded.from)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">To</p>
            <p className="text-sm font-mono text-gray-300">{truncate(decoded.to)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Value</p>
            <p className="text-sm font-semibold text-white">{decoded.value}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Method</p>
            <p className="text-sm font-mono text-shield-400">{decoded.method}</p>
          </div>
        </div>
      )}

      {/* Flags */}
      {flags && flags.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Flags</p>
          {flags.map((flag, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-gray-300 bg-dark-800/50 px-3 py-2 rounded-lg"
            >
              <span className="text-neon-red mt-0.5">⚠</span>
              {flag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
