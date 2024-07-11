// components/SelectedMealsSummary.js
import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "../App.css";

const SelectedMealsSummary = () => {
  const filteredItems = useSelector((state) => state.meals.meals);
  const currentPersonId = useSelector((state) => state.people.currentPersonId);
  const userSelections = useSelector(
    (state) => state.meals.userSelections[currentPersonId] || {}
  );

  const selectedMeals = filteredItems.filter(
    (meal) => userSelections[meal.id]?.selected
  );

  const totalPrice = selectedMeals.reduce((total, meal) => {
    let mealTotal = meal.price;
    if (
      userSelections[meal.id]?.selectedDrinks &&
      userSelections[meal.id].selectedDrinks.length > 0
    ) {
      mealTotal += userSelections[meal.id].selectedDrinks.reduce(
        (drinkTotal, drinkId) => {
          const drink = meal.drinks.find((d) => d.id === drinkId);
          return drinkTotal + (drink ? drink.price : 0);
        },
        0
      );
    }
    return total + mealTotal;
  }, 0);

  return (
    <Card
      className="selected-meals-summary"
      style={{ marginRight: "5%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Selected Meals Summary
        </Typography>
        <List>
          {selectedMeals.map((meal) => (
            <ListItem key={meal.id}>
              <ListItemText
                primary={meal.title}
                secondary={`Price: $${meal.price.toFixed(2)}${
                  userSelections[meal.id]?.selectedDrinks &&
                  userSelections[meal.id].selectedDrinks.length > 0
                    ? ", Drinks: " +
                      userSelections[meal.id].selectedDrinks
                        .map((drinkId) => {
                          const drink = meal.drinks.find(
                            (d) => d.id === drinkId
                          );
                          return drink
                            ? `${drink.title} ($${drink.price.toFixed(2)})`
                            : "";
                        })
                        .join(", ")
                    : ""
                }`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" component="p">
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SelectedMealsSummary;
