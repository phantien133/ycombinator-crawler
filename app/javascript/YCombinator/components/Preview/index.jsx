import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Item from '../Item';
import { fetchNew } from '../../actions/newsActions';
import { newSelector } from '../../selectors/newsSelector';
import withHooks from '../../utils/withHooks';
import searchQuery from '../../utils/searchQuery';

const Preview = (props) => {
  const { item = {} } = props;
  const {
    id = 'id',
    rank = 'rank',
    title = 'title',
    author = 'author',
    age = 'age',
    points = 'points',
    comments = 'comments',
    link = 'link',
    site = 'site',
    meta: {
      image = 'image',
      description = 'ssssssssss',
      content = 'content',
    } = {},
  } = item;
  return (
    <Item
      {...props}
      item={{
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
          description,
          content,
        },
      }}
      preview
    />
  );
};

export default compose(
  connect(newSelector, { fetchNew }),
  withHooks((props) => {
    const { match: { params: { id } }, fetchNew: fetch } = props;
    const { link = '' } = searchQuery(props);
    useEffect(() => {
      fetch({ id, link });
    }, []);
  }),
)(Preview);
