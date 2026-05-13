import { createSlice } from "@reduxjs/toolkit";

const adoptionSlice = createSlice({
  name: "adoption",
  initialState: { interestedCatIds: [] },
  reducers: {
    likeCat(state, action) {
      if (!state.interestedCatIds.includes(action.payload)) state.interestedCatIds.push(action.payload);
    },
  },
});

export const { likeCat } = adoptionSlice.actions;
export default adoptionSlice.reducer;
