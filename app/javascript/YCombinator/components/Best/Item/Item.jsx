import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import AccessTime from 'rmdi/lib/AccessTime';
import FavoriteBorder from 'rmdi/lib/FavoriteBorder';
import Comment from 'rmdi/lib/Comment';
import truncate from 'lodash/truncate';
import isEmpty from 'lodash/isEmpty';
import QueryString from 'query-string';

import { HackerNews, FallbackImg } from '../../../styles/images';
import { breakpoint } from '../../../styles/mixins';

const Container = styled.ul`
  cursor: pointer;
  margin: 8px;
  background: ${(props) => props.theme.color.white};
  box-shadow: 0 1px 2px 0 rgba(40, 60, 80, 0.24), 0 -1px 2px 0 rgba(40, 60, 80, 0.12);
  min-width: 250px;
  ${breakpoint.xs`
    flex: 1;
    width: 30%;
  `}
`;

const ItemsTitle = styled.li`
  font-family: 'HelveticaNeue-UltraLight';
  padding: 20px 20px 10px;
  color: ${(props) => props.theme.color.darkGreyBlue};
  font-size: ${rem('20px')};
  font-weight: bold;
  word-wrap: break-word;
`;
const SiteName = styled.span`
  color: ${(props) => props.theme.color.waterBlue};
  font-size: ${rem('15px')};
`;

const ItemsDescription = styled.li`
  font-family: 'HelveticaNeue-Medium';
  padding: 5px 10px 5px;
  text-overflow: ellipsis;
  position: relative;
  max-height: 5em;
  text-align: justify;
  margin-bottom: 5px;
  font-size: ${rem('13px')};
`;

const IcoAccessTime = styled(AccessTime)`
  width: ${rem('20px')};
  height: ${rem('20px')};
  margin-left: 3px;
  color: ${(props) => props.theme.color.grayIcon};
  margin-right: 6px;
  float: right;
`;

const styleIcon = css`
  width: ${rem('20px')};
  height: ${rem('20px')};
  margin-left: 3px;
  margin-right: 6px;
  float: right;
`;

const FavoriteBorderIco = styled(FavoriteBorder)`
  ${styleIcon};
`;

const CommentIco = styled(Comment)`
  ${styleIcon};
`;

const ItemsTime = styled.li`
  padding: 5px 10px;
  color: ${(props) => props.theme.color.grayIcon};
  font-size: ${rem('15px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StateItem = styled.div`
  font-size: ${rem('15px')};
  font-family: 'HelveticaNeue-UltraLight';
`;

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-top: 10px;
  margin-right: auto;
  width: 90%;
  max-height: 50%;
  min-height: 40%;
  background-image: url(${FallbackImg});
  background-size: cover;
`;

const Items = (props) => {
  const { item = {} } = props;
  const {
    id,
    rank,
    title,
    author,
    age,
    points,
    comments,
    link,
    site,
    meta: {
      image,
      description = '',
      content,
    } = {},
  } = item;
  return (
    <Container onClick={() => {
      let targetUrl = link;
      if (!isEmpty(content)) {
        targetUrl = `/details/${id}?${QueryString.stringify({ link })}`;
      }
      window.open(targetUrl, '_blank');
    }}
    >
      <Image src={image || HackerNews} alt={title} />
      <ItemsTitle>
        {`${rank}. ${truncate(title, { length: 60 })}`}
        {
          site && (
            <SiteName>
              {' '}
              (
              {site}
              )
            </SiteName>
          )
        }
      </ItemsTitle>
      <ItemsTime>
        <StateItem>
          {points.replace('points', '')}
          <FavoriteBorderIco />
        </StateItem>
        <StateItem>
          {comments.replace('comments', '')}
          <CommentIco />
        </StateItem>
        <StateItem>
          {` by ${author} ${age}`}
          <IcoAccessTime />
        </StateItem>
      </ItemsTime>
      <ItemsDescription>
        {description && truncate(description, { length: 80 })}
      </ItemsDescription>
    </Container>
  );
};

export default Items;
