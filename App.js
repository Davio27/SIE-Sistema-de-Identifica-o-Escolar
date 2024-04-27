import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import QRScreen from './QRScreen';
import LeitorScreen from './LeitorScreen';
import CrudScreen from './CrudScreen';
import LoginScreen from './LoginScreen';

// Criação do Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="QRScreen" 
          component={QRScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LeitorScreen" 
          component={LeitorScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CrudScreen" 
          component={CrudScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 
