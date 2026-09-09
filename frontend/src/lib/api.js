import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitInquiry = (payload) => axios.post(`${API}/submissions`, payload);

export const fetchSubmissions = (key) =>
  axios.get(`${API}/submissions`, { headers: { "x-admin-key": key } });
