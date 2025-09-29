import React from "react";

const LoadingSpinner = ({ fullPage = false }) => {
    const style = fullPage
        ? {
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          }
        : {
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
          };

    return (
        <div style={style}>
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
