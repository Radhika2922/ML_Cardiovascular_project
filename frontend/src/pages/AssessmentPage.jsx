import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCard from '../components/InputCard';
import SectionHeader from '../components/SectionHeader';
import PredictionButton from '../components/PredictionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Disclaimer from '../components/Disclaimer';
import { predictRisk } from '../services/api';
import {
  User,
  Activity,
  Stethoscope,
  Heart,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Sliders,
  Plus,
  Minus,
  Info,
  ShieldCheck
} from 'lucide-react';

export const AssessmentPage = ({ onPredictionComplete }) => {
  const navigate = useNavigate();

  // Mode state: 'wizard' (Step-by-step) or 'full' (All-in-one form)
  const [formMode, setFormMode] = useState('wizard');
  const [currentStep, setCurrentStep] = useState(1);

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

  // --------------------------------------------------------------------------
  // Dynamic Calculations & Health Indicators
  // --------------------------------------------------------------------------
  const heightM = (formData.height || 0) / 100.0;
  const bmiRaw = heightM > 0 && formData.weight > 0 ? formData.weight / (heightM * heightM) : 0;
  const calculatedBmi = bmiRaw.toFixed(1);

  const getBmiCategory = (val) => {
    if (val <= 0) return { label: 'Unknown', color: '#64748B', bg: '#F1F5F9', pct: 0 };
    if (val < 18.5) return { label: 'Underweight', color: '#2563EB', bg: '#EFF6FF', pct: 20 };
    if (val < 25) return { label: 'Normal weight', color: '#16A34A', bg: '#F0FDF4', pct: 45 };
    if (val < 30) return { label: 'Overweight', color: '#D97706', bg: '#FFFBEB', pct: 70 };
    return { label: 'Obese', color: '#DC2626', bg: '#FEF2F2', pct: 92 };
  };

  const bmiCat = getBmiCategory(bmiRaw);

  // Blood Pressure AHA/ACC Classification
  const getBpCategory = (sys, dia) => {
    if (!sys || !dia || sys <= 0 || dia <= 0) return null;
    if (sys <= dia) return { label: 'Invalid Reading (Systolic must be > Diastolic)', color: '#DC2626', bg: '#FEF2F2', isError: true };
    if (sys > 180 || dia > 120) return { label: 'Hypertensive Crisis', color: '#991B1B', bg: '#FEE2E2', tip: 'Seek emergency medical care immediately if experiencing symptoms.' };
    if (sys >= 140 || dia >= 90) return { label: 'Stage 2 Hypertension', color: '#DC2626', bg: '#FEF2F2', tip: 'High blood pressure requiring clinical evaluation.' };
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: 'Stage 1 Hypertension', color: '#D97706', bg: '#FFFBEB', tip: 'Mild hypertension. Lifestyle & dietary changes recommended.' };
    if (sys >= 120 && sys <= 129 && dia < 80) return { label: 'Elevated BP', color: '#CA8A04', bg: '#FEF9C3', tip: 'Slightly elevated. Monitor regularly.' };
    return { label: 'Normal Blood Pressure', color: '#16A34A', bg: '#F0FDF4', tip: 'Optimal cardiovascular blood pressure reading.' };
  };

  const bpCat = getBpCategory(formData.ap_hi, formData.ap_lo);

  // --------------------------------------------------------------------------
  // Event Handlers
  // --------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : parseInt(value, 10)
    }));
    setErrorMessage('');
  };

  const updateNumericField = (field, delta, minVal, maxVal) => {
    setFormData((prev) => {
      const current = prev[field] || 0;
      const updated = Math.min(maxVal, Math.max(minVal, current + delta));
      return { ...prev, [field]: updated };
    });
    setErrorMessage('');
  };

  const applyBpPreset = (sys, dia) => {
    setFormData((prev) => ({ ...prev, ap_hi: sys, ap_lo: dia }));
    setErrorMessage('');
  };

  const applyAgePreset = (ageVal) => {
    setFormData((prev) => ({ ...prev, age: ageVal }));
    setErrorMessage('');
  };

  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  const validateStep = (stepNumber) => {
    if (stepNumber === 1 || formMode === 'full') {
      if (formData.age < 18 || formData.age > 100) return 'Age must be between 18 and 100 years.';
      if (formData.height < 50 || formData.height > 250) return 'Height must be between 50 and 250 cm.';
      if (formData.weight < 20 || formData.weight > 300) return 'Weight must be between 20 and 300 kg.';
    }
    if (stepNumber === 2 || formMode === 'full') {
      if (formData.ap_hi < 50 || formData.ap_hi > 260) return 'Systolic Blood Pressure must be between 50 and 260 mmHg.';
      if (formData.ap_lo < 30 || formData.ap_lo > 180) return 'Diastolic Blood Pressure must be between 30 and 180 mmHg.';
      if (formData.ap_hi <= formData.ap_lo) return 'Systolic Blood Pressure must be greater than Diastolic Blood Pressure.';
    }
    return null;
  };

  const validateAll = () => {
    const err1 = validateStep(1);
    if (err1) return err1;
    const err2 = validateStep(2);
    if (err2) return err2;
    return null;
  };

  const handleNextStep = () => {
    const err = validateStep(currentStep);
    if (err) {
      setErrorMessage(err);
      return;
    }
    setErrorMessage('');
    setCurrentStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const error = validateAll();
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
      setErrorMessage(err.message || 'Unable to connect to the prediction service. Please check network connection.');
    }
  };

  // Steps definitions
  const steps = [
    { id: 1, title: 'Personal Info', icon: <User size={18} />, desc: 'Age, gender, & height/weight' },
    { id: 2, title: 'Blood Pressure', icon: <Activity size={18} />, desc: 'Systolic & Diastolic mmHg' },
    { id: 3, title: 'Lab Factors', icon: <Stethoscope size={18} />, desc: 'Cholesterol & Glucose levels' },
    { id: 4, title: 'Lifestyle', icon: <Heart size={18} />, desc: 'Smoking, Alcohol, & Exercise' },
  ];

  return (
    <div className="assessment-page animate-fade-in">
      <SectionHeader
        badgeText="Clinical Risk Assessment Engine"
        title="Cardiovascular Health Evaluation"
        subtitle="Enter physiological, vitals, lab lipids, and lifestyle habits for real-time AI risk scoring."
      />

      {/* Form Display Mode Toggle */}
      <div className="mode-toggle-bar">
        <div className="mode-toggle-label">
          <Sliders size={16} color="#2563EB" />
          <span>Form Experience:</span>
        </div>
        <div className="mode-toggle-buttons">
          <button
            type="button"
            className={`mode-btn ${formMode === 'wizard' ? 'active' : ''}`}
            onClick={() => { setFormMode('wizard'); setErrorMessage(''); }}
          >
            <Sparkles size={15} />
            Step-by-Step Wizard
          </button>
          <button
            type="button"
            className={`mode-btn ${formMode === 'full' ? 'active' : ''}`}
            onClick={() => { setFormMode('full'); setErrorMessage(''); }}
          >
            <Sliders size={15} />
            All Fields (Single Page)
          </button>
        </div>
      </div>

      {/* Wizard Progress Bar (Only in Wizard Mode) */}
      {formMode === 'wizard' && (
        <div className="wizard-progress-card">
          <div className="wizard-steps-container">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  className={`wizard-step-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    if (isCompleted || step.id === currentStep + 1) {
                      const err = validateStep(currentStep);
                      if (!err || step.id < currentStep) {
                        setCurrentStep(step.id);
                        setErrorMessage('');
                      } else {
                        setErrorMessage(err);
                      }
                    }
                  }}
                >
                  <div className="step-circle">
                    {isCompleted ? <CheckCircle2 size={16} /> : step.id}
                  </div>
                  <div className="step-label-group">
                    <span className="step-title">{step.title}</span>
                    <span className="step-desc-text">{step.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Global Validation Error Message */}
      {errorMessage && (
        <div className="error-alert animate-fade-in">
          <AlertCircle size={20} color="#DC2626" className="flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Evaluating health indicators against 70,000 patient records..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* STEP 1: PERSONAL INFORMATION */}
          {(formMode === 'full' || currentStep === 1) && (
            <InputCard
              stepNumber={formMode === 'wizard' ? 1 : null}
              title="Personal & Physical Profile"
              icon={<User size={22} />}
              description="Basic demographics and body dimensions for BMI index calculation."
            >
              <div className="responsive-form-grid">
                {/* Age Input */}
                <div className="form-group">
                  <label className="form-label">
                    Age <span className="form-sublabel">(Years)</span>
                  </label>
                  <div className="input-stepper-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('age', -1, 18, 100)}
                      aria-label="Decrease age"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="input-with-unit">
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
                      <span className="unit-badge">yrs</span>
                    </div>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('age', 1, 18, 100)}
                      aria-label="Increase age"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {/* Quick Presets */}
                  <div className="preset-pills">
                    <span className="preset-label">Quick:</span>
                    {[35, 45, 55, 65].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`preset-chip ${formData.age === val ? 'selected' : ''}`}
                        onClick={() => applyAgePreset(val)}
                      >
                        {val}y
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender Input */}
                <div className="form-group">
                  <label className="form-label">Biological Sex</label>
                  <div className="card-radio-group">
                    <label className={`card-radio-pill ${formData.gender === 1 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="gender"
                        value={1}
                        checked={formData.gender === 1}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">👩</span>
                      <span className="radio-text">Female</span>
                    </label>
                    <label className={`card-radio-pill ${formData.gender === 2 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="gender"
                        value={2}
                        checked={formData.gender === 2}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">👨</span>
                      <span className="radio-text">Male</span>
                    </label>
                  </div>
                </div>

                {/* Height Input */}
                <div className="form-group">
                  <label className="form-label">
                    Height <span className="form-sublabel">(cm)</span>
                  </label>
                  <div className="input-stepper-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('height', -1, 50, 250)}
                      aria-label="Decrease height"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="input-with-unit">
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
                      <span className="unit-badge">cm</span>
                    </div>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('height', 1, 50, 250)}
                      aria-label="Increase height"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="form-group">
                  <label className="form-label">
                    Weight <span className="form-sublabel">(kg)</span>
                  </label>
                  <div className="input-stepper-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('weight', -1, 20, 300)}
                      aria-label="Decrease weight"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="input-with-unit">
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
                      <span className="unit-badge">kg</span>
                    </div>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('weight', 1, 20, 300)}
                      aria-label="Increase weight"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Live BMI Interactive Widget */}
              <div className="bmi-widget-card" style={{ borderColor: bmiCat.color }}>
                <div className="bmi-header-row">
                  <div className="bmi-title-group">
                    <Activity size={20} color={bmiCat.color} />
                    <div>
                      <span className="bmi-widget-title">Live Body Mass Index (BMI)</span>
                      <span className="bmi-widget-sub">Calculated automatically from height & weight</span>
                    </div>
                  </div>
                  <div
                    className="bmi-badge-chip"
                    style={{ backgroundColor: bmiCat.bg, color: bmiCat.color, borderColor: bmiCat.color }}
                  >
                    {bmiCat.label}
                  </div>
                </div>

                <div className="bmi-value-display">
                  <span className="bmi-number" style={{ color: bmiCat.color }}>{calculatedBmi}</span>
                  <span className="bmi-unit">kg/m²</span>
                </div>

                {/* Visual BMI Gauge Spectrum Bar */}
                <div className="bmi-spectrum-bar">
                  <div className="bmi-zone zone-under" title="Underweight (< 18.5)">Under</div>
                  <div className="bmi-zone zone-normal" title="Normal (18.5 - 24.9)">Normal</div>
                  <div className="bmi-zone zone-over" title="Overweight (25 - 29.9)">Overweight</div>
                  <div className="bmi-zone zone-obese" title="Obese (≥ 30)">Obese</div>
                  <div
                    className="bmi-pointer"
                    style={{ left: `${Math.min(95, Math.max(5, bmiCat.pct))}%` }}
                    title={`Current BMI: ${calculatedBmi}`}
                  />
                </div>
              </div>
            </InputCard>
          )}

          {/* STEP 2: BLOOD PRESSURE */}
          {(formMode === 'full' || currentStep === 2) && (
            <InputCard
              stepNumber={formMode === 'wizard' ? 2 : null}
              title="Cardiovascular Blood Pressure"
              icon={<Activity size={22} />}
              description="Systolic (ap_hi) and Diastolic (ap_lo) arterial blood pressure readings."
            >
              <div className="responsive-form-grid">
                {/* Systolic BP */}
                <div className="form-group">
                  <label className="form-label">
                    Systolic Blood Pressure (ap_hi) <span className="form-sublabel">(mmHg)</span>
                  </label>
                  <div className="input-stepper-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('ap_hi', -2, 50, 260)}
                      aria-label="Decrease systolic"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="input-with-unit">
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
                      <span className="unit-badge">mmHg</span>
                    </div>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('ap_hi', 2, 50, 260)}
                      aria-label="Increase systolic"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Diastolic BP */}
                <div className="form-group">
                  <label className="form-label">
                    Diastolic Blood Pressure (ap_lo) <span className="form-sublabel">(mmHg)</span>
                  </label>
                  <div className="input-stepper-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('ap_lo', -2, 30, 180)}
                      aria-label="Decrease diastolic"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="input-with-unit">
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
                      <span className="unit-badge">mmHg</span>
                    </div>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => updateNumericField('ap_lo', 2, 30, 180)}
                      aria-label="Increase diastolic"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* BP Presets Row */}
              <div className="preset-bar-box">
                <span className="preset-bar-title">Common Clinical Presets:</span>
                <div className="preset-buttons-row">
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => applyBpPreset(118, 78)}
                  >
                    118/78 (Normal)
                  </button>
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => applyBpPreset(128, 82)}
                  >
                    128/82 (Elevated)
                  </button>
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => applyBpPreset(138, 88)}
                  >
                    138/88 (Stage 1)
                  </button>
                  <button
                    type="button"
                    className="preset-pill-btn"
                    onClick={() => applyBpPreset(150, 95)}
                  >
                    150/95 (Stage 2)
                  </button>
                </div>
              </div>

              {/* Live AHA Blood Pressure Stage Classification Widget */}
              {bpCat && (
                <div
                  className="bp-live-status-card"
                  style={{ backgroundColor: bpCat.bg, borderColor: bpCat.color }}
                >
                  <div className="bp-status-header">
                    <Activity size={20} color={bpCat.color} />
                    <div>
                      <span className="bp-status-title" style={{ color: bpCat.color }}>
                        {bpCat.label}
                      </span>
                      {bpCat.tip && <p className="bp-status-tip">{bpCat.tip}</p>}
                    </div>
                  </div>
                  <div className="bp-reading-tag">
                    {formData.ap_hi} / {formData.ap_lo} mmHg
                  </div>
                </div>
              )}
            </InputCard>
          )}

          {/* STEP 3: MEDICAL LAB FACTORS */}
          {(formMode === 'full' || currentStep === 3) && (
            <InputCard
              stepNumber={formMode === 'wizard' ? 3 : null}
              title="Clinical Laboratory Biomarkers"
              icon={<Stethoscope size={22} />}
              description="Serum cholesterol and fasting blood glucose test measurements."
            >
              <div className="responsive-form-grid">
                {/* Cholesterol Input */}
                <div className="form-group">
                  <label className="form-label">
                    Cholesterol Level
                    <span className="tooltip-trigger" title="Total serum cholesterol concentration">
                      <Info size={14} color="#64748B" />
                    </span>
                  </label>
                  <select
                    name="cholesterol"
                    className="form-select custom-styled-select"
                    value={formData.cholesterol}
                    onChange={handleChange}
                  >
                    <option value={1}>1 - Normal (&lt; 200 mg/dL)</option>
                    <option value={2}>2 - Above Normal (200 - 239 mg/dL)</option>
                    <option value={3}>3 - Well Above Normal (≥ 240 mg/dL)</option>
                  </select>
                  <div className="select-level-indicator">
                    {formData.cholesterol === 1 && <span className="level-chip normal">✅ Normal Lipid Level</span>}
                    {formData.cholesterol === 2 && <span className="level-chip warning">⚠️ Borderline High</span>}
                    {formData.cholesterol === 3 && <span className="level-chip danger">🚨 High Cholesterol</span>}
                  </div>
                </div>

                {/* Glucose Input */}
                <div className="form-group">
                  <label className="form-label">
                    Glucose Level
                    <span className="tooltip-trigger" title="Fasting blood sugar concentration">
                      <Info size={14} color="#64748B" />
                    </span>
                  </label>
                  <select
                    name="gluc"
                    className="form-select custom-styled-select"
                    value={formData.gluc}
                    onChange={handleChange}
                  >
                    <option value={1}>1 - Normal (&lt; 100 mg/dL)</option>
                    <option value={2}>2 - Above Normal (100 - 125 mg/dL)</option>
                    <option value={3}>3 - Well Above Normal (≥ 126 mg/dL)</option>
                  </select>
                  <div className="select-level-indicator">
                    {formData.gluc === 1 && <span className="level-chip normal">✅ Normal Fasting Glucose</span>}
                    {formData.gluc === 2 && <span className="level-chip warning">⚠️ Impaired Fasting Glucose</span>}
                    {formData.gluc === 3 && <span className="level-chip danger">🚨 Elevated Glucose</span>}
                  </div>
                </div>
              </div>

              {/* Clinical Lab Explanatory Box */}
              <div className="lab-info-banner">
                <ShieldCheck size={18} color="#2563EB" className="flex-shrink-0" />
                <span>
                  Laboratory indicators serve as key clinical predictors of atherosclerosis and arterial plaque accumulation.
                </span>
              </div>
            </InputCard>
          )}

          {/* STEP 4: LIFESTYLE & HABITUAL FACTORS */}
          {(formMode === 'full' || currentStep === 4) && (
            <InputCard
              stepNumber={formMode === 'wizard' ? 4 : null}
              title="Lifestyle & Habitual Factors"
              icon={<Heart size={22} />}
              description="Tobacco smoking, alcohol consumption, and physical activity habits."
            >
              <div className="responsive-lifestyle-grid">
                {/* Tobacco Smoking */}
                <div className="form-group">
                  <label className="form-label">Tobacco Smoking</label>
                  <div className="card-radio-group vertical-mobile">
                    <label className={`card-radio-pill ${formData.smoke === 0 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="smoke"
                        value={0}
                        checked={formData.smoke === 0}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">🚭</span>
                      <span className="radio-text">Non-Smoker</span>
                    </label>
                    <label className={`card-radio-pill danger ${formData.smoke === 1 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="smoke"
                        value={1}
                        checked={formData.smoke === 1}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">🚬</span>
                      <span className="radio-text">Smoker</span>
                    </label>
                  </div>
                </div>

                {/* Alcohol Consumption */}
                <div className="form-group">
                  <label className="form-label">Alcohol Consumption</label>
                  <div className="card-radio-group vertical-mobile">
                    <label className={`card-radio-pill ${formData.alco === 0 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="alco"
                        value={0}
                        checked={formData.alco === 0}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">💧</span>
                      <span className="radio-text">No / Minimal</span>
                    </label>
                    <label className={`card-radio-pill danger ${formData.alco === 1 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="alco"
                        value={1}
                        checked={formData.alco === 1}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">🍷</span>
                      <span className="radio-text">Regular Intake</span>
                    </label>
                  </div>
                </div>

                {/* Physical Activity */}
                <div className="form-group">
                  <label className="form-label">Physical Activity</label>
                  <div className="card-radio-group vertical-mobile">
                    <label className={`card-radio-pill ${formData.active === 1 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="active"
                        value={1}
                        checked={formData.active === 1}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">🏃</span>
                      <span className="radio-text">Active Exercise</span>
                    </label>
                    <label className={`card-radio-pill warning ${formData.active === 0 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="active"
                        value={0}
                        checked={formData.active === 0}
                        onChange={handleChange}
                      />
                      <span className="radio-icon">🛋️</span>
                      <span className="radio-text">Sedentary</span>
                    </label>
                  </div>
                </div>
              </div>
            </InputCard>
          )}

          {/* Form Wizard Navigation Bar & Submit Button Row */}
          {formMode === 'wizard' ? (
            <div className="wizard-navigation-bar">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn btn-outline wizard-nav-btn"
                  onClick={handlePrevStep}
                >
                  <ArrowLeft size={18} />
                  <span>Previous Step</span>
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary wizard-nav-btn"
                  onClick={handleNextStep}
                >
                  <span>Next: {steps[currentStep].title}</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <div className="submit-wrapper">
                  <PredictionButton
                    loading={loading}
                    text="Calculate Cardiovascular Risk →"
                    onClick={handleSubmit}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="form-submit-row">
              <PredictionButton
                loading={loading}
                text="Predict Risk"
                onClick={handleSubmit}
              />
            </div>
          )}
        </form>
      )}

      <Disclaimer compact />

      <style>{`
        .assessment-page {
          max-width: 960px;
          margin: 0 auto;
          padding-bottom: 3rem;
        }

        /* Form Mode Switcher */
        .mode-toggle-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
          box-shadow: 0 2px 8px rgba(15, 39, 71, 0.03);
        }

        .mode-toggle-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.92rem;
          color: #0F2747;
        }

        .mode-toggle-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #CBD5E1;
          background: #F8FAFC;
          color: #475569;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mode-btn:hover {
          background: #EFF6FF;
          color: #2563EB;
          border-color: #93C5FD;
        }

        .mode-btn.active {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
        }

        /* Wizard Progress Card */
        .wizard-progress-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(15, 39, 71, 0.03);
        }

        .wizard-steps-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .wizard-step-tab {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.75rem;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wizard-step-tab:hover {
          border-color: #93C5FD;
          background: #EFF6FF;
        }

        .wizard-step-tab.active {
          background: #EFF6FF;
          border-color: #2563EB;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
        }

        .wizard-step-tab.completed {
          background: #F0FDF4;
          border-color: #86EFAC;
        }

        .step-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #E2E8F0;
          color: #475569;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .wizard-step-tab.active .step-circle {
          background: #2563EB;
          color: #FFFFFF;
        }

        .wizard-step-tab.completed .step-circle {
          background: #16A34A;
          color: #FFFFFF;
        }

        .step-label-group {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .step-title {
          font-weight: 700;
          font-size: 0.88rem;
          color: #0F2747;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-desc-text {
          font-size: 0.74rem;
          color: #64748B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .progress-bar-track {
          width: 100%;
          height: 6px;
          background: #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563EB 0%, #0F9D9A 100%);
          transition: width 0.35s ease;
          border-radius: 10px;
        }

        /* Responsive Form Grids */
        .responsive-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .responsive-lifestyle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Inputs & Steppers */
        .input-stepper-wrapper {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .stepper-btn {
          width: 40px;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #CBD5E1;
          background: #F8FAFC;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .stepper-btn:hover {
          background: #EFF6FF;
          border-color: #2563EB;
          color: #2563EB;
        }

        .stepper-btn:active {
          transform: scale(0.95);
        }

        .input-with-unit {
          position: relative;
          flex: 1;
        }

        .input-with-unit .form-input {
          padding-right: 3.2rem;
          height: 44px;
          font-weight: 700;
          font-size: 1rem;
        }

        .unit-badge {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748B;
          pointer-events: none;
          background: #F1F5F9;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        /* Presets */
        .preset-pills {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
        }

        .preset-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748B;
        }

        .preset-chip {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          padding: 0.15rem 0.45rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-chip:hover {
          background: #EFF6FF;
          color: #2563EB;
          border-color: #BFDBFE;
        }

        .preset-chip.selected {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
        }

        /* Card Radio Buttons */
        .card-radio-group {
          display: flex;
          gap: 0.6rem;
        }

        .card-radio-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 0.6rem;
          min-height: 48px;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .card-radio-pill input {
          display: none;
        }

        .radio-icon {
          font-size: 1.1rem;
        }

        .radio-text {
          font-weight: 700;
          font-size: 0.88rem;
          color: #334155;
        }

        .card-radio-pill:hover {
          border-color: #93C5FD;
          background: #EFF6FF;
        }

        .card-radio-pill.selected {
          background: #EFF6FF;
          border-color: #2563EB;
          box-shadow: 0 2px 10px rgba(37, 99, 235, 0.18);
        }

        .card-radio-pill.selected .radio-text {
          color: #2563EB;
        }

        .card-radio-pill.danger.selected {
          background: #FEF2F2;
          border-color: #DC2626;
        }

        .card-radio-pill.danger.selected .radio-text {
          color: #DC2626;
        }

        .card-radio-pill.warning.selected {
          background: #FFFBEB;
          border-color: #D97706;
        }

        .card-radio-pill.warning.selected .radio-text {
          color: #D97706;
        }

        /* Live BMI Widget */
        .bmi-widget-card {
          background: #FFFFFF;
          border: 1.5px solid #BFDBFE;
          border-radius: 14px;
          padding: 1.1rem;
          margin-top: 1.25rem;
          box-shadow: 0 2px 10px rgba(37, 99, 235, 0.05);
          transition: border-color 0.3s ease;
        }

        .bmi-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .bmi-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .bmi-widget-title {
          display: block;
          font-weight: 800;
          font-size: 0.95rem;
          color: #0F2747;
        }

        .bmi-widget-sub {
          display: block;
          font-size: 0.78rem;
          color: #64748B;
        }

        .bmi-badge-chip {
          font-size: 0.82rem;
          font-weight: 800;
          padding: 0.3rem 0.75rem;
          border-radius: 50px;
          border: 1px solid transparent;
        }

        .bmi-value-display {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
        }

        .bmi-number {
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1;
        }

        .bmi-unit {
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748B;
        }

        .bmi-spectrum-bar {
          position: relative;
          display: flex;
          height: 24px;
          border-radius: 8px;
          overflow: hidden;
          background: #E2E8F0;
          margin-top: 0.5rem;
        }

        .bmi-zone {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 800;
          color: #FFFFFF;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .zone-under { background: #3B82F6; }
        .zone-normal { background: #16A34A; }
        .zone-over { background: #EAB308; }
        .zone-obese { background: #EF4444; }

        .bmi-pointer {
          position: absolute;
          top: -3px;
          width: 8px;
          height: 30px;
          background: #0F2747;
          border: 2px solid #FFFFFF;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          transform: translateX(-50%);
          transition: left 0.35s ease;
        }

        /* BP Presets & Live Card */
        .preset-bar-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .preset-bar-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
        }

        .preset-buttons-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .preset-pill-btn {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1E293B;
          padding: 0.3rem 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-pill-btn:hover {
          background: #EFF6FF;
          border-color: #2563EB;
          color: #2563EB;
        }

        .bp-live-status-card {
          border: 1.5px solid;
          border-radius: 12px;
          padding: 0.9rem 1.1rem;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .bp-status-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .bp-status-title {
          font-weight: 800;
          font-size: 0.95rem;
          display: block;
        }

        .bp-status-tip {
          font-size: 0.8rem;
          color: #475569;
          margin-top: 0.15rem;
        }

        .bp-reading-tag {
          font-weight: 900;
          font-size: 1.1rem;
          color: #0F2747;
          background: #FFFFFF;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
        }

        /* Select Indicators */
        .tooltip-trigger {
          display: inline-flex;
          margin-left: 0.35rem;
          cursor: help;
        }

        .custom-styled-select {
          height: 44px;
          font-weight: 600;
        }

        .select-level-indicator {
          margin-top: 0.4rem;
        }

        .level-chip {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }

        .level-chip.normal { background: #F0FDF4; color: #16A34A; border: 1px solid #BBF7D0; }
        .level-chip.warning { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
        .level-chip.danger { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; }

        .lab-info-banner {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #1E40AF;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1rem;
        }

        /* Wizard Navigation & Buttons */
        .wizard-navigation-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.5rem;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .wizard-nav-btn {
          padding: 0.85rem 1.6rem;
          font-weight: 700;
        }

        .submit-wrapper {
          flex: 1;
        }

        .form-submit-row {
          margin: 2rem 0;
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
          gap: 0.65rem;
        }

        /* Mobile & Tablet Responsiveness */
        @media (max-width: 850px) {
          .wizard-steps-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .responsive-lifestyle-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .wizard-steps-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
          .wizard-step-tab {
            padding: 0.5rem;
          }
          .step-desc-text {
            display: none;
          }
          .responsive-form-grid {
            grid-template-columns: 1fr;
          }
          .card-radio-group.vertical-mobile {
            flex-direction: row;
          }
          .mode-toggle-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .mode-toggle-buttons {
            width: 100%;
          }
          .mode-btn {
            flex: 1;
            justify-content: center;
          }
          .preset-bar-box {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default AssessmentPage;
