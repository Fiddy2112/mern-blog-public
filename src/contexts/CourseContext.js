import { createContext, useReducer } from "react";
import { courseReducer } from "../reducers/courseReducer";
import axios from "axios";
import { apiURL } from "./constants";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  //State
  const [courseState, dispatch] = useReducer(courseReducer, {
    courses: [],
    coursesLoading: false,
  });

  //Get all courses
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiURL}/courses`);
      if (response.data.success) {
        dispatch({
          type: "COURSES_SUCCESS",
          payload: response.data.courses,
        });
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: "Server error!" };
    }
  };

  // Course Context Data
  const courseContextData = (courseState, getCourse);

  return (
    <CourseContextProvider value={courseContextData}>
      {children}
    </CourseContextProvider>
  );
};

export default CourseContextProvider;
