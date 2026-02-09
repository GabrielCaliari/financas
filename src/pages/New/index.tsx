import React, {useEffect, useState} from 'react';
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
import CustomModal from '../../components/CustomModal';
import CustomModalDelete from '../../components/CustomModalDelete';
import {createMovement, updateMovement} from '../../services/movementService';
import {useTheme} from '../../contexts/ThemeContext';

// As opções de método de pagamento
const paymentMethods = ['Dinheiro', 'Crédito', 'Débito', 'Pix'] as const;
type PaymentMethod = (typeof paymentMethods)[number];

const New = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string | undefined) => {
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

  // Verifica se estamos em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Define o valor inicial baseado na edição ou novo registro
  const initialNumericValue = route.params?.value
    ? (route.params.value * 100).toString() // Multiplicamos por 100 para corrigir o deslocamento decimal
    : '0';

  const [labelInput, setLabelInput] = useState(route.params?.description || '');
  const [displayValue, setDisplayValue] = useState(
    formatCurrency(initialNumericValue), // Usamos o valor inicial formatado corretamente
  );
  const [numericValue, setNumericValue] = useState(initialNumericValue);
  const [type] = useState<'receita' | 'despesa'>(
    route.params?.type || 'receita',
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    route.params?.payment_method || 'Dinheiro',
  );

  // Define `isEditing` como true se estivermos no modo de edição
  useEffect(() => {
    if (route.params?.id) {
      setIsEditing(true);
    }
  }, [route.params?.id]);

  // Função que lida com a mudança do valor
  const handleValueChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, ''); // Extrai apenas números
    const formatted = formatCurrency(text); // Formata o valor como moeda

    setNumericValue(numeric); // Armazena o valor numérico real
    setDisplayValue(formatted); // Mostra o valor formatado no campo de texto
  };

  // Função que lida com o envio de dados
  const handleSubmit = () => {
    Keyboard.dismiss();

    if (!numericValue || parseFloat(numericValue) === 0) {
      setErrorModalVisible(true);
      return;
    }

    if (!type) {
      setErrorModalVisible(true);
      return;
    }

    // Define a visibilidade do modal de confirmação como verdadeira
    setModalVisible(true);
  };

  // Função que lida com a adição ou edição ao banco de dados
  const handleAdd = async () => {
    try {
      const descriptionFinal =
        labelInput.trim() === '' ? 'Sem descrição' : labelInput;

      const movementData = {
        description: descriptionFinal,
        value: parseFloat(numericValue) / 100,
        type,
        payment_method: paymentMethod,
        date: new Date(),
      };

      if (isEditing && route.params?.id) {
        // Atualiza a receita existente
        await updateMovement(route.params.id, movementData);
      } else {
        // Cria uma nova receita
        await createMovement(movementData);
      }

      setLabelInput('');
      setDisplayValue('');
      setNumericValue('');
      navigation.navigate('Home', {update: true});
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a receita');
    }
  };

  // Função que renderiza cada item no FlatList
  const renderItem = ({item}: {item: PaymentMethod}) => (
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
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Registrando" />
        </ViewHeader>

        <ViewValue>
          <TextValue>Valor da receita</TextValue>
          <InputValue
            placeholder="R$ 0,00"
            placeholderTextColor={colors.textSecondary}
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
                placeholderTextColor={colors.textSecondary}
              />
              <Separator />
            </ViewInput>

            <WalletInputContainer>
              <Back name="wallet" size={20} color={colors.text} />
              <WalletInputText>Selecionar :</WalletInputText>

              <FlatList
                data={paymentMethods as unknown as PaymentMethod[]}
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

        <CustomModalDelete
          visible={errorModalVisible}
          title="Erro"
          info="Por favor, insira um valor válido para registrar."
          onCancel={() => setErrorModalVisible(false)}
          onContinue={() => setErrorModalVisible(false)}
        />
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default New;
