import React from 'react';
import {Container, Title, ButtonMenu} from './styled';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Header = ({titulo}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={35} color="black" />
      </ButtonMenu>
      {titulo && <Title>{titulo}</Title>}
    </Container>
  );
};

export default Header;
