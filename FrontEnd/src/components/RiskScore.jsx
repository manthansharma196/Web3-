'use client';

export default function RiskScore({ score = 0, level = 'LOW', size = 'lg' }) {
  const circumference = 2 * Math.PI * 50; // radius = 50
  const offset = circumference - (score / 100) * circumference;

  const colors = {
    LOW: { stroke: '#00ff88', glow: 'rgba(0, 255, 136, 0.2)' },
    MEDIUM: { stroke: '#ff8800', glow: 'rgba(255, 136, 0, 0.2)' },
    HIGH: { stroke: '#ff3366', glow: 'rgba(255, 51, 102, 0.2)' },
    CRITICAL: { stroke: '#ff0033', glow: 'rgba(255, 0, 51, 0.3)' },
  };

  const color = colors[level] || colors.LOW;
  const dimension = size === 'lg' ? 'w-36 h-36' : 'w-24 h-24';
  const fontSize = size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <div className={`score-ring ${dimension} relative`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx="60" cy="60" r="50"
          stroke="#2e2e3c"
          strokeWidth="6"
          fill="none"
        />
        {/* Score ring */}
        <circle
          cx="60" cy="60" r="50"
          stroke={color.stroke}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 6px ${color.glow})`,
            transition: 'stroke-dashoffset 1.2s ease-out',
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSize} font-bold`} style={{ color: color.stroke }}>
          {score}
        </span>
        <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
          {level}
        </span>
      </div>
    </div>
  );
}
