import axios from "axios";
import { BASE_URL } from "../constants/environments";
import instance from "./axiosInstance";

export const subscribesService = {
  subscribes(payload = {}) {
    return instance.post("/subscribes", payload);
  },
};
