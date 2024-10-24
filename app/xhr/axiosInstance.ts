import axios from "axios";
const BASE_API_URL: string = "http://172.16.248.146:8000/api/v1";
import * as SecureStore from "expo-secure-store";

const token = SecureStore.getItem("userToken");

console.log("token", token);

const axiosIntance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

export default axiosIntance;
