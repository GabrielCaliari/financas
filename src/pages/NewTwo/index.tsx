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
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import CustomModal from '../../components/CustomModal';
import CustomModalDelete from '../../components/CustomModalDelete';
import {createMovement, updateMovement} from '../../services/movementService';
import {useTheme} from '../../contexts/ThemeContext';
import {useToast} from '../../contexts/ToastContext';
import {useCategories} from '../../hooks/useCategories';

// As opções de método de pagamento
const paymentMethods = ['Dinheiro', 'Crédito', 'Débito', 'Pix'] as const;
type PaymentMethod = (typeof paymentMethods)[number];

const NewTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors} = useTheme();
  const toast = useToast();
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
    route.params?.type || 'despesa',
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    route.params?.payment_method || 'Dinheiro',
  );
  const [categoryId, setCategoryId] = useState<string | null>(
    (route.params as {categoryId?: string})?.categoryId ?? null,
  );

  const {categories} = useCategories('despesa');

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
        categoryId: categoryId || undefined,
      };

      if (isEditing && route.params?.id) {
        await updateMovement(route.params.id, movementData);
        toast.show('Despesa atualizada');
      } else {
        await createMovement(movementData);
        toast.show('Despesa registrada');
      }

      setLabelInput('');
      setDisplayValue('');
      setNumericValue('');
      navigation.navigate('Dashboard', {update: true});
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a despesa');
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
          <TextValue>Valor da despesa</TextValue>
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

            <View style={{width: '90%', marginBottom: 14}}>
              <Text style={{fontSize: 14, color: colors.textSecondary, marginBottom: 8}}>
                Categoria
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <TouchableOpacity
                  onPress={() => setCategoryId(null)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: categoryId === null ? colors.primary : colors.surface,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: categoryId === null ? colors.primaryContrast : colors.text,
                    }}>
                    Nenhuma
                  </Text>
                </TouchableOpacity>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setCategoryId(cat.id)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      marginRight: 8,
                      marginBottom: 8,
                      backgroundColor: categoryId === cat.id ? colors.primary : colors.surface,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: categoryId === cat.id ? colors.primaryContrast : colors.text,
                      }}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

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

export default NewTwo;
