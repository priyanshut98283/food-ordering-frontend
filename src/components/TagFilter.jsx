import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chip, TextField } from "@material-ui/core";
import { toggleTag } from "../store/filterSlice";
import "../App.css";
const TagFilter = () => {
  const labels = useSelector((state) => state.filters.labels);
  const selectedTags = useSelector((state) => state.filters.selectedTags);
  const dispatch = useDispatch();

  const handleToggleTag = (tagId) => {
    dispatch(toggleTag(tagId));
  };

  return (
    <div className="chip-container">
      <div>
        {labels.map((label) => (
          <Chip
            key={label.id}
            label={label.label}
            color={selectedTags.includes(label.id) ? "primary" : "default"}
            onClick={() => handleToggleTag(label.id)}
            style={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
