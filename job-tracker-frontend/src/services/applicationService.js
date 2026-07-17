import API from "./api";

// Get all applications
export const getApplications = async () => {
  const response = await API.get("/applications");
  return response.data;
};

// Create a new application
export const createApplication = async (application) => {
  const response = await API.post("/applications", application);
  return response.data;
};

// Update an application
export const updateApplication = async (id, application) => {
  const response = await API.put(`/applications/${id}`, application);
  return response.data;
};

// Delete an application
export const deleteApplication = async (id) => {
  const response = await API.delete(`/applications/${id}`);
  return response.data;
};