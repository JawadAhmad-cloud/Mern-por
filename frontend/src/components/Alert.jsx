import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

const Alert = () => {
  const { alert, clearAlert } = useContext(AlertContext);
  if (!alert) return null;

  const className = `alert alert-${alert.type} alert-dismissible fade show`;

  return (
    <div className="container mt-3">
      <div className={className} role="alert">
        {alert.message}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={clearAlert}
        ></button>
      </div>
    </div>
  );
};

export default Alert;
