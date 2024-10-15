import axios from "axios";
import { getItem } from "expo-secure-store";

const BASE_API_URL: string = "http://192.168.0.112:8000/api/v1";
const token = getItem("userToken");

const axiosIntance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

export default axiosIntance;
