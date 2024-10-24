import axiosIntance from "./axiosInstance";

const StudentQuery = {
  getUserInfo: async () => {
    const resp = await axiosIntance.get(`/auth/isUserLoggedIn`);

    return resp?.data;
  },

  addAddresInfo: async (formData: any) => {
    const resp = await axiosIntance.post(`/student/addAddress`, formData);

    return resp?.data;
  },
  editAddressInfo: async (formData: any) => {
    const resp = await axiosIntance.post(`/student/editAddress/${formData.id}`);

    return resp?.data;
  }
};

export default StudentQuery;
