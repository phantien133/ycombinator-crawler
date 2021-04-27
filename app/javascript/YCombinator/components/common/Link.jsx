import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { rem } from 'polished';

export const PrimaryLink = styled(NavLink)`
  font-family: 'HelveticaNeue-Light';
  font-weight: 700;
  color: ${(props) => props.theme.color.warmGreyFive};
  font-size: ${rem('12px')};
  margin-bottom: 17px;
  &:hover {
    color: ${(props) => props.theme.color.blueCyan};
    opacity: 1;
  }
`;
