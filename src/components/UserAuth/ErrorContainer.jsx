import React from "react";

const ErrorContainer = ({ errorMessage, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-red-500 bg-opacity-90 text-white rounded">
      <p>{errorMessage}</p>
      <button
        onClick={onClose}
        className="mt-2 px-3 py-1 bg-white text-red-500 rounded block mx-auto"
      >
        Cerrar
      </button>
    </div>
  );
};

export default ErrorContainer;
