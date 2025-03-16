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
      const newIssue = {
        id: state.issues.length + 1, // Assigning a temporary ID
        labNo: action.payload.labNo,
        deviceId: action.payload.deviceId,
        deviceType: action.payload.deviceType,
        details: action.payload.details,
        recurring: action.payload.recurring,
        facultyLabIncharge: action.payload.facultyLabIncharge,
        status: "pending", // Default status
      };
      state.issues.push(newIssue);
    },
    updateIssueStatus: (state, action) => {
      const { id, status } = action.payload;
      const issue = state.issues.find((issue) => issue.id === id);
      if (issue) {
        issue.status = status;
      }
    },
  },
});

export const { fetchIssuesStart, fetchIssuesSuccess, fetchIssuesFailure, addIssue, updateIssueStatus } = issuesSlice.actions;
export default issuesSlice.reducer;
