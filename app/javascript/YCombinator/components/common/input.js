import styled from 'styled-components';

export const InputField = styled.input`
  margin: 0 10px;
  border: none;
  outline: none;
  font-size: 1.3rem;
  background: transparent;
  color: ${(props) => props.theme.color.blueGrayActive};
  border-bottom: 1px solid ${(props) => props.theme.color.blueCyan};
  font-family: 'HelveticaNeue-Medium';
`;

export const RightIcon = styled.label`
  font-family: 'HelveticaNeue-Medium';
  margin: 0 -35px;
  font-size: 1.3rem;
  padding-top: 3px;
  color: ${(props) => props.theme.color.blueCyan};
`;

export const LeftLabel = styled.label`
  font-family: 'HelveticaNeue-Medium';
  font-size: 1rem;
  margin: 10px;
  padding-top: 3px;
  color: ${(props) => props.theme.color.blueCyan};
`;

export const InputGroup = styled.div`
  background: ${(props) => props.theme.color.white};
  padding: 20px 5px;
`;

export const TextAreaField = styled.textarea`
  margin: 0 10px;
  border: none;
  outline: none;
  font-size: 1.3rem;
  background: transparent;
  color: ${(props) => props.theme.color.blueGrayActive};
  border-bottom: 1px solid ${(props) => props.theme.color.blueCyan};
  font-family: 'HelveticaNeue-Medium';
`;
