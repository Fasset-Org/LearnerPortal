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
  },
  addBasicEducation: async (formData: any) => {
    const resp = await axiosInstance.post(
      "/student/addBasicEducation",
      formData
    );

    return resp?.data;
  },
  editBasicEducation: async (formData: any) => {
    const resp = await axiosInstance.put(
      `/student/editBasicEducation/${formData.educationId}`,
      formData
    );

    return resp?.data;
  },

  addTertiaryEducation: async (formData: any) => {
    const resp = await axiosInstance.post(
      `/student/addTertiaryEducation`,
      formData
    );

    return resp?.data;
  },

  editTertiaryEducation: async (formData: any) => {
    const resp = await axiosInstance.put(
      `/student/editTertiaryEducation/${formData.tertiaryEducationId}`,
      formData
    );

    return resp?.data;
  },
  addProfessionalSkill: async (formData: any) => {
    const resp = await axiosInstance.post(
      "/student/addProfessionalSkill",
      formData
    );

    return resp?.data;
  },

  deleteProfessionalSkill: async (id: string) => {
    const resp = await axiosInstance.delete(
      `/student/deleteProfessionalSkill/${id}`
    );

    return resp?.data;
  },

  addCertification: async (formData: any) => {
    console.log(formData);
    const resp = await axiosInstance.post(
      `/student/addCertification`,
      formData
    );

    return resp?.data;
  },

  getAllProgrammes: async () => {
    const resp = await axiosInstance.get(`/student/getAllProgrammes`);

    return resp?.data;
  }
};

export default StudentQuery;
