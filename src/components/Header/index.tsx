import React from 'react';
import {Container, Title, ButtonMenu} from './styled';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Header = ({titulo}) => {
  const navigation = useNavigation();

  return <Container>{titulo && <Title>{titulo}</Title>}</Container>;
};

export default Header;
