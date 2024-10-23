import axiosIntance from "./axiosInstance";

const StudentQuery = {
  getUserInfo: async () => {
    const resp = await axiosIntance.get(`/auth/isUserLoggedIn`);

    return resp?.data;
  },

  addAddresInfo: async (formData: any) => {
    const resp = await axiosIntance.get(`/student/addAddress`, formData);

    return resp?.data;
  }
};

export default StudentQuery;
