import QueryString from 'query-string';

export default ({ location: { search } }) => QueryString.parse(search);
