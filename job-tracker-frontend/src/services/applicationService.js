import API from "./api";

export const createApplication = async (application) => {
  const response = await API.post("/applications", application);
  return response.data;
};

export const getApplications = async () => {
  const response = await API.get("/applications");
  return response.data;
};