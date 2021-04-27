import styled from 'styled-components';
import { rem } from 'polished';

export const PageTitle = styled.div`
  background-color: ${(props) => props.theme.color.white};
  padding: 24px 0 22px 32px;
  font-size: ${rem('18px')};
  letter-spacing: 1.2px;
  box-shadow: 0 1px 2px 0 rgba(40, 60, 80, 0.12);
  margin-bottom: 1px;
  font-weight: bold;
`;
