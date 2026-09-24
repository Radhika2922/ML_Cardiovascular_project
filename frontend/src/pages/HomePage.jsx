import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import InfoCard from '../components/InfoCard';
import SectionHeader from '../components/SectionHeader';
import Disclaimer from '../components/Disclaimer';
import { Cpu, HeartPulse, BarChart3, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page animate-fade-in">
      <HeroSection />

      <SectionHeader
        badgeText="Platform Capabilities"
        title="Predictive Healthcare Analytics"
        subtitle="Powered by supervised machine learning classification trained on standardized clinical datasets."
      />

      <div className="grid-3 mb-2">
        <InfoCard
          icon={<Cpu size={26} />}
          title="Machine Learning Engine"
          description="Engineered with 8 classification algorithms (AdaBoost, Random Forest, & Tuned Decision Trees) trained on 62,500 clinical observations."
          badgeText="AdaBoost ML"
          accentColor="#2563EB"
        />

        <InfoCard
          icon={<HeartPulse size={26} />}
          title="Personalized Assessment"
          description="Patients enter physiological metrics (blood pressure, lipid panel, glucose, BMI) and lifestyle factors to generate risk probability."
          badgeText="Real-Time Screening"
          accentColor="#0F9D9A"
        />

        <InfoCard
          icon={<BarChart3 size={26} />}
          title="Model Evaluation"
          description="Rigorous cross-validation benchmarks displaying accuracy (72.61%), precision (73.05%), recall (71.20%), and F1-score."
          badgeText="CV Metrics"
          accentColor="#1D4ED8"
        />
      </div>

      <div className="banner-callout">
        <div className="callout-text">
          <h3>Ready to Evaluate Cardiovascular Risk?</h3>
          <p>Complete the non-invasive health evaluation form to generate machine-learning risk predictions.</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/assessment')}>
          Start Assessment Now <ArrowRight size={18} />
        </button>
      </div>

      <Disclaimer />

      <style>{`
        .home-page {
          padding-bottom: 2rem;
        }

        .mb-2 {
          margin-bottom: 2.5rem;
        }

        .banner-callout {
          background: #FFFFFF;
          border: 1.5px solid #2563EB;
          border-radius: 20px;
          padding: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.08);
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .callout-text h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0F2747;
          margin-bottom: 0.3rem;
        }

        .callout-text p {
          font-size: 0.98rem;
          color: #64748B;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
