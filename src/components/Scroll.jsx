import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import "../App.css";

const ScrollButton = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsTop(scrollTop < windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (isTop) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  return (
    <div className="scroll-button" style={{ marginBottom: "3%" }}>
      <Fab
        color="primary"
        aria-label={isTop ? "Scroll to bottom" : "Scroll to top"}
        onClick={handleClick}
        className={isTop ? "to-bottom" : "to-top"}
      >
        {isTop ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </Fab>
    </div>
  );
};

export default ScrollButton;
