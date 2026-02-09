import React, {useMemo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Back from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../contexts/ThemeContext';

const Info = () => {
  const navigation = useNavigation();
  const {colors, typography} = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
        },
        heading: {
          fontSize: typography.sizes.headline,
          fontWeight: typography.weights.bold,
          marginBottom: 10,
          color: colors.text,
        },
        subHeading: {
          fontSize: typography.sizes.body,
          marginBottom: 15,
          color: colors.text,
        },
        paragraph: {
          fontSize: typography.sizes.sm,
          marginBottom: 10,
          lineHeight: 20,
          color: colors.text,
        },
        sectionHeading: {
          fontSize: typography.sizes.title,
          fontWeight: typography.weights.bold,
          marginTop: 15,
          marginBottom: 10,
          color: colors.text,
        },
        subSectionHeading: {
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.bold,
          marginBottom: 5,
          color: colors.text,
        },
        listItem: {
          flexDirection: 'row',
          marginBottom: 8,
        },
        listText: {
          fontSize: typography.sizes.sm,
          lineHeight: 20,
          color: colors.text,
        },
        bold: {
          fontWeight: typography.weights.bold,
          color: colors.text,
        },
        link: {
          color: colors.primary,
          textDecorationLine: 'underline',
        },
        email: {
          flexDirection: 'row',
          marginBottom: 38,
        },
        buttoncancel: {
          position: 'absolute',
          left: 10,
          top: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10,
        },
        viewheader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 20,
          paddingLeft: 3,
          width: '100%',
          justifyContent: 'space-between',
        },
      }),
    [colors, typography],
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewheader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttoncancel}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </TouchableOpacity>
        <Header titulo="Sobre" />
      </View>

      <Text style={styles.heading}>Política de Privacidade</Text>
      <Text style={styles.subHeading}>
        Última atualização: 06 de Novembro de 2024
      </Text>

      <Text style={styles.paragraph}>
        Esta Política de Privacidade descreve nossas políticas e procedimentos
        sobre a coleta, uso e divulgação das suas informações quando você
        utiliza o Serviço e informa sobre seus direitos de privacidade e como a
        lei protege você.
      </Text>
      <Text style={styles.paragraph}>
        Utilizamos seus dados pessoais para fornecer e melhorar o Serviço. Ao
        usar o Serviço, você concorda com a coleta e uso das informações de
        acordo com esta Política de Privacidade.
      </Text>

      <Text style={styles.sectionHeading}>Interpretação e Definições</Text>

      <Text style={styles.subSectionHeading}>Interpretação</Text>
      <Text style={styles.paragraph}>
        As palavras em que a letra inicial é maiúscula têm significados
        definidos nas seguintes condições. As seguintes definições terão o mesmo
        significado, independentemente de aparecerem no singular ou no plural.
      </Text>

      <Text style={styles.subSectionHeading}>Definições</Text>
      <Text style={styles.paragraph}>
        Para os fins desta Política de Privacidade:
      </Text>

      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Conta</Text> significa uma conta exclusiva
          criada para você acessar nosso Serviço ou partes de nosso Serviço.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Afiliada</Text> significa uma entidade que
          controla, é controlada por, ou está sob controle comum de uma parte,
          onde "controle" significa a propriedade de 50% ou mais das ações,
          participação acionária ou outros valores mobiliários com direito a
          voto para eleição de diretores ou outra autoridade gerencial.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Aplicativo</Text> refere-se ao Cifro, o
          programa de software fornecido pela Empresa.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Empresa</Text> (referido como "a Empresa",
          "Nós", "Nos" ou "Nosso" neste Acordo) refere-se ao Cifro.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>País</Text> refere-se a: Brasil
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Dispositivo</Text> significa qualquer
          dispositivo que possa acessar o Serviço, como um computador, um
          celular ou um tablet digital.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Dados Pessoais</Text> são quaisquer
          informações que se referem a uma pessoa identificada ou identificável.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Serviço</Text> refere-se ao Aplicativo.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Prestador de Serviços</Text> significa
          qualquer pessoa natural ou jurídica que processa os dados em nome da
          Empresa. Refere-se a empresas terceirizadas ou indivíduos empregados
          pela Empresa para facilitar o Serviço, fornecer o Serviço em nome da
          Empresa, realizar serviços relacionados ao Serviço ou ajudar a Empresa
          a analisar como o Serviço é utilizado.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Serviço de Mídia Social de Terceiros</Text>{' '}
          refere-se a qualquer site ou rede social por meio do qual um Usuário
          pode fazer login ou criar uma conta para usar o Serviço.
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Dados de Uso</Text> refere-se a dados
          coletados automaticamente, gerados pelo uso do Serviço ou pela própria
          infraestrutura do Serviço (por exemplo, a duração de uma visita a uma
          página).
        </Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listText}>
          <Text style={styles.bold}>Você</Text> significa o indivíduo que acessa
          ou usa o Serviço, ou a empresa, ou outra entidade jurídica em nome da
          qual tal indivíduo está acessando ou usando o Serviço, conforme
          aplicável.
        </Text>
      </View>

      {/* Continue criando seções como acima para cada parte de sua Política de Privacidade */}

      <Text style={styles.sectionHeading}>Contate-Nos</Text>
      <Text style={styles.paragraph}>
        Se você tiver alguma dúvida sobre esta Política de Privacidade, você
        pode nos contatar:
      </Text>
      <View style={styles.email}>
        <Text style={styles.listText}>Por e-mail: cifro@hotmail.com</Text>
      </View>
    </ScrollView>
  );
};

export default Info;
