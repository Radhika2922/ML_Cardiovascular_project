import React from 'react';

export const ProbabilityChart = ({ probability = 0, isHigherRisk = false }) => {
  const prob = Math.max(0, Math.min(100, probability));
  const strokeDashoffset = 283 - (283 * prob) / 100; // 2 * PI * r = 2 * 3.14159 * 45 ≈ 283

  const strokeColor = isHigherRisk ? '#DC2626' : '#16A34A';
  const bgColor = isHigherRisk ? '#FEF2F2' : '#F0FDF4';

  return (
    <div className="prob-chart-wrapper">
      <svg className="prob-svg" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="8"
        />
        {/* Progress Arc */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="prob-chart-text">
        <span className="prob-number">{prob.toFixed(1)}%</span>
        <span className="prob-label">Risk Probability</span>
      </div>

      <style>{`
        .prob-chart-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prob-svg {
          width: 100%;
          height: 100%;
        }

        .prob-chart-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .prob-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0F2747;
          line-height: 1.1;
        }

        .prob-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-top: 0.2rem;
        }
      `}</style>
    </div>
  );
};

export default ProbabilityChart;
