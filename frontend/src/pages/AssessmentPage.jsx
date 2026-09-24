import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCard from '../components/InputCard';
import SectionHeader from '../components/SectionHeader';
import PredictionButton from '../components/PredictionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Disclaimer from '../components/Disclaimer';
import { predictRisk } from '../services/api';
import { User, Activity, Stethoscope, Heart, AlertCircle } from 'lucide-react';

export const AssessmentPage = ({ onPredictionComplete }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: 50,
    gender: 1, // 1: Female, 2: Male
    height: 165,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate live BMI
  const heightM = (formData.height || 0) / 100.0;
  const calculatedBmi = heightM > 0 && formData.weight > 0 ? (formData.weight / (heightM * heightM)).toFixed(1) : 0;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : parseInt(value, 10)
    }));
    setErrorMessage('');
  };

  const validateForm = () => {
    if (formData.age < 18 || formData.age > 100) {
      return 'Age must be between 18 and 100 years.';
    }
    if (formData.height < 50 || formData.height > 250) {
      return 'Height must be between 50 and 250 cm.';
    }
    if (formData.weight < 20 || formData.weight > 300) {
      return 'Weight must be between 20 and 300 kg.';
    }
    if (formData.ap_hi <= 0 || formData.ap_hi < 50 || formData.ap_hi > 260) {
      return 'Systolic Blood Pressure must be greater than 0 (valid range 50-260 mmHg).';
    }
    if (formData.ap_lo <= 0 || formData.ap_lo < 30 || formData.ap_lo > 180) {
      return 'Diastolic Blood Pressure must be greater than 0 (valid range 30-180 mmHg).';
    }
    if (formData.ap_hi <= formData.ap_lo) {
      return 'Systolic Blood Pressure must be greater than Diastolic Blood Pressure.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await predictRisk(formData);
      setLoading(false);
      if (onPredictionComplete) {
        onPredictionComplete(result, formData);
      }
      navigate('/results', { state: { result, formData } });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Unable to connect to the prediction service. Please check your network or try again.');
    }
  };

  return (
    <div className="assessment-page animate-fade-in">
      <SectionHeader
        badgeText="Clinical Risk Assessment Form"
        title="Cardiovascular Health Evaluation"
        subtitle="Enter physiological, clinical lipid, and lifestyle metrics to calculate cardiovascular risk probability."
      />

      {errorMessage && (
        <div className="error-alert">
          <AlertCircle size={20} color="#DC2626" />
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Analyzing health information..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* 1. Personal Information */}
          <InputCard title="Personal Information" icon={<User size={20} />} description="Age, gender, and physical dimensions">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  Age <span className="form-sublabel">(Years)</span>
                </label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  className="form-input"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                  <option value={1}>Female</option>
                  <option value={2}>Male</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Height <span className="form-sublabel">(cm)</span>
                </label>
                <input
                  type="number"
                  name="height"
                  min="50"
                  max="250"
                  className="form-input"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Weight <span className="form-sublabel">(kg)</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  min="20"
                  max="300"
                  className="form-input"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Live Calculated BMI Banner */}
            <div className="bmi-live-banner">
              <Activity size={18} color="#2563EB" />
              <span>
                Calculated Body Mass Index (BMI): <strong>{calculatedBmi} kg/m²</strong>
                {calculatedBmi > 0 && (
                  <span className="bmi-category">
                    ({calculatedBmi < 18.5 ? 'Underweight' : calculatedBmi < 25 ? 'Normal weight' : calculatedBmi < 30 ? 'Overweight' : 'Obese'})
                  </span>
                )}
              </span>
            </div>
          </InputCard>

          {/* 2. Blood Pressure */}
          <InputCard title="Blood Pressure Readings" icon={<Activity size={20} />} description="Systolic & Diastolic arterial blood pressure">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  Systolic Blood Pressure (ap_hi) <span className="form-sublabel">(mmHg)</span>
                </label>
                <input
                  type="number"
                  name="ap_hi"
                  min="50"
                  max="260"
                  className="form-input"
                  value={formData.ap_hi}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Diastolic Blood Pressure (ap_lo) <span className="form-sublabel">(mmHg)</span>
                </label>
                <input
                  type="number"
                  name="ap_lo"
                  min="30"
                  max="180"
                  className="form-input"
                  value={formData.ap_lo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </InputCard>

          {/* 3. Medical Factors */}
          <InputCard title="Medical Laboratory Factors" icon={<Stethoscope size={20} />} description="Serum cholesterol and blood glucose levels">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Cholesterol Level</label>
                <select name="cholesterol" className="form-select" value={formData.cholesterol} onChange={handleChange}>
                  <option value={1}>1 - Normal (&lt; 200 mg/dL)</option>
                  <option value={2}>2 - Above Normal (200 - 239 mg/dL)</option>
                  <option value={3}>3 - Well Above Normal (≥ 240 mg/dL)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Glucose Level</label>
                <select name="gluc" className="form-select" value={formData.gluc} onChange={handleChange}>
                  <option value={1}>1 - Normal (&lt; 100 mg/dL)</option>
                  <option value={2}>2 - Above Normal (100 - 125 mg/dL)</option>
                  <option value={3}>3 - Well Above Normal (≥ 126 mg/dL)</option>
                </select>
              </div>
            </div>
          </InputCard>

          {/* 4. Lifestyle Factors */}
          <InputCard title="Lifestyle & Habitual Factors" icon={<Heart size={20} />} description="Tobacco, alcohol consumption, and physical exercise">
            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Tobacco Smoking</label>
                <div className="radio-group">
                  <label className={`radio-pill ${formData.smoke === 0 ? 'selected' : ''}`}>
                    <input type="radio" name="smoke" value={0} checked={formData.smoke === 0} onChange={handleChange} />
                    Non-Smoker
                  </label>
                  <label className={`radio-pill ${formData.smoke === 1 ? 'selected' : ''}`}>
                    <input type="radio" name="smoke" value={1} checked={formData.smoke === 1} onChange={handleChange} />
                    Smoker
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Alcohol Consumption</label>
                <div className="radio-group">
                  <label className={`radio-pill ${formData.alco === 0 ? 'selected' : ''}`}>
                    <input type="radio" name="alco" value={0} checked={formData.alco === 0} onChange={handleChange} />
                    No / Minimal
                  </label>
                  <label className={`radio-pill ${formData.alco === 1 ? 'selected' : ''}`}>
                    <input type="radio" name="alco" value={1} checked={formData.alco === 1} onChange={handleChange} />
                    Regular Intake
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Physical Activity</label>
                <div className="radio-group">
                  <label className={`radio-pill ${formData.active === 1 ? 'selected' : ''}`}>
                    <input type="radio" name="active" value={1} checked={formData.active === 1} onChange={handleChange} />
                    Active Exercise
                  </label>
                  <label className={`radio-pill ${formData.active === 0 ? 'selected' : ''}`}>
                    <input type="radio" name="active" value={0} checked={formData.active === 0} onChange={handleChange} />
                    Sedentary
                  </label>
                </div>
              </div>
            </div>
          </InputCard>

          <div className="form-submit-row">
            <PredictionButton loading={loading} onClick={handleSubmit} />
          </div>
        </form>
      )}

      <Disclaimer compact />

      <style>{`
        .assessment-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .error-alert {
          background-color: #FEF2F2;
          border: 1.5px solid #FCA5A5;
          color: #991B1B;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.92rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .bmi-live-banner {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #1E40AF;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .bmi-category {
          margin-left: 0.4rem;
          font-weight: 600;
          color: #2563EB;
        }

        .radio-group {
          display: flex;
          gap: 0.5rem;
        }

        .radio-pill {
          flex: 1;
          text-align: center;
          padding: 0.65rem 0.5rem;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .radio-pill input {
          display: none;
        }

        .radio-pill.selected {
          background: #EFF6FF;
          border-color: #2563EB;
          color: #2563EB;
          font-weight: 700;
        }

        .form-submit-row {
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};

export default AssessmentPage;
