import React from 'react';

export const MetricCard = ({ label, value, subtitle, icon, highlight = false, badge }) => {
  return (
    <div className={`metric-card-container ${highlight ? 'highlight' : ''}`}>
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {icon && <span className="metric-icon">{icon}</span>}
      </div>
      <div className="metric-value">{value}</div>
      {subtitle && <div className="metric-subtitle">{subtitle}</div>}
      {badge && <span className="metric-badge">{badge}</span>}

      <style>{`
        .metric-card-container {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(15, 39, 71, 0.03);
          transition: all 0.25s ease;
          position: relative;
        }

        .metric-card-container:hover {
          border-color: #2563EB;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.08);
          transform: translateY(-2px);
        }

        .metric-card-container.highlight {
          border-color: #2563EB;
          background: linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 100%);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .metric-icon {
          color: #2563EB;
        }

        .metric-value {
          font-size: 2.1rem;
          font-weight: 800;
          color: #0F2747;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .metric-subtitle {
          font-size: 0.82rem;
          color: #64748B;
          font-weight: 500;
        }

        .metric-badge {
          display: inline-block;
          margin-top: 0.6rem;
          font-size: 0.72rem;
          font-weight: 700;
          background: #ECFEFF;
          color: #0F9D9A;
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
        }
      `}</style>
    </div>
  );
};

export default MetricCard;
