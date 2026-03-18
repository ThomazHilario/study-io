import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_STUDY_IO_API,
});
