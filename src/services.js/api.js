import axios from "../utils/axios-customize";

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
