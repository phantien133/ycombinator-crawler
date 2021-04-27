import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { compose, defaultProps } from 'recompose';
import { rem } from 'polished';

import { flex } from '../styles/mixins';
import { ImgWrong } from '../styles/images';

const ErrorWrap = styled.div`
  background: linear-gradient(70deg, #002036 50%, #0c304a 50%);
  min-height: 100vh;
  ${flex.center};
  flex-direction: column;
`;

const KeyFrameLoad = keyframes`
  0% {
    width: 0;
    left: 50%;
    opacity: 1;
  }
  90% {
    width: 100%;
    left: 0%;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
`;

const ErrorContent = styled.div`
`;

const ErrorText = styled.h2`
  font-size: ${rem('26px')};
  color: ${(props) => props.theme.color.white};
  padding: 20px 10px;
`;

const LinkTop = styled.a`
  position: relative;
  z-index: 2;
  color: ${(props) => props.theme.color.white};
  padding: 10px 0 20px;
  font-size: ${rem('16px')};
  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.color.darkGreyBlue};
  }
`;

const Loading = styled.div`
  display: block;
  width: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.white};
  position: relative;
  background-color: transparent;
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    height: 5px;
    width: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.white};
    top: 50%;
    left: 0;
    animation: ${KeyFrameLoad} 1s linear infinite;
  }
  &:after {
    animation-delay: -0.3s;
  }
`;
const ImgError = styled.img.attrs({
  src: ImgWrong,
})`
  max-width: 100%;
`;

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children, errorMessage } = this.props;
    const { hasError } = this.state;
    return hasError
      ? (
        <ErrorWrap>
          <ErrorContent>
            <ImgError />
          </ErrorContent>
          <ErrorText>
            Oh no...
            {errorMessage}
          </ErrorText>
          <LinkTop to="#">Back to previous</LinkTop>
          <Loading />
        </ErrorWrap>
      )
      : children;
  }
}

export default compose(
  defaultProps({
    errorMessage: 'Something went wrong!',
  }),
)(ErrorBoundary);
