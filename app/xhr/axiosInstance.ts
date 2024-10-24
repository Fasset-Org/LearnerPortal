import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getItem } from "expo-secure-store";

const BASE_API_URL: string = "http://172.16.248.146:8000/api/v1";
const token = async () => {
  return await AsyncStorage.getItem("userToken");
};

const axiosIntance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

export default axiosIntance;
