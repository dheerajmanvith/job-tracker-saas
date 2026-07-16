import { create } from "zustand";
import { devtools } from "zustand/middleware";
import API from "../services/api";

const useApplicationStore = create(
  devtools(
    (set, get) => ({
      // ============================================
      // State
      // ============================================
      applications: [],
      loading: false,
      error: null,

      filter: "ALL",
      page: 1,
      perPage: 10,

      // ============================================
      // Fetch Applications
      // ============================================
      fetchApplications: async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const response = await API.get("/applications");

          set({
            applications: response.data.applications || [],
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error.response?.data?.error ||
              error.message ||
              "Failed to fetch applications.",
          });
        }
      },

      // ============================================
      // Add Application
      // ============================================
      addApplication: async (applicationData) => {
        set({
          loading: true,
          error: null,
        });

        try {
          await API.post("/applications", applicationData);

          await get().fetchApplications();

          return true;
        } catch (error) {
          set({
            loading: false,
            error:
              error.response?.data?.error ||
              error.message ||
              "Failed to add application.",
          });

          return false;
        }
      },

      // ============================================
      // Update Status
      // ============================================
      updateStatus: async (id, status) => {
        set({ error: null });

        try {
          await API.patch(`/applications/${id}`, {
            status,
          });

          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id
                ? {
                    ...app,
                    status,
                  }
                : app
            ),
          }));

          return true;
        } catch (error) {
          set({
            error:
              error.response?.data?.error ||
              error.message ||
              "Failed to update status.",
          });

          return false;
        }
      },

      // ============================================
      // Delete Application
      // ============================================
      deleteApplication: async (id) => {
        try {
          await API.delete(`/applications/${id}`);

          set((state) => ({
            applications: state.applications.filter(
              (app) => app.id !== id
            ),
          }));

          return true;
        } catch (error) {
          set({
            error:
              error.response?.data?.error ||
              error.message ||
              "Failed to delete application.",
          });

          return false;
        }
      },

      // ============================================
      // Filter
      // ============================================
      setFilter: (filter) =>
        set({
          filter,
          page: 1,
        }),

      // ============================================
      // Pagination
      // ============================================
      setPage: (page) =>
        set({
          page,
        }),

      // ============================================
      // Selectors
      // ============================================
      filteredApplications: () => {
        const { applications, filter } = get();

        if (filter === "ALL") {
          return applications;
        }

        return applications.filter((app) => {
          const status = String(app.status || "")
            .trim()
            .toUpperCase();

          return status === filter.toUpperCase();
        });
      },

      paginatedApplications: () => {
        const filtered = get().filteredApplications();
        const { page, perPage } = get();

        const start = (page - 1) * perPage;
        const end = start + perPage;

        return filtered.slice(start, end);
      },

      totalPages: () => {
        const filtered = get().filteredApplications();

        return Math.max(
          1,
          Math.ceil(filtered.length / get().perPage)
        );
      },

      // ============================================
      // Utilities
      // ============================================
      clearError: () =>
        set({
          error: null,
        }),

      resetStore: () =>
        set({
          applications: [],
          loading: false,
          error: null,
          filter: "ALL",
          page: 1,
          perPage: 10,
        }),
    }),
    {
      name: "ApplicationStore",
    }
  )
);

export default useApplicationStore;