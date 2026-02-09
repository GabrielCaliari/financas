import styled from 'styled-components/native';

export const StyledSeparator = styled.View`
  height: 1px;
  background-color: ${props => props.theme?.colors?.border ?? 'rgba(255, 255, 255, 0.3)'};
  width: 95%;
  align-self: center;
`;
