import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  labels: [
    { id: "vegetarian wraps", label: "vegetarian wraps" },
    { id: "pizza", label: "pizza" },
    { id: "drinks", label: "drinks" },
    { id: "burgers", label: "burgers" },
    { id: "pasta", label: "pasta" },
    { id: "tikka", label: "tikka" },
    { id: "curry", label: "curry" },
    { id: "sandwich", label: "sandwich" },
    { id: "salads", label: "salads" },
  ],
  selectedTags: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleTag(state, action) {
      const tagId = action.payload;
      if (state.selectedTags.includes(tagId)) {
        state.selectedTags = state.selectedTags.filter((tag) => tag !== tagId);
      } else {
        state.selectedTags.push(tagId);
      }
    },
  },
});

export const { toggleTag } = filterSlice.actions;
export default filterSlice.reducer;

export const selectFilteredItems = createSelector(
  [(state) => state.meals.meals, (state) => state.filters.selectedTags],
  (meals, selectedTags) => {
    if (selectedTags.length === 0) {
      return meals;
    }
    return meals.filter((meal) =>
      selectedTags.some((tag) => meal.labels.includes(tag))
    );
  }
);
