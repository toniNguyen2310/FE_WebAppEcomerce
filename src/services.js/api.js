import axios from "../services.js/customAxios";

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

export const editInforUSer = (data) => {
  return axios.put(`/v1/api/user/${data.id}`, data.user);
};

//PRODUCT
export const getProducts = (query) => {
  return axios.get(`/v1/api/product?${query}`);
};

export const getProductById = (id) => {
  return axios.get(`/v1/api/product/${id}`);
};

export const callDeleteProduct = (id) => {
  return axios.delete(`/v1/api/product/${id}`);
};

export const callCreateProduct = (product) => {
  return axios.post(`/v1/api/product`, product);
};

export const putProduct = (data) => {
  return axios.put(`/v1/api/product/${data._id}`, data);
};

export const getProductByCategorySlice = (category) => {
  return axios.get(`/v1/api/product/category-slice/${category}`);
};

export const getProductByDiscountSlice = () => {
  return axios.get(`/v1/api/category/discount`);
};

//CATEGORY
export const getListBrandByCategory = (data) => {
  return axios.get(`/v1/api/category?value=${data}`);
};

//GET LIST CART BY ID USER
export const fetchListCartByUserId = (id) => {
  return axios.get(`/v1/api/user/cart/${id}`);
};

//EDIT CART
export const adjustListCartByUserID = (data) => {
  return axios.post(`/v1/api/user/add/${data.id}`, { listCart: data.cart });
};

//SEARCH PRODUCT NAVBAR
export const searchProductNavbarAPI = (value) => {
  return axios.get(`/v1/api/product/search/navbar?value=${value}`);
};

//ORDER
export const createOrder = (data) => {
  return axios.post(`/v1/api/order`, data);
};

export const getListOrder = (userId) => {
  return axios.get(`/v1/api/order/${userId}`);
};

export const getListOrderByPhone = (number) => {
  return axios.get(`/v1/api/order/phone/${number}`);
};

export const cancelOrderApi = (idOrder) => {
  return axios.put(`/v1/api/order/edit/${idOrder}`);
};
