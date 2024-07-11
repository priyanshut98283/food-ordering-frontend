import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@material-ui/core";
import {
  updateMealSelection,
  updateDrinkSelection,
  fetchMeals,
} from "../store/mealSlice";
import { selectFilteredItems } from "../store/filterSlice";
import "../App.css";

const MealList = () => {
  const dispatch = useDispatch();
  const filteredItems = useSelector(selectFilteredItems);
  const selectedTags = useSelector((state) => state.filters.selectedTags);
  const mealStatus = useSelector((state) => state.meals.status);
  const error = useSelector((state) => state.meals.error);
  const currentPersonId = useSelector((state) => state.people.currentPersonId);
  const userSelections = useSelector(
    (state) => state.meals.userSelections[currentPersonId] || {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  useEffect(() => {
    if (mealStatus === "idle") {
      dispatch(fetchMeals());
    }
  }, [mealStatus, dispatch]);

  const handleMealSelection = (mealId) => {
    const selected = userSelections[mealId]
      ? userSelections[mealId].selected
      : false;
    dispatch(
      updateMealSelection({
        mealId,
        userId: currentPersonId,
        selected: !selected,
      })
    );
  };

  const handleDrinkSelection = (mealId, drinkId) => {
    const isDrinkSelected =
      userSelections[mealId]?.selectedDrinks?.includes(drinkId) ?? false;
    dispatch(
      updateDrinkSelection({
        mealId,
        userId: currentPersonId,
        drinkId,
        selected: !isDrinkSelected,
      })
    );
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPlaceholderVisible(value === "");
  };

  const filteredMeals = filteredItems.filter((meal) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => meal.labels.includes(tag));
    const matchesSearch = meal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTags && matchesSearch;
  });

  if (mealStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (mealStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="meal-list">
      <TextField
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "95%", marginTop: "2vh" }}
        InputProps={{
          placeholder: isPlaceholderVisible ? "Search meals" : "",
        }}
      />
      {filteredMeals.map((meal) => {
        const isSelected = userSelections[meal.id]
          ? userSelections[meal.id].selected
          : false;
        const selectedDrinks = userSelections[meal.id]?.selectedDrinks || [];

        return (
          <Card
            key={meal.id}
            className={`meal-card ${isSelected ? "selected" : ""}`}
          >
            <CardMedia
              component="img"
              alt={meal.title}
              height="140"
              image={meal.img}
              title={meal.title}
              className="meal-image"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {meal.title}
              </Typography>
              <Typography color="textSecondary">
                Starter: {meal.starter}
              </Typography>
              <Typography color="textSecondary">
                Dessert: {meal.dessert}
              </Typography>
              <Typography variant="body2" component="p">
                Price: ${meal.price.toFixed(2)}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleMealSelection(meal.id)}
                    />
                  }
                  label="Select Meal"
                />
                {isSelected && meal.drinks && (
                  <>
                    <Typography variant="h6" component="p">
                      Add Drinks
                    </Typography>
                    {meal.drinks.map((drink) => (
                      <FormControlLabel
                        key={drink.id}
                        control={
                          <Checkbox
                            checked={selectedDrinks.includes(drink.id)}
                            onChange={() =>
                              handleDrinkSelection(meal.id, drink.id)
                            }
                          />
                        }
                        label={`${drink.title} ($${drink.price.toFixed(2)})`}
                      />
                    ))}
                  </>
                )}
              </FormGroup>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MealList;
