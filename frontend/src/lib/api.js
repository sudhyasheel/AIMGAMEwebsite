import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitInquiry = (payload) => axios.post(`${API}/submissions`, payload);

export const fetchSubmissions = (key) =>
  axios.get(`${API}/submissions`, { headers: { "x-admin-key": key } });

export const getDonationConfig = () => axios.get(`${API}/donations/config`);

export const createDonationOrder = (payload) =>
  axios.post(`${API}/donations/create-order`, payload);

export const verifyDonation = (payload) => axios.post(`${API}/donations/verify`, payload);

export const loadRazorpay = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
