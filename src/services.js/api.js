import axios from "../utils/axios-customize";

//AUTH
export const callRegister = (email, username, password, phone) => {
  return axios.post("/v1/api/auth/register", {
    email,
    username,
    password,
    phone,
  });
};

export const callLogin = (email, password) => {
  return axios.post("/v1/api/auth/login", { email, password });
};

export const callFetchAccount = () => {
  return axios.get("/v1/api/auth/account");
};

export const callLogout = () => {
  return axios.post("/v1/api/auth/logout");
};

//PRODUCT
export const getProducts = (query) => {
  return axios.get(`/v1/api/product?${query}`);
};

export const callDeleteProduct = (id) => {
  return axios.delete(`/v1/api/product/${id}`);
};

export const callCreateProduct = (product) => {
  return axios.post(`/v1/api/product`, product);
};
