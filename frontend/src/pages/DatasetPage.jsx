import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import MetricCard from '../components/MetricCard';
import DatasetTable from '../components/DatasetTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Disclaimer from '../components/Disclaimer';
import { getDatasetSummary } from '../services/api';
import { Database, FileText, CheckCircle2, PieChart, Table } from 'lucide-react';

export const DatasetPage = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDatasetSummary();
        setSummaryData(data);
      } catch (err) {
        console.error('Failed to load dataset summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const totalRows = summaryData?.total_rows || 62505;
  const totalCols = summaryData?.total_columns || 14;
  const missingVal = summaryData?.missing_values || 0;
  const sampleRecords = summaryData?.sample_records || [];
  const featureStats = summaryData?.feature_stats || [
    { feature: 'age', mean: 52.91, min: 29.0, max: 64.0, std: 6.74 },
    { feature: 'height', mean: 164.41, min: 143.0, max: 186.0, std: 7.53 },
    { feature: 'weight', mean: 73.18, min: 40.0, max: 107.0, std: 12.27 },
    { feature: 'ap_hi', mean: 126.42, min: 90.0, max: 170.0, std: 14.29 },
    { feature: 'ap_lo', mean: 81.70, min: 65.0, max: 105.0, std: 7.67 },
    { feature: 'BMI', mean: 27.10, min: 14.2, max: 48.5, std: 4.35 }
  ];

  return (
    <div className="dataset-page animate-fade-in">
      <SectionHeader
        badgeText="Exploratory Data Analysis"
        title="Cardiovascular Dataset Overview"
        subtitle="Analytical summary of cardio_cleaned.csv containing 62,505 cleaned clinical observations."
      />

      {loading ? (
        <LoadingSpinner message="Loading dataset summary and records..." />
      ) : (
        <>
          {/* Metrics summary */}
          <div className="grid-4 mb-2">
            <MetricCard
              label="Total Records"
              value={totalRows.toLocaleString()}
              subtitle="Cleaned Patient Profiles"
              highlight
            />

            <MetricCard
              label="Feature Attributes"
              value={totalCols}
              subtitle="Clinical & Lifestyle Columns"
            />

            <MetricCard
              label="Missing Values"
              value={missingVal}
              subtitle="100% Complete Dataset"
            />

            <MetricCard
              label="Class Balance"
              value="50.0% / 50.0%"
              subtitle="31.2k Healthy vs 31.2k Disease"
            />
          </div>

          {/* Dataset Table Component */}
          {sampleRecords.length > 0 && <DatasetTable records={sampleRecords} />}

          {/* Feature Distribution Stats */}
          <div className="stats-table-card">
            <div className="stats-header">
              <Table size={20} color="#2563EB" />
              <h3>Numerical Feature Distribution Summary</h3>
            </div>
            <div className="table-responsive">
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Feature Name</th>
                    <th>Mean Value</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>Std Deviation</th>
                  </tr>
                </thead>
                <tbody>
                  {featureStats.map((st, idx) => (
                    <tr key={idx}>
                      <td className="font-bold">{st.feature}</td>
                      <td>{st.mean}</td>
                      <td>{st.min}</td>
                      <td>{st.max}</td>
                      <td>{st.std}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Disclaimer compact />

      <style>{`
        .dataset-page {
          padding-bottom: 2rem;
        }

        .mb-2 {
          margin-bottom: 2rem;
        }

        .stats-table-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 18px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 14px rgba(15, 39, 71, 0.03);
        }

        .stats-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .stats-header h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .clean-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .clean-table th {
          background: #F8FAFC;
          color: #0F2747;
          font-weight: 700;
          padding: 0.85rem 1rem;
          border-bottom: 1.5px solid #E2E8F0;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .clean-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
        }

        .font-bold {
          font-weight: 700;
          color: #0F2747;
        }
      `}</style>
    </div>
  );
};

export default DatasetPage;
