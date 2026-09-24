import React from 'react';
import { Loader2, HeartPulse } from 'lucide-react';

export const LoadingSpinner = ({ message = "Analyzing health information..." }) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-icon-wrapper">
        <HeartPulse size={36} color="#2563EB" className="pulse-heart-icon" />
      </div>
      <p className="loading-message">{message}</p>
      <span className="loading-sub">Evaluating physiological parameters with ML model...</span>

      <style>{`
        .loading-spinner-container {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.04);
          margin: 2rem 0;
        }

        .loading-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }

        .pulse-heart-icon {
          animation: pulseHeart 1.2s infinite ease-in-out;
        }

        @keyframes pulseHeart {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .loading-message {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0F2747;
          margin-bottom: 0.4rem;
        }

        .loading-sub {
          font-size: 0.88rem;
          color: #64748B;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
