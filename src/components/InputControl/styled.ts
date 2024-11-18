import styled from 'styled-components/native';

export const Container = styled.View`
  width: 65%;
  top: 13px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: white;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 12px 8px; /* Aumentando o padding para garantir a altura mínima */
  background-color: transparent;
  color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  height: 48px; /* Garantindo que o input tenha 48dp de altura */
`;
