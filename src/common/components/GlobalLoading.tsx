import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface GlobalLoadingProps {
  delay?: number; // Delay in milliseconds before showing loader
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  transition: opacity 0.5s ease;
  animation: ${({ show }) => (show ? fadeIn : "none")} 0.5s ease;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db; /* Theme color */
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ delay = 300 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [delay]);

  return (
    <LoadingOverlay show={show}>
      <Spinner />
    </LoadingOverlay>
  );
};

export default GlobalLoading;
