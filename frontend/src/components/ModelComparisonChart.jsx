import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const ModelComparisonChart = ({ models = [] }) => {
  const [metricKey, setMetricKey] = useState('test_accuracy');

  if (!models || models.length === 0) {
    return <div className="chart-empty">No performance data loaded.</div>;
  }

  const chartData = models.map((m) => ({
    name: m.model_name || m.Model,
    accuracy: m.test_accuracy || m['Test Accuracy (%)'],
    f1: m.f1_score || m['F1-Score (%)'],
    cv: m.cv_mean || m['CV Mean (%)'],
    isBest: (m.model_name || m.Model) === 'AdaBoost'
  }));

  const metricLabels = {
    test_accuracy: 'Test Accuracy (%)',
    f1: 'F1-Score (%)',
    cv: 'Cross-Validation Mean (%)'
  };

  return (
    <div className="model-chart-card">
      <div className="chart-header">
        <div>
          <h3>Algorithm Performance Benchmarks</h3>
          <p className="chart-sub">Evaluation across 8 classification algorithms trained on 62,500 records</p>
        </div>
        <div className="metric-selector">
          <button
            className={`selector-btn ${metricKey === 'test_accuracy' ? 'active' : ''}`}
            onClick={() => setMetricKey('test_accuracy')}
          >
            Test Accuracy
          </button>
          <button
            className={`selector-btn ${metricKey === 'f1' ? 'active' : ''}`}
            onClick={() => setMetricKey('f1')}
          >
            F1 Score
          </button>
          <button
            className={`selector-btn ${metricKey === 'cv' ? 'active' : ''}`}
            onClick={() => setMetricKey('cv')}
          >
            CV Mean
          </button>
        </div>
      </div>

      <div className="recharts-wrapper-container">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 65 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis domain={[50, 80]} tick={{ fill: '#475569', fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value}%`, metricLabels[metricKey]]}
              contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '10px', borderColor: '#CBD5E1', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
            />
            <Bar dataKey={metricKey === 'test_accuracy' ? 'accuracy' : metricKey} radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isBest ? '#2563EB' : '#94A3B8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend-custom">
        <span className="legend-item"><span className="legend-color legend-best"></span> AdaBoost (Best Performing Classifier - 72.61% Test Acc / 72.82% CV Acc)</span>
        <span className="legend-item"><span className="legend-color legend-baseline"></span> Comparative Classification Baseline Models</span>
      </div>

      <style>{`
        .model-chart-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 20px;
          padding: 1.75rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.03);
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chart-header h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .chart-sub {
          font-size: 0.88rem;
          color: #64748B;
          margin-top: 0.2rem;
        }

        .metric-selector {
          display: flex;
          background: #F1F5F9;
          padding: 0.25rem;
          border-radius: 10px;
          gap: 0.25rem;
        }

        .selector-btn {
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          color: #64748B;
          background: none;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .selector-btn.active {
          background: #FFFFFF;
          color: #2563EB;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .recharts-wrapper-container {
          width: 100%;
          min-height: 380px;
        }

        .chart-legend-custom {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
          font-size: 0.82rem;
          color: #475569;
          font-weight: 600;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        .legend-best {
          background-color: #2563EB;
        }

        .legend-baseline {
          background-color: #94A3B8;
        }

        .chart-empty {
          text-align: center;
          padding: 3rem;
          color: #64748B;
        }
      `}</style>
    </div>
  );
};

export default ModelComparisonChart;
