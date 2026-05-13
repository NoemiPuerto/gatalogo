import { createSlice } from "@reduxjs/toolkit";

const adoptionSlice = createSlice({
  name: "adoption",
  initialState: { interestedCatIds: [], favoriteCatIds: [] },
  reducers: {
    likeCat(state, action) {
      if (!state.interestedCatIds.includes(action.payload)) state.interestedCatIds.push(action.payload);
    },
    favoriteCat(state, action) {
      if (!state.favoriteCatIds.includes(action.payload)) state.favoriteCatIds.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favoriteCatIds = state.favoriteCatIds.filter((id) => id !== action.payload);
    },
  },
});

export const { likeCat, favoriteCat, removeFavorite } = adoptionSlice.actions;
export default adoptionSlice.reducer;
