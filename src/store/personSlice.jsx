import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [
    { id: "person1", name: "Priyanshu", selectedMeals: [] },
    { id: "person2", name: "Krishna", selectedMeals: [] },
    { id: "person3", name: "Achyuta", selectedMeals: [] },
    { id: "person4", name: "Anand", selectedMeals: [] },
  ],
  currentPersonId: "person1",
};

const personSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    selectPerson(state, action) {
      state.currentPersonId = action.payload;
    },
    toggleMealSelection(state, action) {
      const { mealId } = action.payload;
      const currentPerson = state.people.find(
        (person) => person.id === state.currentPersonId
      );
      if (currentPerson.selectedMeals.includes(mealId)) {
        currentPerson.selectedMeals = currentPerson.selectedMeals.filter(
          (id) => id !== mealId
        );
      } else {
        currentPerson.selectedMeals.push(mealId);
      }
    },
  },
});

export const { selectPerson, toggleMealSelection } = personSlice.actions;
export default personSlice.reducer;
