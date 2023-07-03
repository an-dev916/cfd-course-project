import axios from "axios";
import { BASE_URL } from "../constants/environments";
import instance from "./axiosInstance";

const orderService = {
  getMyCourses(token = "") {
    return instance.get(`/orders/courses/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getMyPayments(token = "") {
    return instance.get(`/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  orderCourse(payload = {}) {
    return instance.post("/orders", payload);
  },
};

export default orderService;
