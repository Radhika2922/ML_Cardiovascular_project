import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowLeft, ShieldAlert, HeartPulse, Activity } from 'lucide-react';
import ProbabilityChart from './ProbabilityChart';
import Disclaimer from './Disclaimer';

export const RiskResultCard = ({ result, onReset }) => {
  const navigate = useNavigate();

  if (!result) return null;

  const isHigherRisk = result.prediction === 1 || result.risk_label === "Higher Risk";
  const probability = result.probability || (isHigherRisk ? 75.0 : 25.0);

  return (
    <div className={`risk-result-container ${isHigherRisk ? 'risk-high' : 'risk-low'}`}>
      <div className="result-header">
        <div className={`status-badge ${isHigherRisk ? 'badge-high' : 'badge-low'}`}>
          {isHigherRisk ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          <span>{result.risk_label || (isHigherRisk ? "Higher Risk" : "Lower Risk")}</span>
        </div>
        <span className="result-model-tag">AdaBoost Classifier Model</span>
      </div>

      <div className="result-main-grid">
        {/* Left: Probability Gauge */}
        <div className="gauge-column">
          <ProbabilityChart probability={probability} isHigherRisk={isHigherRisk} />
          <div className="gauge-meta">
            <span className="meta-title">Confidence Metric</span>
            <p className="meta-desc">
              {isHigherRisk
                ? `Algorithm estimates a ${probability.toFixed(1)}% risk probability of cardiovascular disease.`
                : `Algorithm estimates a ${(100 - probability).toFixed(1)}% health score (risk probability: ${probability.toFixed(1)}%).`}
            </p>
          </div>
        </div>

        {/* Right: Summary & Indicators */}
        <div className="summary-column">
          <div className="summary-box">
            <h4>Prediction Summary</h4>
            <p>{result.message || "The machine-learning model generated this result from the information provided in the assessment."}</p>
          </div>

          {result.bmi && (
            <div className="bmi-summary-tag">
              <Activity size={16} color="#2563EB" />
              <span>Calculated Body Mass Index (BMI): <strong>{result.bmi} kg/m²</strong></span>
            </div>
          )}

          {result.risk_factors && result.risk_factors.length > 0 && (
            <div className="indicators-box">
              <h4>Primary Clinical Risk Indicators Noted</h4>
              <ul className="indicators-list">
                {result.risk_factors.map((factor, idx) => (
                  <li key={idx}>
                    <span className="bullet-dot"></span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Disclaimer compact />

      <div className="result-actions">
        <button className="btn btn-secondary btn-lg" onClick={onReset || (() => navigate('/assessment'))}>
          <ArrowLeft size={18} /> Take Another Assessment
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/performance')}>
          View Model Performance
        </button>
      </div>

      <style>{`
        .risk-result-container {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 2.25rem;
          margin-top: 1.5rem;
          box-shadow: 0 10px 30px rgba(15, 39, 71, 0.08);
          border: 2px solid #E2E8F0;
        }

        .risk-result-container.risk-low {
          border-color: #16A34A;
          background: linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%);
        }

        .risk-result-container.risk-high {
          border-color: #DC2626;
          background: linear-gradient(180deg, #FFFFFF 0%, #FEF2F2 100%);
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.35rem;
          font-weight: 800;
          padding: 0.6rem 1.6rem;
          border-radius: 50px;
          color: #FFFFFF;
        }

        .badge-low {
          background-color: #16A34A;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.3);
        }

        .badge-high {
          background-color: #DC2626;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
        }

        .result-model-tag {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748B;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
        }

        .result-main-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 2.5rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .gauge-column {
          text-align: center;
        }

        .gauge-meta {
          margin-top: 1rem;
        }

        .meta-title {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
        }

        .meta-desc {
          font-size: 0.82rem;
          color: #1E293B;
          font-weight: 600;
          margin-top: 0.2rem;
          line-height: 1.4;
        }

        .summary-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-box {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .summary-box h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.4rem;
        }

        .summary-box p {
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.6;
        }

        .bmi-summary-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #1E40AF;
        }

        .indicators-box {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .indicators-box h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.6rem;
        }

        .indicators-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .indicators-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1E293B;
        }

        .bullet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563EB;
          flex-shrink: 0;
        }

        .result-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.75rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .result-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default RiskResultCard;
