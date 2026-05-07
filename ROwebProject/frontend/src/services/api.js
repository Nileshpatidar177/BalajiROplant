import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const submitOrder = (orderData) => API.post('/orders', orderData);
export const getProducts = () => API.get('/products');
export const getSettings = () => API.get('/settings/public');

export default API;
