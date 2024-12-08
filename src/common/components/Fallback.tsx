import React from "react";

interface FallbackProps {
  message: string;
}

const Fallback: React.FC<FallbackProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default Fallback;
