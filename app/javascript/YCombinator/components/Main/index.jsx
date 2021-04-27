import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import { rem } from 'polished';
import { NavLink } from 'react-router-dom';

import { PageTitle } from '../common';
import { flex } from '../../styles/mixins';
import Routes from './Routes';

const Container = styled.div``;

const Title = styled(PageTitle)`
  color: ${(props) => props.theme.color.slate};
  font-family: 'HelveticaNeue-Medium';
`;

const TitleHeader = styled.div`
  position: relative;
`;

const RightButton = styled(NavLink)`
  border-radius: 100%;
  box-shadow: 2px 2px 4px 0 rgba(40, 60, 80, 0.24), -2px -2px 4px 0 rgba(40, 60, 80, 0.24);
  width: 50px;
  height: 50px;
  color: ${(props) => props.theme.color.white};
  font-size: ${rem('20px')};
  position: absolute;
  right: ${({ right = '30px' }) => right};
  bottom: -25px;
  cursor: pointer;
  ${flex.center};
  background: ${(props) => props.theme.color.grayIcon};
  &.active {
    background: ${(props) => props.theme.color.waterBlue};
  }
`;

const Main = () => (
  <Container>
    <TitleHeader>
      <Title>
        <NavLink to="/">
          YCombinator Hacker News
        </NavLink>
      </Title>
    </TitleHeader>
    <Routes />
  </Container>
);

export default compose(
)(Main);
