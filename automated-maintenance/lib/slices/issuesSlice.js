import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [],
  loading: false,
  error: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    fetchIssuesStart: (state) => {
      state.loading = true;
    },
    fetchIssuesSuccess: (state, action) => {
      state.issues = action.payload;
      state.loading = false;
    },
    fetchIssuesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addIssue: (state, action) => {
      state.issues.push(action.payload);
    },
  },
});

export const { fetchIssuesStart, fetchIssuesSuccess, fetchIssuesFailure, addIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
