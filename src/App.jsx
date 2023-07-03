import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/pathnames";
// import PageLoading from "./Components/PageLoading";
// import PrivateRoute from "./components/PrivateRoute";
// import MainLayout from "./layout/MainLayout";
// import ProfileLayout from "./layout/ProfileLayout";
// import NotFoundPage from "./pages/404";
// import About from "./pages/about";
// import Blog from "./pages/blog";
// import BlogDetail from "./pages/blog-detail";
// import ChangePassword from "./pages/change-password";
// import Contactus from "./Pages/Contactus";
// import CourseDetail from "./pages/course-detail";
// import CourseOrder from "./pages/course-order";
// import Courses from "./pages/courses";
// import HomePage from "./pages/index";
// import PaymentMethod from "./pages/payment-method";
// import Privacy from "./pages/privacy";
// import MyCourses from "./pages/student-profile/MyCourses";
// import MyInfo from "./pages/student-profile/MyInfo";
// import MyPayment from "./pages/student-profile/MyPayment";

const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const ProfileLayout = lazy(() => import("./layout/ProfileLayout"));
const NotFoundPage = lazy(() => import("./pages/404"));
const About = lazy(() => import("./pages/about"));
const Blog = lazy(() => import("./pages/blog"));
const BlogDetail = lazy(() => import("./pages/blog-detail"));
const ChangePassword = lazy(() => import("./pages/change-password"));
const Contactus = lazy(() => import("./Pages/Contactus"));
const CourseDetail = lazy(() => import("./pages/course-detail"));
const CourseOrder = lazy(() => import("./pages/course-order"));
const Courses = lazy(() => import("./pages/courses"));
const HomePage = lazy(() => import("./pages/index"));
const PaymentMethod = lazy(() => import("./pages/payment-method"));
const Privacy = lazy(() => import("./pages/privacy"));
const MyCourses = lazy(() => import("./pages/student-profile/MyCourses"));
const MyInfo = lazy(() => import("./pages/student-profile/MyInfo"));
const MyPayment = lazy(() => import("./pages/student-profile/MyPayment"));
const PageLoading = lazy(() => import("./Components/PageLoading"));

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.BLOG} element={<Blog />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path={PATHS.CONTACT} element={<Contactus />} />
          <Route path={PATHS.COURSE_DETAIL} element={<CourseDetail />} />
          <Route path={PATHS.COURSE_ORDER_DETAIL} element={<CourseOrder />} />
          <Route path={PATHS.COURSES} element={<Courses />} />
          <Route path="payment-method" element={<PaymentMethod />} />
          <Route path={PATHS.PRIVACY} element={<Privacy />} />
          <Route element={<PrivateRoute redirectPath={PATHS.PRIVACY} />}>
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.COURSES} element={<MyCourses />} />
              <Route path={PATHS.PROFILE.PAYMENT} element={<MyPayment />} />
              <Route />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
