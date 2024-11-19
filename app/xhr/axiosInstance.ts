import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// const BASE_API_URL: string = "http://102.37.220.209:8000/api/v1";
const BASE_API_URL: string = "https://career-portal-api.fasset.org.za/api/v1";
// import * as SecureStore from "expo-secure-store";

// const token = SecureStore.getItem("userToken");
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
