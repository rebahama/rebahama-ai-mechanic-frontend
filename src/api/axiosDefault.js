import axios from "axios";


axios.defaults.baseURL = "https://mechanic-ai-backend-30fbbccc99ba.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = 'multipart/form-data';
axios.defaults.withCredentials = true;


export const axiosReq = axios.create();
export const axiosRes = axios.create();