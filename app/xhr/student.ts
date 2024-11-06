import axiosInstance from "./axiosInstance";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

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
    const token = SecureStore.getItem("userToken");
    const resp = await axios.post(
      `http://172.16.248.178/api/v1/student/addCertification`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return resp?.data;
  },

  addDocument: async (formData: any) => {
    console.log(formData);
    const token = SecureStore.getItem("userToken");
    const resp = await axios.post(
      `http://172.16.248.178:8000/api/v1/student/addDocument`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );

    return resp?.data;
  },

  getAllProgrammes: async () => {
    const resp = await axiosInstance.get(`/student/getAllProgrammes`);

    return resp?.data;
  }
};

export default StudentQuery;
