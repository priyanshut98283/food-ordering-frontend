import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await axios.get("https://food-ordering-backend-jyiy.onrender.com/api/meals");
  return response.data;
});

export const updateMealSelection = createAsyncThunk(
  "meals/updateMealSelection",
  async ({ mealId, userId, selected }) => {
    await axios.post("https://food-ordering-backend-jyiy.onrender.com/api/updateMealSelection", {
      mealId,
      userId,
      selected,
    });
    return { mealId, userId, selected };
  }
);

export const updateDrinkSelection = createAsyncThunk(
  "meals/updateDrinkSelection",
  async ({ mealId, userId, drinkId, selected }) => {
    // await axios.post("http://localhost:5000/api/updateDrinkSelection", {
       await axios.post("https://food-ordering-backend-jyiy.onrender.com/api/updateDrinkSelection", {
      mealId,
      userId,
      drinkId,
      selected,
    });
    return { mealId, userId, drinkId, selected };
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    status: "idle",
    error: null,
    userSelections: {},
  },
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMealSelection.fulfilled, (state, action) => {
        const { mealId, userId, selected } = action.payload;
        if (!state.userSelections[userId]) {
          state.userSelections[userId] = {};
        }
        state.userSelections[userId][mealId] = {
          ...state.userSelections[userId][mealId],
          selected,
        };
      })
      .addCase(updateDrinkSelection.fulfilled, (state, action) => {
        const { mealId, userId, drinkId, selected } = action.payload;
        if (!state.userSelections[userId]) {
          state.userSelections[userId] = {};
        }
        const selectedDrinks =
          state.userSelections[userId][mealId]?.selectedDrinks || [];
        if (selected) {
          selectedDrinks.push(drinkId);
        } else {
          const index = selectedDrinks.indexOf(drinkId);
          if (index > -1) {
            selectedDrinks.splice(index, 1);
          }
        }
        state.userSelections[userId][mealId] = {
          ...state.userSelections[userId][mealId],
          selectedDrinks,
        };
      });
  },
});

export const { setMeals } = mealsSlice.actions;

export default mealsSlice.reducer;
