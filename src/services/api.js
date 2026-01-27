import axios from 'axios';
import {Platform} from 'react-native';

const DEFAULT_API_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

const baseURL =
  (typeof process !== 'undefined' && process.env?.API_BASE_URL) ||
  DEFAULT_API_URL;

const api = axios.create({
  baseURL,
});

export default api;
