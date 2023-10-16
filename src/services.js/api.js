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

//CART
export const handleAddToCartAPI = (data) => {
  return axios.post(`/v1/api/cart/increase?productId=${data.idProduct}`, {
    userId: data.idUser,
  });
};

export const fetchCartByUseAPI = (data) => {
  return axios.get(`/v1/api/cart?userId=${data}`);
};

export const handleSaveCart = (data) => {
  return axios.post(`/v1/api/cart/edit/${data.id}`, { listCart: data.cart });
};
