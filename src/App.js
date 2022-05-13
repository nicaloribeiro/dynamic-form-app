import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormsProvider } from './contexts/FormsContext';
import HomeScreen from './screens/HomeScreen';
import AnswersScreen from './screens/AnswersScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <FormsProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Form" component={AnswersScreen} />
        </Stack.Navigator>
      </FormsProvider>
    </NavigationContainer>
  );
}