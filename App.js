// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import MainPage from './screens/MainPage';
import QuestionSpecificScreen from './screens/QuestionSpecificScreen';
const Stack = createStackNavigator();

export default function App() {
  const screenoptions ={
    headerShown:false,
    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation, // Disable the sliding animation
}
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" screenOptions={screenoptions}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="QuestionSpecificScreen" component={QuestionSpecificScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}