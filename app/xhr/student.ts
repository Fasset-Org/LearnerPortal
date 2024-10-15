import axiosIntance from "./axiosInstance";

const StudentQuery = {
  getUserInfo: async () => {
    const resp = await axiosIntance.get(`/auth/isUserLoggedIn`);

    return resp?.data;
  }
};

export default StudentQuery;
