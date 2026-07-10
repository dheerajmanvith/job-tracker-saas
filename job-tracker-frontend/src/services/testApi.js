import api from './api';

export const testBackend = async () => {
  const response = await api.get('/api/v1/health');
  return response.data;
};
