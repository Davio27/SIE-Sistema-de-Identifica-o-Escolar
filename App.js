import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import QRScreen from './QRScreen';
import LeitorScreen from './LeitorScreen'
import CrudScreen from './CrudScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
