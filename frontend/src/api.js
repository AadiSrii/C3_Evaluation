import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // URL of your backend
  withCredentials: true,
});

export const createPdf = (data) => axiosInstance.post('/pdfs', data);
export const fetchPdfs = () => axiosInstance.get('/pdfs');
export const downloadPdf = (id) => axiosInstance.get(`/pdfs/${id}`, { responseType: 'blob' });
