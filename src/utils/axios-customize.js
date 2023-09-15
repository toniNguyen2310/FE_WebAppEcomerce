import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
  // headers: { Authorization: `Bearer ${cookie_value}` },
  withCredentials: true,
  // headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

//Gán access_token trong LS vào axios
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

//Xử lý refresh Token
const handleRefreshToken = async () => {
  const res = await instance.post("/v1/api/auth/refresh");
  if (res && res.data) return res.data.accessToken;
  else null;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//Biến gán để tránh retry vô hạn
const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      //Điều kiện tránh retry vô hạn
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const accessToken = await handleRefreshToken();
      //Xử lý tránh retry vô hạn
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (accessToken) {
        console.log("accessToken>>>", accessToken);
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("access_token", accessToken);
        console.log("error.config>> ", error.config);
        return instance.request(error.config);
      }
    }
    // if (
    //   error.config &&
    //   error.response &&
    //   +error.response.status === 400 &&
    //   //Điều kiện tránh retry vô hạn
    //   !error.config.headers[NO_RETRY_HEADER]
    // ) {
    //   window.location.href = "/login";
    // }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
