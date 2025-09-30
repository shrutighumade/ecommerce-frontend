import axios from "axios";

const API_URL = "http://localhost:5004/api"; // match your backend port

// Named exports
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);
export const createProduct = (data) => axios.post(`${API_URL}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
