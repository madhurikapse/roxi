import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTransactions = async (month, page = 1, perPage = 10, search = '') => {
  const response = await axios.get(`${API_URL}/transactions`, {
    params: { month, page, perPage, search },
  });
  return response.data;
};

export const getStatistics = async (month) => {
  const response = await axios.get(`${API_URL}/statistics`, { params: { month } });
  return response.data;
};

export const getBarChartData = async (month) => {
  const response = await axios.get(`${API_URL}/bar-chart`, { params: { month } });
  return response.data;
};

export const getPieChartData = async (month) => {
  const response = await axios.get(`${API_URL}/pie-chart`, { params: { month } });
  return response.data;
};

export const getCombinedData = async (month) => {
  const response = await axios.get(`${API_URL}/combined-data`, { params: { month } });
  return response.data;
};
