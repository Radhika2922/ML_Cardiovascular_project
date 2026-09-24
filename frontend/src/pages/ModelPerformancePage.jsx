import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import MetricCard from '../components/MetricCard';
import ModelComparisonChart from '../components/ModelComparisonChart';
import Disclaimer from '../components/Disclaimer';
import LoadingSpinner from '../components/LoadingSpinner';
import { getModelPerformance } from '../services/api';
import { Award, BarChart3, CheckCircle2, Cpu, Zap } from 'lucide-react';

export const ModelPerformancePage = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await getModelPerformance();
        setPerformanceData(data);
      } catch (err) {
        console.error('Failed to load performance metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, []);

  const modelsList = performanceData?.models || [
    { model_name: 'Logistic Regression', test_accuracy: 72.12, precision: 72.04, recall: 70.52, f1_score: 71.27, cv_mean: 72.28, cv_std: 0.35, status: 'Linear Baseline' },
    { model_name: 'Decision Tree', test_accuracy: 62.80, precision: 62.51, recall: 63.04, f1_score: 62.77, cv_mean: 72.63, cv_std: 0.45, status: 'Untuned Baseline' },
    { model_name: 'KNN', test_accuracy: 63.22, precision: 63.02, recall: 63.51, f1_score: 63.26, cv_mean: 68.74, cv_std: 0.52, status: 'Distance Classifier' },
    { model_name: 'Gaussian Naive Bayes', test_accuracy: 71.08, precision: 72.54, recall: 67.21, f1_score: 69.77, cv_mean: 70.91, cv_std: 0.48, status: 'Probabilistic' },
    { model_name: 'Tuned Decision Tree', test_accuracy: 72.18, precision: 72.26, recall: 70.04, f1_score: 71.13, cv_mean: 72.75, cv_std: 0.38, status: 'GridSearch Optimized' },
    { model_name: 'Bagging Classifier', test_accuracy: 70.79, precision: 71.02, recall: 70.18, f1_score: 70.60, cv_mean: 71.05, cv_std: 0.42, status: 'Bootstrap Ensemble' },
    { model_name: 'Random Forest', test_accuracy: 71.64, precision: 72.10, recall: 70.40, f1_score: 71.24, cv_mean: 72.40, cv_std: 0.39, status: 'Parallel Trees' },
    { model_name: 'AdaBoost', test_accuracy: 72.61, precision: 73.05, recall: 71.20, f1_score: 72.11, cv_mean: 72.82, cv_std: 0.34, status: '🏆 Best Performing' }
  ];

  const bestModel = modelsList.find((m) => m.model_name === 'AdaBoost') || modelsList[modelsList.length - 1];

  return (
    <div className="performance-page animate-fade-in">
      <SectionHeader
        badgeText="Model Evaluation Analytics"
        title="Model Performance Dashboard"
        subtitle="Benchmark evaluation comparing 8 machine-learning classification algorithms trained on 62,500 patient records."
      />

      {loading ? (
        <LoadingSpinner message="Fetching model benchmark performance metrics..." />
      ) : (
        <>
          {/* Top Metric Cards for Best Model */}
          <div className="grid-4 mb-2">
            <MetricCard
              label="Test Accuracy"
              value={`${bestModel.test_accuracy}%`}
              subtitle="Holdout Test Set"
              highlight
              badge="AdaBoost Classifier"
            />

            <MetricCard
              label="Precision"
              value={`${bestModel.precision}%`}
              subtitle="Positive Predictive Value"
            />

            <MetricCard
              label="Recall / Sensitivity"
              value={`${bestModel.recall}%`}
              subtitle="True Positive Rate"
            />

            <MetricCard
              label="F1 Score"
              value={`${bestModel.f1_score}%`}
              subtitle="Harmonic Mean Score"
            />
          </div>

          {/* Recharts Model Comparison Chart */}
          <ModelComparisonChart models={modelsList} />

          {/* Detailed Performance Table */}
          <div className="benchmark-table-card">
            <div className="card-header-flex">
              <div>
                <h3>Detailed Algorithm Benchmark Breakdown</h3>
                <p className="sub-text">Comparative evaluation metrics for all 8 trained classification algorithms</p>
              </div>
              <span className="best-badge"><Award size={16} /> Best Model: AdaBoost</span>
            </div>

            <div className="table-wrapper">
              <table className="perf-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Test Accuracy</th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1 Score</th>
                    <th>CV Mean</th>
                    <th>CV Std</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {modelsList.map((m, idx) => {
                    const isAda = m.model_name === 'AdaBoost';
                    return (
                      <tr key={idx} className={isAda ? 'highlight-row' : ''}>
                        <td className="font-bold">
                          {m.model_name} {isAda && '🏆'}
                        </td>
                        <td>{m.test_accuracy}%</td>
                        <td>{m.precision}%</td>
                        <td>{m.recall}%</td>
                        <td>{m.f1_score}%</td>
                        <td>{m.cv_mean}%</td>
                        <td>±{m.cv_std}%</td>
                        <td>
                          <span className={`status-pill ${isAda ? 'status-best' : ''}`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Disclaimer compact />

      <style>{`
        .performance-page {
          padding-bottom: 2rem;
        }

        .mb-2 {
          margin-bottom: 2rem;
        }

        .benchmark-table-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 20px;
          padding: 1.75rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.03);
        }

        .card-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .card-header-flex h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .sub-text {
          font-size: 0.88rem;
          color: #64748B;
        }

        .best-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #EFF6FF;
          color: #2563EB;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.4rem 0.85rem;
          border-radius: 50px;
          border: 1px solid #BFDBFE;
        }

        .table-wrapper {
          overflow-x: auto;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        .perf-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          text-align: left;
        }

        .perf-table th {
          background-color: #F8FAFC;
          color: #0F2747;
          font-weight: 700;
          padding: 0.85rem 1rem;
          border-bottom: 1.5px solid #E2E8F0;
          font-size: 0.78rem;
          text-transform: uppercase;
        }

        .perf-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
        }

        .perf-table tr.highlight-row {
          background-color: #EFF6FF;
          font-weight: 700;
        }

        .font-bold {
          font-weight: 700;
          color: #0F2747;
        }

        .status-pill {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          background: #F1F5F9;
          color: #475569;
        }

        .status-best {
          background: #2563EB;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};

export default ModelPerformancePage;
