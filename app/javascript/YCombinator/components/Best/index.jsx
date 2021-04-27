import React, { useEffect } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import { compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';

import { rem } from 'polished';
import { breakpoint } from '../../styles/mixins';
import Item from './Item';
import LoadingSpinner from '../common/LoadingSpinner';
import { newsSelector } from '../../selectors/newsSelector';
import withHooks from '../../utils/withHooks';
import { fetchNews } from '../../actions/newsActions';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 30px 8px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  list-style-type: none;
  margin: 0 100px;
  ${breakpoint.xs`
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `}
`;

const Link = styled.a`
  color: ${(props) => props.theme.color.darkGreyBlue};
  font-size: ${rem('30px')};
  &:hover {
    opacity: 1;
    color: props.theme.color.warmGreyFive;
  }
`;

const Loading = () => (
  <Container>
    <LoadingSpinner />
  </Container>
);

const Best = ({
  news = [], page = 1, more, ...props
}) => (
  <>
    <ListItem {...props}>
      {((news || []).length === 0 && 'Empty list') || map(news || [], (item) => <Item item={item} key={item.id} />)}
    </ListItem>
    <Container>
      {more && <Link href={`/page/${parseInt(page || '1', 10) + 1}`}>More</Link>}
    </Container>
  </>
);

export default compose(
  connect(newsSelector, { fetchNews }),
  withHooks(({ match: { params: { page = 1 } }, fetchNews: fetch }) => {
    useEffect(() => {
      fetch(page);
    }, []);
  }),
  branch(
    ({ isLoading }) => isLoading,
    renderComponent(Loading),
  ),
)(Best);
