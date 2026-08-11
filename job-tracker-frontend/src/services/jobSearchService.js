import API from "./api";

export async function searchJobs(query, page = 1) {
  const response = await API.get("/jobs/search", {
    params: {
      q: query,
      page,
    },
  });

  return response.data;
}