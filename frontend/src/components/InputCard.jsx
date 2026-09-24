import React from 'react';

export const InputCard = ({ title, icon, description, children, badge }) => {
  return (
    <div className="input-card">
      <div className="input-card-header">
        <div className="input-card-title-group">
          {icon && <span className="input-card-icon">{icon}</span>}
          <div>
            <h3>{title}</h3>
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
          box-shadow: 0 4px 14px rgba(15, 39, 71, 0.03);
          transition: border-color 0.2s ease;
        }

        .input-card:hover {
          border-color: #CBD5E1;
        }

        .input-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #F1F5F9;
        }

        .input-card-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .input-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #EFF6FF;
          color: #2563EB;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-card-title-group h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F2747;
          margin: 0;
        }

        .input-card-desc {
          font-size: 0.82rem;
          color: #64748B;
          margin-top: 0.15rem;
        }

        .input-card-badge {
          font-size: 0.78rem;
          font-weight: 700;
          background: #F1F5F9;
          color: #475569;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
        }

        .input-card-body {
          display: grid;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default InputCard;
