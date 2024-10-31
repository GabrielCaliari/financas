import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Container, Header, Title, Text, Button, ButtonText} from './styled';

export default function Initial() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/Logo.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '70%',
          }}
          resizeMode="contain"
        />
      </Header>

      <Animatable.View
        animation="fadeInUp"
        delay={600}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingEnd: '5%',
          paddingStart: '5%',
        }}>
        <Title>
          Monitore e organize seus
          {'\n'}
          gastos de qualquer lugar!
        </Title>
        <Text>Faça o login para começar.</Text>
        <Button onPress={() => navigation.navigate('SignIn')}>
          <ButtonText>Acessar</ButtonText>
        </Button>
      </Animatable.View>
    </Container>
  );
}
