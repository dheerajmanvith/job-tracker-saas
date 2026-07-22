import API from "../services/api";
import { toast } from "sonner";

const setupAxiosInterceptors = () => {
  API.interceptors.response.use(
    (response) => response,

    (error) => {
      const status = error.response?.status;

      switch (status) {
        case 400:
          toast.error("Bad request.");
          break;

        case 401:
          toast.error("Unauthorized. Please log in again.");
          break;

        case 403:
          toast.error("You don't have permission to perform this action.");
          break;

        case 404:
          toast.error("Requested resource not found.");
          break;

        case 500:
          toast.error("Server error. Redirecting...");
          window.location.href = "/500";
          break;

        default:
          toast.error(
            error.response?.data?.message ||
              "Something went wrong."
          );
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;