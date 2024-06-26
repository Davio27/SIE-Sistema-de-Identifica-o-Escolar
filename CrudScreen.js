import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from './CustomPicker';




const CrudScreen = () => {
  const navigation = useNavigation(); // Obtendo o objeto de navegação

  const [alunos, setAlunos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoAluno, setNovoAluno] = useState({
    rm: '',
    tipo: '',
    semestre: '',
    ano: ''
  });

  // Adicione o estado para controlar se estamos editando um aluno
  const [editandoAluno, setEditandoAluno] = useState(false);
  const [indexDoAlunoEditado, setIndexDoAlunoEditado] = useState(null);


  useEffect(() => {
    // Carregar os alunos salvos no AsyncStorage ao carregar a tela
    loadAlunos();
  }, []);
  
  const loadAlunos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@alunos');
      if (jsonValue !== null) {
        let alunosData = JSON.parse(jsonValue);
        
        // Ordenar os alunos por semestre e ano
        alunosData.sort((a, b) => {
          const semestreA = parseInt(a.semestre);
          const semestreB = parseInt(b.semestre);
          const anoA = parseInt(a.ano);
          const anoB = parseInt(b.ano);
  
          // Ordenar primeiro pelo ano e depois pelo semestre
          if (anoA === anoB) {
            return semestreA - semestreB;
          } else {
            return anoA - anoB;
          }
        });
  
        // Atualizar o estado dos alunos com a lista ordenada
        setAlunos(alunosData);
      }
    } catch (e) {
      console.error('Erro ao carregar alunos', e);
    }
  };
  

  const saveAlunos = async () => {
    try {
      await AsyncStorage.setItem('@alunos', JSON.stringify(alunos));
    } catch (e) {
      console.error('Erro ao salvar aluno / Professor', e);
    }
  };

  // Função Adicionar novo aluno/Fazer alteração
  const adicionarAluno = () => {

    // Verifica se algum campo está vazio
    if (!novoAluno.rm || !novoAluno.tipo || !novoAluno.semestre || !novoAluno.ano) {
    alert('Por favor, preencha todos os campos.');
    return;
    }

    else if (editandoAluno) {
      const rmExistente = alunos.some((aluno, index) => index !== indexDoAlunoEditado && aluno.rm === novoAluno.rm);
        if (rmExistente) {
          alert('O RM já está cadastrado para outro aluno.');
          return;
        }

      // Se estivermos editando, substituímos as informações do aluno na lista
      const novosAlunos = [...alunos];
      novosAlunos[indexDoAlunoEditado] = novoAluno;
      setAlunos(novosAlunos);
      saveAlunos();
      setEditandoAluno(false); // Resetamos o estado de edição
      setIndexDoAlunoEditado(null); // Resetar o índice do aluno editado
      } 
      else {
        // Verifica se o RM já existe na lista de alunos
        const alunoExistente = alunos.find(aluno => aluno.rm === novoAluno.rm);
  
    if (alunoExistente) {
      // Se o aluno já existir, exibe um alerta
      alert('O RM já está cadastrado.');
      return; // Encerra a função para evitar a adição do aluno
    }
      // Se não estivermos editando, adicionamos um novo aluno à lista
      setAlunos([...alunos, novoAluno]);
      saveAlunos();
    }
    setModalVisible(false);
    
  };

  const resetNovoAluno = () => {
    setNovoAluno({ rm: '', tipo: '', semestre: '', ano: '' });
  };
// 


// Função para voltar à tela anterior
  const voltarTelaLogin = () => {
    navigation.goBack(); 
  };
// 


// Função para editar as informaçoes
  const editarAluno = (index) => {
    const alunoEditado = alunos[index];
    setNovoAluno({
      rm: alunoEditado.rm,
      tipo: alunoEditado.tipo,
      semestre: alunoEditado.semestre,
      ano: alunoEditado.ano,
    });
    setIndexDoAlunoEditado(index); // Definir o índice do aluno que está sendo editado
    setEditandoAluno(true); // Define que estamos editando um aluno
    setModalVisible(true);
  };
// 

const excluirAluno = ({ item, index }) => {
  // Exibir um alerta de confirmação antes de excluir o aluno
  Alert.alert(
    'Confirmar exclusão',
    'Tem certeza de que deseja excluir este aluno?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => confirmarExclusao(index),
      },
    ]
  );
};

const confirmarExclusao = (index) => {
  const novosAlunos = [...alunos];
  novosAlunos.splice(index, 1); // Remove o aluno da lista
  setAlunos(novosAlunos); // Atualiza o estado de alunos com a lista sem o aluno excluído
  saveAlunos(); // Salva a lista atualizada no AsyncStorage
};

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.column}>
        <Text>{item.rm}</Text>
      </View>
      <View style={styles.column}>
        <Text>{item.tipo}</Text>
      </View>
      <View style={styles.column}>
        <Text>{item.semestre}/{item.ano}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => editarAluno(index)}>
          <Icon name="pencil" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{excluirAluno({item, index}); resetNovoAluno(); }}>
          <Icon name="trash" size={20} color="#FF0000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.column}>
          <Text style={styles.headerText}>RM/RP</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.headerText}>Aluno/Professor</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.headerText}>Semestre/Ano</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.headerText}>Ações</Text>
        </View>
      </View>

      <FlatList
        data={alunos}
        renderItem={renderItem}
        keyExtractor={(item) => item.rm.toString()} // Utiliza o rm como chave
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Aluno</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.exitButton} onPress={voltarTelaLogin}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="  RM / RP"
              placeholderTextColor="black"
              value={novoAluno.rm}
              onChangeText={text => setNovoAluno({ ...novoAluno, rm: text })}
              keyboardType="numeric"
            />
            
             <CustomPicker
              options={[
                { label: 'Aluno', value: 'Aluno' },
                { label: 'Professor', value: 'Professor' }
              ]}
              selectedValue={novoAluno.tipo}
              onValueChange={value => setNovoAluno({ ...novoAluno, tipo: value })}
              placeholderText="Aluno / Professor"
            />

            
            <CustomPicker
              options={[
                { label: '1º Semestre', value: '01' },
                { label: '2º Semestre', value: '02' }
              ]}
              selectedValue={novoAluno.semestre}
              onValueChange={value => setNovoAluno({ ...novoAluno, semestre: value })}
              placeholderText="Semestre"
            />

            <TextInput
              style={styles.input}
              placeholder="Ano Letivo"
              placeholderTextColor="black"
              value={novoAluno.ano}
              onChangeText={text => {
                // Verifica se o texto contém apenas números e tem no máximo 4 dígitos
                if (/^\d{0,4}$/.test(text)) {
                  setNovoAluno({ ...novoAluno, ano: text });
                }
              }}
            />
            <TouchableOpacity onPress={() =>{resetNovoAluno(); adicionarAluno();}} style={styles.button}>
              <Text style={styles.buttonText}>{editandoAluno ? 'Salvar Alterações' : 'Adicionar Aluno'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{resetNovoAluno(); setModalVisible(false);}} style={styles.button}>
            <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  headerText: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  exitButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  icons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#C0C0C0',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderRadius:10,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    textAlign: 'left',
  },
  pickerItem: {
    textAlign: 'left',
    height: 40,
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
    marginTop: 10, // Espaçamento superior
    marginBottom: 5, // Espaçamento inferior
    alignSelf: 'stretch', // Estende o botão para preencher a largura do componente pai
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center', // Alinha o texto ao centro do botão
  },
  
});

export default CrudScreen;
