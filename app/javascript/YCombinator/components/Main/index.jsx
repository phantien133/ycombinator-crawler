import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { PageTitle } from '../common';
import Routes from './Routes';

const Container = styled.div``;

const Title = styled(PageTitle)`
  color: ${(props) => props.theme.color.slate};
  font-family: 'HelveticaNeue-Medium';
`;

const TitleHeader = styled.div`
  position: relative;
`;

const Main = () => (
  <Container>
    <TitleHeader>
      <Title>
        <a href="/">
          YCombinator Hacker News
        </a>
      </Title>
    </TitleHeader>
    <Routes />
  </Container>
);

export default compose(
)(Main);
