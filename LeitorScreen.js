import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';


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

  useEffect(() => {
    if (accessGranted !== null) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [accessGranted]);

  const handleSair = () => {
    navigation.goBack();
  };

  

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    // Verifica se o RM está na lista
    if (rmList.includes(data)) {
      setAccessGranted(true);
    } else {
      setAccessGranted(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let accessMessage = '';
  let accessMessageColor = 'yellow';

  if (scanned) {
    if (accessGranted === true) {
      accessMessage = 'Acesso permitido';
      accessMessageColor = 'green';
    } else if (accessGranted === false) {
      accessMessage = 'Acesso negado, RM não registrado';
      accessMessageColor = 'red';
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Vigilante:</Text>
        <Text style={styles.text}>{nomeUsuario}</Text>
        <View style={styles.qrCodeContainer}>
          <View style={styles.qrCodeFrame} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSair}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        {scanned && accessGranted !== null && (
            <Animated.Text
            style={[
              styles.accessMessage,
              { color: accessMessageColor, opacity: fadeAnim }
            ]}
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
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 175,
    backgroundColor: '#B22222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 75,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  qrCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodeFrame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'white',
  },
  accessMessage: {
    fontSize: 26,
    marginTop: 50,
    textAlign: 'center',
  },
});

export default LeitorScreen;
