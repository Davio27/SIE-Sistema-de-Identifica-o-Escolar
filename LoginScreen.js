import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';




const LoginScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [rm, setRM] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigation = useNavigation();

  // Função para formatar a data de nascimento no formato DD/MM/AAAA
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

  // Condições de Login
  const handleLogin = () => {
    // Condição para campos vazios
    if (!nomeAluno || !rm || !dataNascimento) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }
    // Condição para navegar para a tel do Admin
    else if (rm === '00000000' && dataNascimento === '27/06/2000' && nomeAluno == 'Paulo Eduardo Hernandes' || nomeAluno == 'paulo eduardo hernandes' 
    || nomeAluno == 'Paulo eduardo hernandes' || nomeAluno == 'Paulo Eduardo hernandes'
     || nomeAluno == 'paulo Eduardo hernandes' || nomeAluno == 'paulo eduardo Hernandes') {
      navigation.navigate('CrudScreen', {}); // Navegar para CrudScreen se RM for '00000000'
      return;
    }
    // Condição para navegar para a ela do Scanner
    else if (rm === '11111111') {
      navigation.navigate('LeitorScreen', { nomeUsuario: nomeAluno }); // Navegar para QRScanner se RM for '11111111'
      return;
    }
    else {
      Alert.alert('Acesso negado', 'Dados Inválidos. Por favor, verifique e tente novamente.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text >
            <MaterialIcons name="keyboard-arrow-left" size={54} color="#B22222" />
        </Text>
      </TouchableOpacity>
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
          placeholder="Registro de entrada"
          value={rm}
          onChangeText={text => setRM(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento(DD/MM/AAAA)"
          value={formatarDataNascimento(dataNascimento)}
          onChangeText={text => setDataNascimento(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// Estilos
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    width: 60,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
