import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';


const LoginScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [rm, setRM] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const formatarDataNascimento = (text) => {
    // Remove todos os caracteres que não são números
    const cleaned = text.replace(/[^0-9]/g, '');

    // Adiciona barras automaticamente após o dia e o mês
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
  };

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para autenticar o usuário
    // utilizando o RM e senha fornecidos.
    console.log('Nome do Aluno:', nomeAluno);
    console.log('RM/RP:', rm);
    console.log('Data de Nascimento:', dataNascimento);
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
          onChangeText={text => setRM(text.replace(/[^0-9]/g, ''))} // Apenas números
          keyboardType="numeric" // Apenas números
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formatarDataNascimento(dataNascimento)} // Formata a data de nascimento
          onChangeText={text => setDataNascimento(text)}
          keyboardType="numeric" // Apenas números
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
