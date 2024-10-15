/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Background,
  ButtonCancel,
  ButtonText,
  InputDescription,
  InputValue,
  SubmitButton,
  SubmitText,
  TextValue,
  ViewHeader,
  ViewInput,
  ViewValue,
} from './styled';
import Header from '../../components/Header';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import RegisterTypeD from '../../components/RegisterTypesD'; // Importa componente de tipo (despesa ou receita)
import api from '../../services/api';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {IconEye} from '../SignIn/styled';

const NewTwo = () => {
  const navigation = useNavigation();
  const [labelInput, setLabelInput] = useState(''); // Para descrição
  const [displayValue, setDisplayValue] = useState(''); // Valor formatado que será mostrado
  const [numericValue, setNumericValue] = useState(''); // Valor numérico real para backend
  const [type, setType] = useState('despesa'); // Inicia como receita, mas muda para despesa via RegisterTypeD

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
      )}`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Continuar', onPress: () => handleAdd()},
      ],
    );
  }

  // Função que lida com a adição ao banco de dados
  async function handleAdd() {
    try {
      await api.post('/receive', {
        description: labelInput,
        value: parseFloat(numericValue) / 100, // Envia o valor numérico correto
        type: type,
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
        <ViewHeader style={{justifyContent: 'space-between'}}>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <ButtonText>Cancelar</ButtonText>
          </ButtonCancel>
          <Header titulo="Registrando" />
        </ViewHeader>

        <ViewValue>
          <TextValue>Valor da despesa</TextValue>
          <InputValue
            placeholder="R$ 0,00"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={displayValue} // Mostra o valor formatado
            onChangeText={handleValueChange} // Formata o valor ao digitar
          />
        </ViewValue>

        <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
          <ViewInput>
            <InputDescription
              placeholder="Descrição desse registro"
              value={labelInput}
              onChangeText={text => setLabelInput(text)} // Atualiza descrição
            />
            <IconEye name="edit" size={20} color="black" />
          </ViewInput>

          {/* Componente que altera o tipo (despesa ou receita) */}
          <RegisterTypeD type={type} sendTypeChanged={item => setType(item)} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default NewTwo;
