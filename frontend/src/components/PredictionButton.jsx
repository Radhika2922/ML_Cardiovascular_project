import React from 'react';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';

export const PredictionButton = ({ loading = false, disabled = false, onClick, text = "Predict Cardiovascular Risk →" }) => {
  return (
    <button
      className="btn-predict-prominent"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {loading ? (
        <>
          <Loader2 className="spinner-icon" size={22} />
          <span>Analyzing health information...</span>
        </>
      ) : (
        <>
          <Activity size={22} />
          <span>{text}</span>
          <ArrowRight size={22} />
        </>
      )}

      <style>{`
        .btn-predict-prominent {
          width: 100%;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          padding: 1.1rem 2rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
          transition: all 0.25s ease;
          letter-spacing: -0.01em;
        }

        .btn-predict-prominent:hover:not(:disabled) {
          background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
          box-shadow: 0 10px 28px rgba(37, 99, 235, 0.45);
          transform: translateY(-2px);
        }

        .btn-predict-prominent:disabled {
          background: #CBD5E1;
          color: #64748B;
          cursor: not-allowed;
          box-shadow: none;
        }

        .spinner-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default PredictionButton;
