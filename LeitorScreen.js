import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const rmList = [
  '20240289', '20240152', '20240104', '20240476', '190689', '20230704', '20240122', '20240327', '20240202',
  '20240218', '180568', '20200996', '20240173', '20240063', '20210794', '20240204', '20240376', '20240099', '20240333',
  '20240408', '20240509', '20240487', '20240410', '20240231', '20240282', '20240210', '20240136', '20240255', '20240179',
  '20240348', '20240389', '20240206', '20240106', '20240230', '20210803', '20230660', '20230586', '20230588', '20230643',
  '20230719', '20230692', '20210951', '20230108', '20240097', '20240250', '20240062', '00366', '20240234', '20240285',
  '20240484', '20240266', '20240142', '20240490', '20240127', '20240003', '20240521', '20230815', '20240162', '20230772',
  '20240395', '20240236', '20240252', '20220720', '20240300', '20240292', '20240421', '20240307', '20240245', '20240367',
  '20240154', '20240235', '20230796', '20240205', '20240140', '20240143', '20230697', '20230346', '20210804', '20230752',
  '20230621', '20230617', '20230583', '20230454', '20230755', '20230814', '20230797', '20230787', '20230624', '20230813',
  '20230739', '20230613', '20230611', '20200084', '20230640', '20230207', '20230155', '181132', '20230337', '20230574',
  '20230109', '20200489', '20220615', '20230203', '20230497', '20230407', '20230309', '20230115', '20230307', '20230234',
  '20230021', '20230369'
];

const CameraQRCode = ({ onBarCodeScanned }) => (
  <Camera
    onBarCodeScanned={onBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
  />
);


const LeitorScreen = ({ route }) => {
  const navigation = useNavigation();
  const { nomeUsuario } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [accessGranted, setAccessGranted] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Alterado para requestCameraPermissionsAsync()
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  // animação
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }
    ).start();
  }, [scanned, fadeAnim]);



  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      console.log(`${data} `);
      
      // Verifica se o RM está na lista
      if (rmList.includes(data)) {
        setAccessGranted(true);
      } else {
        setAccessGranted(false);
      }
  
      // Aguarda 4 segundos antes de permitir outra leitura
      setTimeout(() => {
        setScanned(false);
      }, 4000);
    }
  };

  const startScanning = () => {
    setScanned(false); 
  };

  useEffect(() => {
    startScanning();
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  if (accessGranted == true) {
      accessMessage = 'Acesso permitido';
      accessMessageColor = 'green';
      accessIcon = <MaterialIcons name="check-circle" size={50} color="green" />;
  } else if (accessGranted == false) {
      accessMessage = 'Acesso negado, RM não registrado';
      accessMessageColor = 'red';
      accessIcon = <MaterialIcons name="cancel" size={50} color="red" />;
  }



  return (
    <View style={styles.container}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="keyboard-arrow-left" size={54} color="#B22222" />
          </TouchableOpacity>

          <Text style={styles.text}>Aponte a câmera para o QR Code</Text>
          <Text style={styles.text}>Vigilante: {nomeUsuario}</Text>

          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCodeFrame}>
              <CameraQRCode onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
            </View>
          </View>

          <Text style={styles.text2}>Posicione o QR Code aqui</Text>

          {scanned && accessGranted !== null && (
            <Animated.Text
              style={[styles.accessMessage,
                { color: accessMessageColor, opacity: fadeAnim }]}
            >
              {accessIcon}
            </Animated.Text>
          )}
          {scanned && accessGranted !== null && (
            <Animated.Text
              style={[styles.accessMessageicone,
                { color: accessMessageColor, opacity: fadeAnim }]}
            >
              {accessMessage}
            </Animated.Text>
          )}

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  text2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  qrCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  qrCodeFrame: {
    width: 300,
    height: 300,
    borderWidth: 10,
    borderColor: 'white',
    borderRadius: 70,
    overflow: 'hidden',
  },
  accessMessage: {
    backgroundColor: 'transparent',
    fontSize: 26,
    marginTop: 10,
    textAlign: 'center',
    zIndex: 100,
  },
  accessMessageicone: {
    width: 200,
    height: 100,
    backgroundColor: 'transparent',
    fontSize: 26,
    textAlign: 'center',
    zIndex: 100,
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

export default LeitorScreen;
