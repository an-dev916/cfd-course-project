import { BASE_URL } from "../constants/environments";
import { PATHS } from "../constants/pathnames";
import instance from "./axiosInstance";

export const blogService = {
  getBlogs(query = "") {
    return instance.get(`${PATHS.BLOG}${query}`);
  },
  getBlogBySlug(slug = "") {
    return instance.get(`${PATHS.BLOG}${slug ? "/" + slug : ""}`);
  },
  getBlogsCate(query) {
    return instance.get(`/blog-categories${query}`);
  },
  getBlogsCateBySlug(slug = "") {
    return instance.get(`/blog-categories${slug ? "/" + slug : ""}`);
  },
};
