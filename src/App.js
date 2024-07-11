import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography } from '@material-ui/core';
import MealList from './components/MealList';
import TagFilter from './components/TagFilter';
import SelectedMealsSummary from './components/SelectedMealsSummary';
import { useDispatch } from 'react-redux';
import { setMeals } from './store/mealSlice';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollButton from './components/Scroll';
import PeopleList from './components/PeopleList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/meals');
        dispatch(setMeals(response.data));
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <PeopleList/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TagFilter />
          <MealList />
        </Grid>
        <Grid item xs={12} md={3}>
          <SelectedMealsSummary />
        </Grid>
      </Grid>
      <ScrollButton />
      <Footer />
    </Container>
  );
};

export default App;
