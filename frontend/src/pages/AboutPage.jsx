import React from 'react';
import SectionHeader from '../components/SectionHeader';
import Disclaimer from '../components/Disclaimer';
import { Cpu, Layers, GitMerge, CheckCircle, Code, ShieldCheck, ArrowDown } from 'lucide-react';

export const AboutPage = () => {
  const workflowSteps = [
    { title: "Dataset Ingestion", desc: "62,505 patient records collected from clinical observation archives." },
    { title: "Data Preprocessing", desc: "Standardization of age (years), BP ranges, and missing value cleaning." },
    { title: "Outlier Handling", desc: "Removal of erroneous physiological extremes in systolic & diastolic BP." },
    { title: "Feature Preparation", desc: "Automated Body Mass Index (BMI) engineered feature calculation." },
    { title: "Classification Models", desc: "8 supervised algorithms (AdaBoost, Random Forest, Decision Tree, KNN, Naive Bayes)." },
    { title: "Model Evaluation", desc: "5-fold Stratified Cross-Validation benchmarking accuracy and F1 score." },
    { title: "Hyperparameter Tuning", desc: "GridSearch optimization tuning estimator counts and tree depths." },
    { title: "Final Model Serialization", desc: "AdaBoost model saved using Joblib serializer for FastAPI deployment." },
    { title: "Real-Time Prediction", desc: "FastAPI REST endpoint serving REST predictions to React.js frontend." }
  ];

  const techStack = [
    { name: "React.js", category: "Frontend UI", desc: "Component-driven user interface built with JavaScript ES6+" },
    { name: "Vite", category: "Build Tool", desc: "Next-generation ultra-fast frontend build system" },
    { name: "FastAPI", category: "Backend API", desc: "High-performance Python asynchronous web framework" },
    { name: "Python 3.13", category: "Language", desc: "Core backend execution environment" },
    { name: "Pandas", category: "Data Science", desc: "High-performance data manipulation and DataFrame structuring" },
    { name: "NumPy", category: "Computing", desc: "Numerical matrix mathematics and array operations" },
    { name: "Scikit-learn", category: "Machine Learning", desc: "Supervised classification algorithms, metrics, and ensembles" },
    { name: "Joblib", category: "Serialization", desc: "Efficient binary model loading and feature column persistence" },
    { name: "Recharts", category: "Data Visuals", desc: "Declarative SVG charting library for React" }
  ];

  return (
    <div className="about-page animate-fade-in">
      <SectionHeader
        badgeText="Academic System Architecture"
        title="About CardioPredict"
        subtitle="Full-stack cardiovascular disease risk prediction web application created for machine-learning coursework."
      />

      {/* Project Objective */}
      <div className="objective-card">
        <h3>Project Objective</h3>
        <p>
          Cardiovascular diseases (CVDs) remain the leading cause of global mortality. Early non-invasive screening can assist individuals and clinicians in identifying elevated physiological risk factors before severe cardiac events occur.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong>CardioPredict</strong> was engineered as an educational machine-learning web application to demonstrate how supervised classification algorithms (specifically AdaBoost Ensemble Learning) can analyze routine clinical metrics (blood pressure, serum lipid panels, blood glucose, BMI, and lifestyle habits) to estimate risk probability.
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="workflow-section">
        <div className="section-title-box">
          <Layers size={22} color="#2563EB" />
          <h3>Machine Learning Pipeline Workflow</h3>
        </div>

        <div className="workflow-pipeline">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="pipeline-step">
                <div className="step-num">{idx + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
              {idx < workflowSteps.length - 1 && (
                <div className="pipeline-arrow">
                  <ArrowDown size={18} color="#94A3B8" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      <div className="tech-section">
        <div className="section-title-box">
          <Code size={22} color="#2563EB" />
          <h3>Technologies & Frameworks</h3>
        </div>

        <div className="grid-3">
          {techStack.map((tech, idx) => (
            <div className="tech-card" key={idx}>
              <span className="tech-cat">{tech.category}</span>
              <h4 className="tech-name">{tech.name}</h4>
              <p className="tech-desc">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer />

      <style>{`
        .about-page {
          padding-bottom: 2rem;
        }

        .objective-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.03);
        }

        .objective-card h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.75rem;
        }

        .objective-card p {
          font-size: 1rem;
          color: #475569;
          line-height: 1.65;
        }

        .workflow-section, .tech-section {
          margin-bottom: 2.5rem;
        }

        .section-title-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .section-title-box h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F2747;
          margin: 0;
        }

        .workflow-pipeline {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15, 39, 71, 0.03);
        }

        .pipeline-step {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1rem 1.5rem;
          width: 100%;
          max-width: 650px;
        }

        .step-num {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #2563EB;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-content h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.2rem;
        }

        .step-content p {
          font-size: 0.88rem;
          color: #64748B;
          margin: 0;
        }

        .pipeline-arrow {
          margin: 0.4rem 0;
        }

        .tech-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.25s ease;
        }

        .tech-card:hover {
          border-color: #2563EB;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.08);
          transform: translateY(-2px);
        }

        .tech-cat {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #0F9D9A;
          background: #ECFEFF;
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
        }

        .tech-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.4rem;
        }

        .tech-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
