import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants/environments";
import { PATHS } from "../constants/pathnames";
import instance from "./axiosInstance";

export const courseService = {
  getCourses(query = "") {
    return instance.get(`${PATHS.COURSES}${query}`);
  },
  getCourseBySlug(slug = "") {
    return instance.get(`${PATHS.COURSES}${slug ? "/" + slug : ""}`);
  },
};
