import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success", timeout = 3000) => {
    setAlert({ message, type });
    if (timeout) {
      setTimeout(() => {
        setAlert(null);
      }, timeout);
    }
  };

  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
