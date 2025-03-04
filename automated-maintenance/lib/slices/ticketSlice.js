import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    fetchTicketsStart: (state) => {
      state.loading = true;
    },
    fetchTicketsSuccess: (state, action) => {
      state.tickets = action.payload;
      state.loading = false;
    },
    fetchTicketsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTicketStatus: (state, action) => {
      const { id, status } = action.payload;
      const ticket = state.tickets.find((t) => t.id === id);
      if (ticket) {
        ticket.status = status;
      }
    },
  },
});

export const { fetchTicketsStart, fetchTicketsSuccess, fetchTicketsFailure, updateTicketStatus } = ticketsSlice.actions;
export default ticketsSlice.reducer;
