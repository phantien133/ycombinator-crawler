/* eslint-disable react/no-danger */
import React from 'react';

import truncate from 'lodash/truncate';
import isEmpty from 'lodash/isEmpty';
import QueryString from 'query-string';

import { HackerNews } from '../../styles/images';
import {
  Container,
  ItemsTitle,
  SiteName,
  ItemsDescription,
  IcoAccessTime,
  FavoriteBorderIco,
  CommentIco,
  ItemsTime,
  StateItem,
  Image,
} from './components';

export const Items = (props) => {
  const { item = {}, preview = false } = props;
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
        targetUrl = `/preview/${id}?${QueryString.stringify({ link })}`;
      }
      window.open(targetUrl, '_blank');
    }}
    >
      <Image src={image || HackerNews} alt={title} />
      <ItemsTitle>
        {`${rank && `${rank}. `}${title && truncate(title, { length: 60 })}`}
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
        {
          // eslint-disable-next-line react/no-danger
          preview ? <div dangerouslySetInnerHTML={{ __html: content }} /> : (
            description && truncate(description, { length: 80 })
          )
        }
      </ItemsDescription>
    </Container>
  );
};

export const PreviewItems = (props) => {
  const {
    item: {
      title,
      image,
      content,
    } = {},
    link,
  } = props;
  return (
    <Container onClick={() => {
      window.open(link, '_blank');
    }}
    >
      <Image src={image || HackerNews} alt={title} />
      <ItemsTitle>
        {title}
      </ItemsTitle>
      <ItemsDescription>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ItemsDescription>
    </Container>
  );
};

export default Items;
