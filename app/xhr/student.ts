import axiosInstance from "./axiosInstance";

const StudentQuery = {
  getUserInfo: async () => {
    const resp = await axiosInstance.get(`/auth/isUserLoggedIn`);

    return resp?.data;
  },

  editBasicInfo: async (formData: any) => {
    const resp = await axiosInstance.put(
      `/student/editBasicInformation/${formData.id}`,
      formData
    );

    return resp?.data;
  },

  addAddresInfo: async (formData: any) => {
    const resp = await axiosInstance.post(`/student/addAddress`, formData);

    return resp?.data;
  },
  editAddressInfo: async (formData: any) => {
    const resp = await axiosInstance.put(
      `/student/editAddress/${formData.id}`,
      formData
    );

    return resp?.data;
  }
};

export default StudentQuery;
