import axios from "axios";

const baseURL = "https://mechanic-ai-backend-30fbbccc99ba.herokuapp.com";


axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;


export const axiosReq = axios.create({
  baseURL,
});

export const axiosRes = axios.create({
  baseURL,
});


axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("No refresh token");

        const { data } = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh,
        });

        localStorage.setItem("access_token", data.access);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return axiosReq(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
