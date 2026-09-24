import React from 'react';

export const SectionHeader = ({ title, subtitle, badgeText, icon }) => {
  return (
    <div className="section-header">
      {badgeText && (
        <span className="section-badge">
          {badgeText}
        </span>
      )}
      <div className="title-row">
        {icon && <span className="section-icon">{icon}</span>}
        <h2>{title}</h2>
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}

      <style>{`
        .section-header {
          margin-bottom: 2rem;
        }

        .section-badge {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F9D9A;
          background: #ECFEFF;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .section-icon {
          color: #2563EB;
          display: flex;
          align-items: center;
        }

        .section-header h2 {
          font-size: 1.85rem;
          font-weight: 800;
          color: #0F2747;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 1.05rem;
          color: #64748B;
          margin-top: 0.4rem;
        }
      `}</style>
    </div>
  );
};

export default SectionHeader;
