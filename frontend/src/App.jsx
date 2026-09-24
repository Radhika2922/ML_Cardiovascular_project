import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ModelPerformancePage from './pages/ModelPerformancePage';
import DatasetPage from './pages/DatasetPage';
import AboutPage from './pages/AboutPage';
import './styles/main.css';

export function App() {
  const [lastPredictionResult, setLastPredictionResult] = useState(null);

  const handlePredictionComplete = (result) => {
    setLastPredictionResult(result);
  };

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/assessment"
            element={<AssessmentPage onPredictionComplete={handlePredictionComplete} />}
          />
          <Route
            path="/results"
            element={<ResultsPage lastResult={lastPredictionResult} />}
          />
          <Route path="/performance" element={<ModelPerformancePage />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
