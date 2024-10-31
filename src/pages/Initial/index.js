import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Container, Header, Title, Text, Button, ButtonText} from './styled';
import LinearGradient from 'react-native-linear-gradient';

export default function Initial() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/Logo.png')}
          style={{
            width: '70%',
          }}
          resizeMode="contain"
        />
      </Header>

      <Animatable.View
        animation="fadeInUp"
        delay={600}
        style={styles.animatable}>
        <LinearGradient
          colors={['#023e00', '#04C200']} // Gradiente do mais escuro para o mais claro
          style={styles.gradient}>
          <View style={styles.content}>
            <Title>
              Monitore e organize seus
              {'\n'}
              gastos de qualquer lugar!
            </Title>
            <Text>Faça o login para começar.</Text>
            <Button onPress={() => navigation.navigate('SignIn')}>
              <ButtonText>Acessar</ButtonText>
            </Button>
          </View>
        </LinearGradient>
      </Animatable.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  animatable: {
    flex: 1,
    justifyContent: 'flex-end', // Isso posiciona o conteúdo na parte inferior da tela
  },
  gradient: {
    width: '100%',
    borderRadius: 30,
    padding: 20, // Adiciona espaço interno ao gradiente
  },
  content: {
    alignItems: 'center', // Centraliza o conteúdo dentro da caixa
    paddingBottom: 100, // Espaço para o botão
  },
});
