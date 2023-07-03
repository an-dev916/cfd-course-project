const COURSES_PATH = "/courses";
const COURSE_ORDER_PATH = "/register";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blogs";

export const PATHS = {
  HOME: "/",
  COURSES: COURSES_PATH,
  COURSE_DETAIL: COURSES_PATH + "/:slug",
  COURSE_ORDER: COURSE_ORDER_PATH,
  COURSE_ORDER_DETAIL: COURSE_ORDER_PATH + "/:slug",
  PROFILE: {
    INDEX: PROFILE_PATH,
    COURSES: PROFILE_PATH + "/my-courses",
    PAYMENT: PROFILE_PATH + "/my-payment",
  },
  ABOUT: "/about",
  BLOG: BLOG_PATH,
  BLOG_DETAIL: BLOG_PATH + "/:slug",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
};
