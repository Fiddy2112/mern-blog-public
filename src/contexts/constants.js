export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://mern-blog-api.onrender.com";

export const LOCAL_STORAGE_TOKEN = "localStorageToken";
