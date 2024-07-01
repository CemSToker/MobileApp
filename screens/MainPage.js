import { View, Text, Button } from 'react-native'
import React from 'react'
import BottomTab from '../components/main/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data successfully saved');
  } catch (e) {
    console.error('Failed to save the data to the storage');
  }
};

// Example


function mainpage({ navigation }) {
    storeData('username', 'JohnDoe');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('QuestionPage')}
  
        />
        <BottomTab navigation={navigation} active={"main"}/>
      </View>
    );
  }

export default mainpage