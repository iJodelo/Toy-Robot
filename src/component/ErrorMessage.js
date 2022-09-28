import React from "react";

const ErrorMessage = ({ text }) => {
  return text ? (
    <div className="error-message" data-testid="error-message-container">
      {text}
    </div>
  ) : null;
};

export default ErrorMessage;
