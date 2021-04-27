import { createSelector } from 'reselect';
import {
  first,
  get,
  compact,
  isEmpty,
} from 'lodash';

export const newsSelector = (state) => state.news;

export const itemsSelector = createSelector(
  newsSelector,
  ({ items }) => items,
);

const previewLinkSelector = ({ links }) => (links || []).find(({ render, rel }) => rel === 'preview' && render === 'image');

const itemSelector = createSelector(
  previewLinkSelector,
  ({ data }) => data,
  (link, data) => {
    const { href } = link;

    if (!href) return null;

    return {
      href,
      data: first(data),
    };
  },
);

export const responseDataSelector = createSelector(
  (data) => get(data, 'collection.items') || [],
  (news) => {
    const items = compact(news.map(itemSelector));
    return {
      items,
      metadata: {
        totalHits: items.length,
      },
    };
  },
);

export const itemStateSelector = createSelector(
  (state, props) => get(props, 'item.data.nasaId'),
  (nasaId, persistentItems) => ({ isPersist: !isEmpty(persistentItems.items[nasaId]) }),
);
