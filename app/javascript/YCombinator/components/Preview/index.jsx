/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { mapProps } from 'recompose';
import styled from 'styled-components';

import { rem } from 'polished';
import { isEmpty } from 'lodash';
import { fetchNew } from '../../actions/newsActions';
import { newSelector } from '../../selectors/newsSelector';
import withHooks from '../../utils/withHooks';
import searchQuery from '../../utils/searchQuery';

import {
  Container,
  ItemsTitle,
  Image,
  SiteName,
} from '../Item/components';
import { HackerNews } from '../../styles/images';

const Banner = styled(Image)`
  max-height: 30%;
  max-width: 60%;
  min-width: 20%;
  min-height: 10%;
`;

const Title = styled(ItemsTitle)`
  text-align: center;
  font-size: ${rem('30px')};
`;

const Content = styled.li`
  font-family: 'HelveticaNeue-Medium';
  padding: 5px 10px 5px;
  text-overflow: ellipsis;
  position: relative;
  text-align: justify;
  margin-bottom: 5px;
  font-size: ${rem('20px')};
`;

const ReadMore = styled(SiteName)`
  float: right;
`;

const PreviewItems = (props) => {
  const {
    item: {
      title,
      image,
      content,
      loaded,
    } = {},
    link,
  } = props;
  if (loaded && isEmpty(content)) {
    window.open(link);
  }
  return (
    <Container onClick={() => {
      window.open(link, '_blank');
    }}
    >
      <Title>
        {title}
        <br />
        <ReadMore>
          <a href={link}>Read more</a>
        </ReadMore>
      </Title>
      <Banner src={image || HackerNews} alt={title} />
      <Content>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Content>
    </Container>
  );
};

export default compose(
  connect(newSelector, { fetchNew }),
  mapProps((props) => ({
    ...props,
    id: props.match.params.id,
    link: (searchQuery(props) || {}).link,
  })),
  withHooks((props) => {
    const { id, fetchNew: fetch, link } = props;
    useEffect(() => {
      fetch({ id, link });
    }, []);
  }),
)(PreviewItems);
