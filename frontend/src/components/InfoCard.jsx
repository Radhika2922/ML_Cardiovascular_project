import React from 'react';

export const InfoCard = ({ icon, title, description, badgeText, accentColor = '#2563EB' }) => {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <div className="info-icon" style={{ backgroundColor: `${accentColor}12`, color: accentColor }}>
          {icon}
        </div>
        {badgeText && <span className="info-badge" style={{ color: accentColor, backgroundColor: `${accentColor}15` }}>{badgeText}</span>}
      </div>
      <h3 className="info-title">{title}</h3>
      <p className="info-desc">{description}</p>

      <style>{`
        .info-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 4px 14px rgba(15, 39, 71, 0.03);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .info-card:hover {
          border-color: #2563EB;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.09);
          transform: translateY(-2px);
        }

        .info-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .info-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }

        .info-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .info-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F2747;
          margin-bottom: 0.6rem;
        }

        .info-desc {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default InfoCard;
