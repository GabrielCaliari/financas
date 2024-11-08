import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendfinancas-production-a109.up.railway.app',
});

export default api;
