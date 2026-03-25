'use client';

export default function PhishingResult({ data }) {
  if (!data) return null;

  const { url, riskScore, riskLevel, isPhishing, flags } = data;

  const riskClass = {
    LOW: 'risk-low',
    MEDIUM: 'risk-medium',
    HIGH: 'risk-high',
    CRITICAL: 'risk-critical',
  }[riskLevel] || 'risk-low';

  return (
    <div className="glass-card-hover p-6 animate-slide-up">
      {/* Status Banner */}
      <div className={`flex items-center gap-3 mb-5 p-4 rounded-xl border ${
        isPhishing
          ? 'bg-neon-red/5 border-neon-red/30'
          : 'bg-neon-green/5 border-neon-green/30'
      }`}>
        <span className="text-2xl">{isPhishing ? '🚨' : '✅'}</span>
        <div>
          <p className={`font-bold ${isPhishing ? 'text-neon-red' : 'text-neon-green'}`}>
            {isPhishing ? 'PHISHING DETECTED' : 'URL APPEARS SAFE'}
          </p>
          <p className="text-xs text-gray-400 font-mono mt-1 break-all">{url}</p>
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">Threat Score</span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${riskClass}`}>
          {riskLevel} — {riskScore}/100
        </span>
      </div>

      {/* Risk Bar */}
      <div className="w-full h-2 bg-dark-800 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${riskScore}%`,
            background: riskScore >= 75
              ? 'linear-gradient(90deg, #ff3366, #ff0033)'
              : riskScore >= 50
                ? 'linear-gradient(90deg, #ff8800, #ff3366)'
                : riskScore >= 25
                  ? 'linear-gradient(90deg, #ffcc00, #ff8800)'
                  : 'linear-gradient(90deg, #00ff88, #00d4ff)',
          }}
        />
      </div>

      {/* Flags */}
      {flags && flags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Threat Indicators</p>
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
