import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeitorScreen from './LeitorScreen'

const rmList = [
  '20240289','11111111', '20240152', '20240104', '20240476', '190689', '20230704', '20240122', '20240327', '20240202', '20240218', '180568', '20200996', '20240173', '20240063', '20210794', '20240204', '20240376', '20240099', '20240333', '20240408', '20240509', '20240487', '20240410', '20240231', '20240282', '20240210', '20240136', '20240255', '20240179', '20240348', '20240389', '20240206', '20240106', '20240230', '20210803', '20230660', '20230586', '20230588', '20230643', '20230719', '20230692', '20210951', '20230108', '20240097', '20240250', '20240062', '00366', '20240234', '20240285', '20240484', '20240266', '20240142', '20240490', '20240127', '20240003', '20240521', '20230815', '20240162', '20230772', '20240395', '20240236', '20240252', '20220720', '20240300', '20240292', '20240421', '20240307', '20240245', '20240367', '20240154', '20240235', '20230796', '20240205', '20240140', '20240143', '20230697', '20230346', '20210804', '20230752', '20230621', '20230617', '20230583', '20230454', '20230755', '20230814', '20230797', '20230787', '20230624', '20230813', '20230739', '20230613', '20230611', '20200084', '20230640', '20230207', '20230155', '181132', '20230337', '20230574', '20230109', '20200489', '20220615', '20230203', '20230497', '20230407', '20230309', '20230115', '20230307', '20230234', '20230021', '20230369'
];

const LoginScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [rm, setRM] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  

  const formatarDataNascimento = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');

    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
  };

  const navigation = useNavigation();

  const handleLogin = () => {
    if (rm === '11111111') {
      navigation.navigate('LeitorScreen', { nomeUsuario: nomeAluno }); // Navegar para QRScanner se RM for '11111111'
      return;
    }
    if (nomeAluno && rm && dataNascimento) {
      if (rmList.includes(rm)) {
        console.log('Acesso permitido para RM:', rm);
        // Passando nomeAluno como propriedade
        navigation.navigate('QRScreen', { rm, dataNascimento, nomeAluno }); 
      } else {
        Alert.alert('Acesso negado', 'RM inválido. Por favor, verifique e tente novamente.');
      }
    } else {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image
            source={require('./Imagens/Logo_Etec.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Sistema de Identificação Escolar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nomeAluno}
          onChangeText={text => setNomeAluno(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RM/RP"
          value={rm}
          onChangeText={text => setRM(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formatarDataNascimento(dataNascimento)}
          onChangeText={text => setDataNascimento(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Gerar QR-ID</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 25,
  },
  input: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '45%',
    height: 50,
    backgroundColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
