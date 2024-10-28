import React, {useState} from 'react';
import {
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
  ViewValue,
  WalletInputContainer,
  WalletInputText,
  AreaColor,
  PaymentOption,
  SelectedPaymentOption,
  PaymentText,
  ViweFlat,
} from './styled';
import Header from '../../components/Header';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import {format} from 'date-fns';
import CustomModal from '../../components/CustomModal';

// As opções de método de pagamento
const paymentMethods = ['Dinheiro', 'Crédito', 'Débito', 'Pix'];

const NewTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Estado para controlar a visibilidade do modal
  const [modalVisible, setModalVisible] = useState(false);

  // Função para formatar o valor como moeda
  const formatCurrency = value => {
    if (value === undefined) {
      return '';
    }

    const onlyNums = value.replace(/[^0-9]/g, ''); // Remove tudo que não for número
    if (onlyNums === '') {
      return '';
    }
    const formattedValue = (parseFloat(onlyNums) / 100).toFixed(2);
    return `R$ ${formattedValue.replace('.', ',')}`; // Retorna o valor formatado
  };

  const [labelInput, setLabelInput] = useState(route.params?.description || '');
  const [displayValue, setDisplayValue] = useState(
    formatCurrency((route.params?.value || 0).toString()), // Mover aqui depois da função
  );
  const [numericValue, setNumericValue] = useState(
    (route.params?.value || 0).toString(),
  );
  const [type, setType] = useState(route.params?.type || 'despesa');
  const [paymentMethod, setPaymentMethod] = useState(
    route.params?.payment_method || 'Dinheiro',
  );

  // Função que lida com a mudança do valor
  const handleValueChange = text => {
    const numeric = text.replace(/[^0-9]/g, ''); // Extrai apenas números
    const formatted = formatCurrency(text); // Formata o valor como moeda

    setNumericValue(numeric); // Armazena o valor numérico real
    setDisplayValue(formatted); // Mostra o valor formatado no campo de texto
  };

  // Função que lida com o envio de dados
  const handleSubmit = () => {
    Keyboard.dismiss();

    if (isNaN(parseFloat(numericValue)) || !type) {
      Alert.alert('Preencha todos os campos corretamente');
      return;
    }

    // Define a visibilidade do modal como verdadeira em vez de usar o Alert
    setModalVisible(true);
  };

  // Função que lida com a adição ou edição ao banco de dados
  const handleAdd = async () => {
    try {
      const descriptionFinal =
        labelInput.trim() === '' ? 'Sem descrição' : labelInput;
      const payload = {
        description: descriptionFinal,
        value: parseFloat(numericValue) / 100,
        type,
        payment_method: paymentMethod,
        date: format(new Date(), 'dd/MM/yyyy'),
      };

      if (route.params?.id) {
        // Atualiza a despesa existente
        await api.put(`/receives/edit/${route.params.id}`, payload);
      } else {
        // Cria uma nova despesa
        await api.post('/receive', payload);
      }

      setLabelInput('');
      setDisplayValue('');
      setNumericValue('');
      navigation.navigate('Home', {update: true});
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a despesa');
    }
  };

  // Função que renderiza cada item no FlatList
  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => setPaymentMethod(item)}>
      <ViweFlat>
        {paymentMethod === item ? (
          <SelectedPaymentOption>
            <PaymentText>{item}</PaymentText>
          </SelectedPaymentOption>
        ) : (
          <PaymentOption>
            <PaymentText>{item}</PaymentText>
          </PaymentOption>
        )}
      </ViweFlat>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color="white" size={30} />
          </ButtonCancel>
          <Header titulo="Registrando" />
        </ViewHeader>

        <ViewValue>
          <TextValue>Valor da receita</TextValue>
          <InputValue
            placeholder="R$ 0,00"
            placeholderTextColor="white"
            keyboardType="numeric"
            autoFocus={true}
            value={displayValue}
            onChangeText={handleValueChange}
          />
        </ViewValue>

        <AreaColor>
          <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
            <ViewInput>
              <InputDescription
                placeholder="Descrição desse registro"
                value={labelInput}
                onChangeText={text => setLabelInput(text)}
                placeholderTextColor="white"
              />
              <Separator />
            </ViewInput>

            <WalletInputContainer>
              <Back name="wallet" size={20} color="white" />
              <WalletInputText>Selecionar :</WalletInputText>

              <FlatList
                data={paymentMethods}
                renderItem={renderItem}
                keyExtractor={item => item}
                style={{height: 40, width: 60}}
                showsVerticalScrollIndicator={false}
                pagingEnabled
              />
            </WalletInputContainer>

            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton>
            <ButtonCancel onPress={() => navigation.goBack()}>
              <ButtonText>Cancelar</ButtonText>
            </ButtonCancel>
          </SafeAreaView>
        </AreaColor>

        {/* Custom Modal */}
        <CustomModal
          visible={modalVisible}
          type={type}
          value={(parseFloat(numericValue) / 100).toFixed(2)}
          paymentMethod={paymentMethod}
          onCancel={() => setModalVisible(false)}
          onContinue={() => {
            setModalVisible(false);
            handleAdd();
          }}
        />
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default NewTwo;
