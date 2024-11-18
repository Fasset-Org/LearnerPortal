import axios from "axios";
import axiosIntance from "./axiosInstance";

const AuthQuery = {
  registerUser: async (formData: any) => {
    const resp = await axiosIntance.post(`/auth/register`, formData);
    console.log(resp);
    return resp?.data;
  },

  loginUser: async (formData: any) => {
    const resp = await axiosIntance.post(`/auth/login`, formData);
    console.log(resp);
    return resp?.data;
  }
};

export default AuthQuery;
