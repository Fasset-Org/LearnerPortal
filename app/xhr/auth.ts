import axiosInstance from "./axiosInstance";

const AuthQuery = {
  registerUser: async (formData: any) => {
    const resp = await axiosInstance.post(`/auth/register`, formData);
    console.log(resp);
    return resp?.data;
  },

  loginUser: async (formData: any) => {
    const resp = await axiosInstance.post(`/auth/login`, formData);
    console.log(resp);
    return resp?.data;
  },

  deleteUser: async (formData: any) => {
    const resp = await axiosInstance.put(
      `/auth/deleteUser/${formData.userId}`,
      formData
    );

    return resp?.data;
  }
};

export default AuthQuery;
