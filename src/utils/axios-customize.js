import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;
const baseURLDeployed = import.meta.env.VITE_BACKEND_URL_DEPLOYED;

// const checkLocalHost = async () => {
//   try {
//     const resUrl = await fetch(baseURL);
//     console.log(">>checl url", resUrl);

//     if (resUrl) {
//       return baseURL;
//     }
//   } catch (error) {
//     const resUrlDeploy = await fetch(baseURLDeployed);
//     console.log(">>checl url", resUrlDeploy);

//     if (resUrlDeploy) {
//       return baseURLDeployed;
//     }
//   }
// };

// checkLocalHost();

// console.log(
//   ">>>final url:",
//   checkLocalHost().then((res) => res.json())
// );

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
  const refreshLocal = localStorage.getItem("refresh_token");
  console.log("refresh_token>>> ", refreshLocal);
  const res = await instance.post("/v1/api/auth/refresh", { refreshLocal });
  if (res && res.data) {
    console.log("handleRefreshToken> res.data>>> ", res.data);
    return res.data;
  } else null;
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

  //ERROR WITH COOKIE
  // async function (error) {
  //   if (
  //     error.config &&
  //     error.response &&
  //     +error.response.status === 401 &&
  //     //Điều kiện tránh retry vô hạn
  //     !error.config.headers[NO_RETRY_HEADER]
  //   ) {
  //     const accessToken = await handleRefreshToken();
  //     //Xử lý tránh retry vô hạn
  //     error.config.headers[NO_RETRY_HEADER] = "true";

  //     if (accessToken) {
  //       error.config.headers["Authorization"] = `Bearer ${accessToken}`;
  //       localStorage.setItem("access_token", accessToken);
  //       return instance.request(error.config);
  //     }
  //   }
  //   if (
  //     error.config &&
  //     error.response &&
  //     +error.response.status === 400 &&
  //     error.config.url === "/v1/api/auth/refresh"
  //   ) {
  //     localStorage.removeItem("refresh_token");
  //     localStorage.removeItem("access_token");
  //     window.location.href = "/login";
  //   }

  //   return error?.response?.data ?? Promise.reject(error);
  // }

  //ERROR WITH LS REFRESH TOKEN
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      //Điều kiện tránh retry vô hạn
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const data = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (data.accessToken && data.refreshToken) {
        console.log("data.accessToken && data.refreshToken");
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        return instance.request(error.config);
      }
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/v1/api/auth/refresh"
    ) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
