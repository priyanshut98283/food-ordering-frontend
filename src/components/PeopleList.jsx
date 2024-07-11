import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPerson } from "../store/personSlice";
import "../App.css";

const PeopleList = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const currentPersonId = useSelector((state) => state.people.currentPersonId);

  const handleButtonClick = (personId) => {
    dispatch(selectPerson(personId));
  };

  return (
    <div className="people-list-container">
      <h2 className="people-list-title">Select a Person</h2>
      {people.map((person) => (
        <button
          key={person.id}
          onClick={() => handleButtonClick(person.id)}
          className={
            person.id === currentPersonId ? "selected-button" : "normal-button"
          }
        >
          {person.name}
        </button>
      ))}
    </div>
  );
};

export default PeopleList;
