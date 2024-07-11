import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#7209b7",
      color: "white",
      padding: "15px 0",
      textAlign: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: 20,
    },
    footerContent: {
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
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <span>Made with ❤️ by P.T.</span>
        <span>Copyright &copy; 2024 Allo Health, All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
