import { View, Text } from 'react-native'
import React from 'react'
import BottomTab from '../components/main/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Data retrieved:', value);
      return value;
    }
  } catch (e) {
    console.error('Failed to fetch the data from storage');
  }
};

// Example
getData('username').then((value) => console.log(value));

const QuestionPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>QuestionPage</Text>

      <BottomTab navigation={navigation} active={"questions"}/>
    </View>
  )
}

export default QuestionPage