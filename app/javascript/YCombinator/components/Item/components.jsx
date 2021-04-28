import styled, { css } from 'styled-components';
import { rem } from 'polished';
import AccessTime from 'rmdi/lib/AccessTime';
import FavoriteBorder from 'rmdi/lib/FavoriteBorder';
import Comment from 'rmdi/lib/Comment';

import { FallbackImg } from '../../styles/images';
import { breakpoint } from '../../styles/mixins';

export const Container = styled.ul`
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

export const ItemsTitle = styled.li`
  font-family: 'HelveticaNeue-UltraLight';
  padding: 20px 20px 10px;
  color: ${(props) => props.theme.color.darkGreyBlue};
  font-size: ${rem('20px')};
  font-weight: bold;
  word-wrap: break-word;
`;
export const SiteName = styled.span`
  color: ${(props) => props.theme.color.waterBlue};
  font-size: ${rem('15px')};
`;

export const ItemsDescription = styled.li`
  font-family: 'HelveticaNeue-Medium';
  padding: 5px 10px 5px;
  text-overflow: ellipsis;
  position: relative;
  max-height: 5em;
  text-align: justify;
  margin-bottom: 5px;
  font-size: ${rem('13px')};
`;

export const IcoAccessTime = styled(AccessTime)`
  width: ${rem('20px')};
  height: ${rem('20px')};
  margin-left: 3px;
  color: ${(props) => props.theme.color.grayIcon};
  margin-right: 6px;
  float: right;
`;

export const styleIcon = css`
  width: ${rem('20px')};
  height: ${rem('20px')};
  margin-left: 3px;
  margin-right: 6px;
  float: right;
`;

export const FavoriteBorderIco = styled(FavoriteBorder)`
  ${styleIcon};
`;

export const CommentIco = styled(Comment)`
  ${styleIcon};
`;

export const ItemsTime = styled.li`
  padding: 5px 10px;
  color: ${(props) => props.theme.color.grayIcon};
  font-size: ${rem('15px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StateItem = styled.div`
  font-size: ${rem('15px')};
  font-family: 'HelveticaNeue-UltraLight';
`;

export const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-top: 10px;
  margin-right: auto;
  min-width: 50%;
  max-height: 50%;
  min-height: 40%;
  background-image: url(${FallbackImg});
  background-size: cover;
`;
