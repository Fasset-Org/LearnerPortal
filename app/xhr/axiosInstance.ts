import axios from "axios";
const BASE_API_URL: string = "http://172.16.248.178:8000/api/v1";
import * as SecureStore from "expo-secure-store";

const token = SecureStore.getItem("userToken");

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
