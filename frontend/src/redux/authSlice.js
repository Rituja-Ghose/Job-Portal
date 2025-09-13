import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  suggestedJobs: [],
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleSavedJob: (state, action) => {
      const jobIdToToggle = action.payload; // The ID of the job to save/unsave

      // Ensure user and their savedJobs array exist before attempting to modify
      if (state.user) {
        if (!state.user.savedJobs) {
          state.user.savedJobs = []; // Initialize if it doesn't exist
        }

        const isCurrentlySaved = state.user.savedJobs.includes(jobIdToToggle);

        if (isCurrentlySaved) {
          // If the job is currently saved, remove it
          state.user.savedJobs = state.user.savedJobs.filter(
            (id) => id !== jobIdToToggle
          );
        } else {
          // If the job is not saved, add it
          state.user.savedJobs.push(jobIdToToggle);
        }
      }
    },
    setSuggestedJobs: (state, action) => {
      state.suggestedJobs = action.payload;
    },
  },
});

export const { setLoading, setUser, toggleSavedJob, setSuggestedJobs } =
  authSlice.actions;
export default authSlice.reducer;
