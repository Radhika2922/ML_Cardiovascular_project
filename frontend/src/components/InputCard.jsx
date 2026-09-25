import React from 'react';

export const InputCard = ({ title, icon, description, children, badge, stepNumber }) => {
  return (
    <div className="input-card">
      <div className="input-card-header">
        <div className="input-card-title-group">
          {icon && <span className="input-card-icon">{icon}</span>}
          <div>
            <div className="input-card-title-row">
              {stepNumber && <span className="step-pill-tag">Step {stepNumber}</span>}
              <h3>{title}</h3>
            </div>
            {description && <p className="input-card-desc">{description}</p>}
          </div>
        </div>
        {badge && <span className="input-card-badge">{badge}</span>}
      </div>
      <div className="input-card-body">
        {children}
      </div>

      <style>{`
        .input-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 18px;
          padding: 1.75rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.03);
          transition: all 0.25s ease;
        }

        .input-card:hover {
          border-color: #CBD5E1;
          box-shadow: 0 6px 20px rgba(15, 39, 71, 0.06);
        }

        .input-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #F1F5F9;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .input-card-title-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .input-card-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .step-pill-tag {
          font-size: 0.72rem;
          font-weight: 800;
          background: #EFF6FF;
          color: #2563EB;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .input-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          color: #2563EB;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
        }

        .input-card-title-group h3 {
          font-size: 1.18rem;
          font-weight: 700;
          color: #0F2747;
          margin: 0;
        }

        .input-card-desc {
          font-size: 0.84rem;
          color: #64748B;
          margin-top: 0.15rem;
        }

        .input-card-badge {
          font-size: 0.78rem;
          font-weight: 700;
          background: #F1F5F9;
          color: #475569;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }

        .input-card-body {
          display: grid;
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .input-card {
            padding: 1.25rem 1rem;
            border-radius: 14px;
          }
          .input-card-icon {
            width: 38px;
            height: 38px;
          }
          .input-card-title-group h3 {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InputCard;

