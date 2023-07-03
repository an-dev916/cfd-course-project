import axios from "axios";
import { BASE_URL } from "../constants/environments";
import instance from "./axiosInstance";

export const teamsService = {
  getTeams(query = "") {
    return instance.get(`/teams${query}`);
  },
};
