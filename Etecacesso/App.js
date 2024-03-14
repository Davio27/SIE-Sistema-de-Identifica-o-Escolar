import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [rm, setRM] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para autenticar o usuário
    // utilizando o RM e senha fornecidos.
    console.log('Nome do Aluno:', nomeAluno);
    console.log('RM/RP:', rm);
    console.log('Data de Nascimento:', dataNascimento);
  };

  return (
    <View style={styles.container}>
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
        secureTextEntry={true}
        value={rm}
        onChangeText={text => setRM(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={text => setDataNascimento(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Gerar QR-ID</Text>
      </TouchableOpacity>
    </View>
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