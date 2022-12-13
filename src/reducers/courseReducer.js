export const courseReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "COURSES_SUCCESS":
      return {
        ...state,
        courses: payload,
        coursesLoading: false,
      };

    case "COURSES_FAIL":
      return {
        ...state,
        courses: [],
        coursesLoading: false,
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, payload],
        coursesLoading: false,
      };

    case "COURSE_LEARN":
      return {
        ...state,
        course: state.courses.filter((course) => course._id !== payload),
      };

    case "FIND_COURSE":
      return {
        ...state,
        course: payload,
      };

    case "UPDATE_COURSE":
      const newCourses = state.courses.map((course) => {
        if (course._id === payload._id) return payload;
        return course;
      });
      return {
        ...state,
        courses: newCourses,
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
      };
    default:
      return state;
  }
};
