import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Database, Search } from 'lucide-react';

export const DatasetTable = ({ records = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  if (!records || records.length === 0) {
    return <div className="table-empty">No dataset records loaded.</div>;
  }

  const totalPages = Math.ceil(records.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentRecords = records.slice(startIndex, startIndex + pageSize);

  const columns = Object.keys(records[0] || {});

  return (
    <div className="dataset-table-card">
      <div className="table-header">
        <div className="header-left">
          <Database size={20} color="#2563EB" />
          <h3>Dataset Record Preview</h3>
        </div>
        <span className="record-count-badge">Showing {records.length} records</span>
      </div>

      <div className="table-responsive">
        <table className="clean-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => {
                  let val = row[col];
                  if (typeof val === 'number') {
                    val = Number.isInteger(val) ? val : val.toFixed(2);
                  }
                  return (
                    <td key={col}>
                      {col === 'cardio' ? (
                        <span className={`cardio-pill ${val === 1 ? 'pill-high' : 'pill-low'}`}>
                          {val === 1 ? 'Disease (1)' : 'Normal (0)'}
                        </span>
                      ) : (
                        val
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <div className="pagination-buttons">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .dataset-table-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 18px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 14px rgba(15, 39, 71, 0.03);
        }

        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .header-left h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .record-count-badge {
          font-size: 0.8rem;
          font-weight: 700;
          background: #EFF6FF;
          color: #2563EB;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
        }

        .table-responsive {
          overflow-x: auto;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        .clean-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }

        .clean-table th {
          background-color: #F8FAFC;
          color: #0F2747;
          font-weight: 700;
          padding: 0.85rem 1rem;
          border-bottom: 1.5px solid #E2E8F0;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .clean-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
          font-weight: 500;
        }

        .clean-table tr:last-child td {
          border-bottom: none;
        }

        .clean-table tr:hover {
          background-color: #F8FAFC;
        }

        .cardio-pill {
          display: inline-block;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
        }

        .pill-low {
          background: #F0FDF4;
          color: #16A34A;
        }

        .pill-high {
          background: #FEF2F2;
          color: #DC2626;
        }

        .table-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid #F1F5F9;
        }

        .page-info {
          font-size: 0.85rem;
          color: #64748B;
          font-weight: 600;
        }

        .pagination-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .page-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #0F2747;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-btn:hover:not(:disabled) {
          border-color: #2563EB;
          color: #2563EB;
          background: #EFF6FF;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .table-empty {
          text-align: center;
          padding: 2rem;
          color: #64748B;
        }
      `}</style>
    </div>
  );
};

export default DatasetTable;
