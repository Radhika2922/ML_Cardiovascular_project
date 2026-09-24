import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, Cpu, HeartPulse, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text-block">
          <div className="hero-badge">
            <Sparkles size={14} color="#0F9D9A" />
            <span>AI Clinical Risk Intelligence</span>
          </div>

          <h1 className="hero-title">
            Cardiovascular Disease <span className="hero-highlight">Risk Prediction</span>
          </h1>

          <p className="hero-subtitle">
            Understand your predicted cardiovascular risk using trained machine learning models. Standardized, non-invasive risk evaluation based on 62,500 clinical observations.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/assessment')}>
              Start Health Assessment <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/performance')}>
              Explore Model Performance <Activity size={18} />
            </button>
          </div>
        </div>

        <div className="hero-visual-block">
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="heart-visual-badge">
                <HeartPulse size={28} color="#DC2626" className="pulse-heart" />
              </div>
              <div className="hero-card-title-group">
                <h3>CardioPredict AI</h3>
                <span className="visual-sub">AdaBoost Classifier Pipeline</span>
              </div>
              <span className="live-status">
                <span className="status-dot"></span> Active API
              </span>
            </div>

            {/* ECG Line Graphic */}
            <div className="ecg-container">
              <svg className="ecg-svg" viewBox="0 0 500 80" preserveAspectRatio="none">
                <path
                  d="M0,40 L100,40 L110,20 L120,60 L130,10 L140,70 L150,40 L250,40 L260,25 L270,55 L280,5 L290,75 L300,40 L500,40"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-grid">
              <div className="hero-stat-box">
                <span className="stat-num">72.82%</span>
                <span className="stat-lbl">CV Accuracy</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-num">62,505</span>
                <span className="stat-lbl">Patient Records</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-num">12</span>
                <span className="stat-lbl">Clinical Features</span>
              </div>
            </div>

            <div className="hero-card-footer">
              <Cpu size={16} color="#0F9D9A" />
              <span>Real-time non-invasive probability screening</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-container {
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          padding: 3.5rem 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 20px rgba(15, 39, 71, 0.03);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #ECFEFF;
          border: 1px solid rgba(15, 157, 154, 0.25);
          color: #0F9D9A;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          margin-bottom: 1.25rem;
          letter-spacing: 0.02em;
        }

        .hero-title {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0F2747;
          line-height: 1.2;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .hero-highlight {
          color: #2563EB;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #64748B;
          line-height: 1.65;
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-visual-block {
          position: relative;
        }

        .hero-card {
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 10px 30px rgba(15, 39, 71, 0.08);
          transition: all 0.3s ease;
        }

        .hero-card:hover {
          border-color: #2563EB;
          box-shadow: 0 14px 35px rgba(37, 99, 235, 0.12);
        }

        .hero-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .heart-visual-badge {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pulse-heart {
          animation: pulse 1.8s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }

        .hero-card-title-group {
          flex: 1;
        }

        .hero-card-title-group h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .visual-sub {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 500;
        }

        .live-status {
          font-size: 0.78rem;
          font-weight: 700;
          background: #F0FDF4;
          color: #16A34A;
          border: 1px solid #BBF7D0;
          padding: 0.3rem 0.65rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #16A34A;
        }

        .ecg-container {
          background: #EFF6FF;
          border-radius: 12px;
          padding: 0.75rem 0.5rem;
          margin-bottom: 1.25rem;
          border: 1px solid #DBEAFE;
          overflow: hidden;
        }

        .ecg-svg {
          width: 100%;
          height: 50px;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .hero-stat-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 0.85rem 0.5rem;
          text-align: center;
        }

        .stat-num {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F2747;
        }

        .stat-lbl {
          font-size: 0.75rem;
          color: #64748B;
          font-weight: 600;
        }

        .hero-card-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #0F9D9A;
          font-weight: 600;
          background: #ECFEFF;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
