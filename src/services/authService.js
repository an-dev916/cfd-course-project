import axios from "axios";
import { BASE_URL } from "../constants/environments";
import instance from "./axiosInstance";

const authService = {
  login(payload = {}) {
    return instance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return instance.post(`/customer/register`, payload);
  },
  getProfile(token = "") {
    return instance.get(`/customer/profiles`);
  },
  updateProfile(payload = {}) {
    return instance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authService;
