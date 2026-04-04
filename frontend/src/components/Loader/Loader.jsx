
import React from "react";
import logo from "../../assets/images/MarqueAnimastion.gif";

const Loader = ({ fadeOut }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <img
        src={logo}
        alt="Loading..."
        style={{
          width: "150px",
          maxWidth: "80%",
        }}
      />
    </div>
  );
};

export default Loader;