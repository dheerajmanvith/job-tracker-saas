import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const searchJobs = async ({ query, location, page = 1 }) => {
  const response = await API.get("/jobs/search", {
    params: {
      query,
      location,
      page,
    },
  });

  return response.data;
};
