import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
`;

const upAndDown = keyframes`
  0% { opacity: 0; transform: translateY(0); }
  25% { opacity: 1; transform: translateY(-10px); }
  75% { opacity: 1; transform: translateY(-10px); }
  100% { opacity: 0; transform: translateY(0); }
`;

const Spinner = styled.svg`
  display: block;
  margin: 0 auto;
  fill: black;
  circle {
    animation-name: ${upAndDown};
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(.05, .2, .35, 1);
    animation-iteration-count: infinite;
    &:nth-child(2) {
      animation-delay: .18s;
    }
    &:nth-child(3) {
      animation-delay: .36s;
    }
  }
`;

const LoadingSpinner = () => (
  <LoadingSpinnerWrapper>
    <Spinner width="60" height="20" viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="15" r="4" />
      <circle cx="30" cy="15" r="4" />
      <circle cx="53" cy="15" r="4" />
    </Spinner>
  </LoadingSpinnerWrapper>
);

export default LoadingSpinner;
