import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumeData: null,
  },
  reducers: {
    //actions
    setResumeData: (state, action) => {
      state.resumeData = action.payload;
    },
  },
});

export const { setResumeData } = resumeSlice.actions;
export default resumeSlice.reducer;
