import React from "react";

const Alert = ({ alert }) => (
  <div style={{ height: "50px" }}>
    {alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{alert.type}</strong>: {alert.message}
      </div>
    )}
  </div>
);

export default Alert;
