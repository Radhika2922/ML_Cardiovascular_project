import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const getHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check API error:', error);
    return {
      status: 'offline',
      service: 'CardioPredict API',
      message: 'Unable to connect to backend prediction service.'
    };
  }
};

export const predictRisk = async (payload) => {
  try {
    const response = await apiClient.post('/predict', payload);
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Unable to connect to the prediction service. Please verify backend server is running.');
  }
};

export const getModelInfo = async () => {
  try {
    const response = await apiClient.get('/model-info');
    return response.data;
  } catch (error) {
    console.error('Model info API error:', error);
    throw new Error('Failed to fetch model information.');
  }
};

export const getDatasetSummary = async () => {
  try {
    const response = await apiClient.get('/dataset-summary');
    return response.data;
  } catch (error) {
    console.error('Dataset summary API error:', error);
    throw new Error('Failed to fetch dataset summary.');
  }
};

export const getModelPerformance = async () => {
  try {
    const response = await apiClient.get('/model-performance');
    return response.data;
  } catch (error) {
    console.error('Model performance API error:', error);
    throw new Error('Failed to fetch model performance metrics.');
  }
};

export default {
  getHealth,
  predictRisk,
  getModelInfo,
  getDatasetSummary,
  getModelPerformance,
};
