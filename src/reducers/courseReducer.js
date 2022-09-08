export const courseReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "COURSES_SUCCESS":
      return {
        ...state,
        courses: payload,
        coursesLoading: false,
      };

    default:
      return state;
  }
};
