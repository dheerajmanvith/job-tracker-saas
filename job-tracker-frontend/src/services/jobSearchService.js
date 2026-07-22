import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/jobs";

export const searchJobs = async ({
  query = "",
  location = "",
}) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      query,
      location,
    },
  });

  return response.data;
};