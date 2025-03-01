import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function LoadingSpinner() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;