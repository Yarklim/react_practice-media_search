import React from 'react';

const Button = ({ type, method, children }) => {
  return (
    <button type={type} onClick={method || null}>
      {children}
    </button>
  );
};

export default Button;
