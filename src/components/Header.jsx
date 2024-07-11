import React from "react";

const Header = () => {
  const styles = {
    header: {
      backgroundColor: "#7209b7",
      color: "white",
      padding: "15px 0",
      textAlign: "center",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 20,
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    span: {
      display: "block",
    },
    i: {
      fontSize: "1.2em",
      margin: "0 5px",
    },
    lastSpan: {
      marginTop: "5px",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <img
            src="/allohealth.png"
            alt="Menu Icon"
            style={{ width: "60px", height: "60px", marginLeft: "20px" }}
          />
          <h1 className="text-center text-white flex-grow-1 m-0">
            Food Ordering System
          </h1>
          <div className="d-flex align-items-center">
            <i className="fas fa-sign-in-alt fa-2x text-orange"></i>
            <span className="mx-1 text-orange fw-bold">Sign In</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
