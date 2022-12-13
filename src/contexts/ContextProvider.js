import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { courseReducer } from "../reducers/courseReducer.js";
import axios from "axios";
import { apiURL, LOCAL_STORAGE_TOKEN } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();
export const CourseContext = createContext();

const ContextProvider = ({ children }) => {
  //state
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //State course
  const [courseState, dispatch2] = useReducer(courseReducer, {
    slugCourse: null,
    course: null,
    courses: [],
    coursesLoading: true,
  });

  //Authenticated user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
    }

    try {
      const response = await axios.get(`${apiURL}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (e) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { authLoading: false, isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // AUTH LOGIN
  const LoginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, userForm);

      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }

      await loadUser();

      return response.data;
    } catch (err) {
      if (err.response.data) {
        return err.response.data;
      } else {
        return {
          success: false,
          message: err.message,
        };
      }
    }
  };
  // AUTH SIGNUP
  const SignupUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      await loadUser();

      return response.data;
    } catch (err) {
      if (err.response.data) {
        return err.response.data;
      } else {
        return {
          success: false,
          message: err.message,
        };
      }
    }
  };
  // AUTH LOGOUT
  const LogoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // COURSE
  //Get all courses
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiURL}/courses`);
      if (response.data.success) {
        dispatch2({
          type: "COURSES_SUCCESS",
          payload: response.data.courses,
        });
      } else {
        dispatch2({
          type: "COURSES_FAIL",
        });
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: "Server error!" };
    }
  };

  const getCourseLearn = async (courseId) => {
    try {
      const response = await axios.get(`${apiURL}/courses/learn/${courseId}`);
      if (response.data.success) {
        dispatch2({
          type: "COURSE_LEARN",
          payload: response.data.course,
        });
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: "Server error!" };
    }
  };

  //Create newCourse
  const addCourse = async (newCourse) => {
    try {
      const response = await axios.post(`${apiURL}/courses`, newCourse);
      if (response.data.success) {
        dispatch2({
          type: "ADD_COURSE",
          payload: response.data.course,
        });
        return response.data.course;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : {
            success: false,
            message: "Server error!",
          };
    }
  };

  // Find course when user is updating Course
  const findCourse = (courseId) => {
    const course = courseState.courses.find(
      (course) => course._id === courseId
    );
    dispatch2({
      type: "FIND_COURSE",
      payload: course,
    });
  };

  //Update course
  const updateCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `${apiURL}/courses/${updatedCourse._id}`,
        updatedCourse
      );
      if (response.data.success) {
        dispatch2({
          type: "UPDATE_COURSE",
          payload: response.data.course,
        });
        return response.data;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : {
            success: false,
            message: "Server error!",
          };
    }
  };

  //Delete course
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${apiURL}/courses/${courseId}`);
      if (response.data.success) {
        dispatch2({
          type: "DELETE_COURSE",
          payload: courseId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // context data

  const authContext = {
    LoginUser,
    authState,
    SignupUser,
    LogoutUser,
  };

  const courseContext = {
    courseState,
    getCourse,
    addCourse,
    findCourse,
    updateCourse,
    deleteCourse,
    getCourseLearn,
  };

  // Return provider
  return (
    <AuthContext.Provider value={authContext}>
      <CourseContext.Provider value={courseContext}>
        {children}
      </CourseContext.Provider>
    </AuthContext.Provider>
  );
};

export default ContextProvider;
