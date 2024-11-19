import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";
import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

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
  deleteTertiaryEducation: async (id: string) => {
    const resp = await axiosInstance.delete(
      `/student/deleteTertiaryEducation/${id}`
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
    const resp = await axios.post(
      // `http://102.37.220.209:8000/api/v1/student/addCertification`,
      `https://career-portal-api.fasset.org.za/api/v1/student/addCertification`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await getToken()}`
        }
      }
    );
    return resp?.data;
  },

  deleteCertification: async (id: string) => {
    const resp = await axiosInstance.delete(`/student/deleteCertificate/${id}`);

    return resp?.data;
  },

  addDocument: async (formData: any) => {
    // const token = SecureStore.getItem("userToken");
    const resp = await axios.post(
      // `http://102.37.220.209:8000/api/v1/student/addDocument`,
      `https://career-portal-api.fasset.org.za/api/v1/student/addDocument`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await getToken()}`
        }
      }
    );

    return resp?.data;
  },

  getAllProgrammes: async () => {
    const resp = await axiosInstance.get(`/student/getAllProgrammes`, {});

    return resp?.data;
  },
  saveLearnerProgrammes: async (formData: any) => {
    const resp = await axiosInstance.post(
      `/student/saveLearnerProgrammes`,
      formData
    );

    return resp?.data;
  }
};

export default StudentQuery;
