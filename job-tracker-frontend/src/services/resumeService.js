import api from "./api";

// Upload Resume
export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return response.data;
};

// Get Resume
export const getResume = async () => {
  const response = await api.get("/resume");
  return response.data;
};

// Delete Resume
export const deleteResume = async () => {
  const response = await api.delete("/resume");
  return response.data;
};