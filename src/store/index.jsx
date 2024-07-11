// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice';
import mealReducer from './mealSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    people: personReducer,
    meals: mealReducer,
    filters: filterReducer,
  },
});

export default store;
