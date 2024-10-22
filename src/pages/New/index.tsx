import React, {useState} from 'react';
import {
  AreaColor,
  Background,
  ButtonCancel,
  ButtonText,
  InputDescription,
  InputValue,
  Separator,
  SubmitButton,
  SubmitText,
  TextValue,
  ViewHeader,
  ViewInput,
  ViewPicker,
  ViewValue,
  WalletInputContainer,
  WalletInputText,
} from './styled';
import Header from '../../components/Header';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';

import api from '../../services/api';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Fontisto'; // Para o ícone de carteira
import {Picker} from '@react-native-picker/picker';

const New = () => {
  const navigation = useNavigation();
  const [labelInput, setLabelInput] = useState(''); // Para descrição
  const [displayValue, setDisplayValue] = useState(''); // Valor formatado que será mostrado
  const [numericValue, setNumericValue] = useState(''); // Valor numérico real para backend
  const [type, setType] = useState('receita'); // Inicia como receita, mas muda para despesa via RegisterTypeD
  const [paymentMethod, setPaymentMethod] = useState('dinheiro'); // Método de pagamento

  // Função para formatar o valor como moeda
  const formatCurrency = value => {
    const onlyNums = value.replace(/[^0-9]/g, ''); // Remove tudo que não for número
    if (onlyNums === '') {
      return '';
    }
    const formattedValue = (parseFloat(onlyNums) / 100).toFixed(2);
    return `R$ ${formattedValue.replace('.', ',')}`; // Retorna o valor formatado
  };

  // Função que lida com a mudança do valor
  const handleValueChange = text => {
    const numeric = text.replace(/[^0-9]/g, ''); // Extrai apenas números
    const formatted = formatCurrency(text); // Formata o valor como moeda

    setNumericValue(numeric); // Armazena o valor numérico real
    setDisplayValue(formatted); // Mostra o valor formatado no campo de texto
  };

  // Função que lida com o envio de dados
  function handleSubmit() {
    Keyboard.dismiss();

    // Verifica se o valor está correto e se o tipo está definido
    if (isNaN(parseFloat(numericValue)) || !type) {
      Alert.alert('Preencha todos os campos corretamente');
      return;
    }

    // Exibe um alerta para confirmação
    Alert.alert(
      'Confirmando dados',
      `Tipo: ${type} - Valor: R$ ${(parseFloat(numericValue) / 100).toFixed(
        2,
      )} - Método de Pagamento: ${paymentMethod}`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Continuar', onPress: () => handleAdd()},
      ],
    );
  }

  // Função que lida com a adição ao banco de dados
  async function handleAdd() {
    try {
      // Verifica se a descrição está vazia e define uma mensagem padrão
      const descriptionFinal =
        labelInput.trim() === '' ? 'Sem descrição' : labelInput;

      await api.post('/receive', {
        description: descriptionFinal, // Usa a descrição final (padrão ou preenchida)
        value: parseFloat(numericValue) / 100, // Envia o valor numérico correto
        type: type,
        payment_method: paymentMethod, // Verifique se está correto
        date: format(new Date(), 'dd/MM/yyyy'),
      });

      setLabelInput(''); // Limpa o campo de descrição
      setDisplayValue(''); // Limpa o campo de valor formatado
      setNumericValue(''); // Limpa o valor numérico
      navigation.navigate('Home'); // Redireciona para a página inicial
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a transação');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <ViewHeader>
          <Header titulo="Registrando" />
        </ViewHeader>

        <ViewValue>
          <TextValue>Valor da receita</TextValue>
          <InputValue
            placeholder="R$ 0,00"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={displayValue} // Mostra o valor formatado
            onChangeText={handleValueChange} // Formata o valor ao digitar
          />
        </ViewValue>

        <AreaColor>
          <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
            <ViewInput>
              <Icon name="info" size={20} color="white" />
              <InputDescription
                placeholder="Descrição desse registro"
                value={labelInput}
                onChangeText={text => setLabelInput(text)} // Atualiza descrição
                placeholderTextColor="white"
              />
              <Separator />
            </ViewInput>

            <TouchableOpacity
              onPress={() => setPaymentMethod('carteira')}
              style={{width: '90%'}}>
              <WalletInputContainer>
                <Icon name="wallet" size={20} color="white" />
                <WalletInputText>Pagamento :</WalletInputText>

                <ViewPicker>
                  <Picker
                    selectedValue={paymentMethod}
                    onValueChange={itemValue => setPaymentMethod(itemValue)}
                    style={{width: 150, color: 'white'}}>
                    <Picker.Item label="Dinheiro" value="dinheiro" />
                    <Picker.Item label="Cartão" value="cartao" />
                  </Picker>
                </ViewPicker>
              </WalletInputContainer>
            </TouchableOpacity>

            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton>
            <ButtonCancel onPress={() => navigation.goBack()}>
              <ButtonText>Cancelar</ButtonText>
            </ButtonCancel>
          </SafeAreaView>
        </AreaColor>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default New;
