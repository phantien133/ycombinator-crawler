// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import AccessTime from 'rmdi/lib/AccessTime';
import FavoriteBorder from 'rmdi/lib/FavoriteBorder';
import Comment from 'rmdi/lib/Comment';
import truncate from 'lodash/truncate';

import { breakpoint } from '../../../styles/mixins';

const Container = styled.ul`
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
  color: ${(props) => props.theme.color.grayIcon};
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
  font-size: ${rem('17px')};
`;

const IcoAccessTime = styled(AccessTime)`
  width: ${rem('20px')};
  height: ${rem('20px')};
  margin-left: 3px;
  color: ${(props) => props.theme.color.waterBlue};
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
  justify-content: flex-end;
`;

const ReactList = styled.li`
  padding: 5px 20px;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  font-family: 'HelveticaNeue-UltraLight';
`;

const ReactItem = styled.div`
  font-size: ${rem('15px')};
  font-family: 'HelveticaNeue-UltraLight';
`;

const Items = (props) => {
  const { item = {} } = props;
  const {
    id = 'id id',
    rank = '1',
    title = 'title titletitle titletitle titletitle titletitle titletitle titletitle titletitle titletitle title',
    author = 'author',
    age = 'age age',
    points = 'points points',
    comments = 'comments comments',
    link = 'https://wikihoidap.org/upload/images/Public-la-gi-1.jpg',
    site = 'site site',
    meta: {
      image,
      description,
    } = {
      image: 'https://wikihoidap.org/upload/images/Public-la-gi-1.jpg',
      description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
    },
  } = item;
  return (
    <Container>
      <img src={image} alt={title} />
      <ItemsTitle>
        {`${rank}. ${truncate(title, { length: 80 })}`}
        {
          site && (
            <SiteName>
              (
              {site}
              )
            </SiteName>
          )
        }
      </ItemsTitle>
      <ItemsTime>
        {` by ${author} ${age}`}
        <IcoAccessTime />
      </ItemsTime>
      <ItemsDescription>
        {description && truncate(description, { length: 120 })}
      </ItemsDescription>
      <ReactList>
        <ReactItem>
          {points}
          <FavoriteBorderIco />
        </ReactItem>
        <ReactItem>
          {comments}
          <CommentIco />
        </ReactItem>
      </ReactList>
    </Container>
  );
};

export default Items;
