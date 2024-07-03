import React, { useEffect, useRef } from 'react'
import BottomTab from '../components/main/BottomTab';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { colours } from '../colours';
import MultiColorGradient from '../components/main/MultiColorGradient';

function MainPage({ navigation }) {
  return(
    <MultiColorGradient>
      <Text style={{
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  }}>Home Screen</Text>
      <BottomTab navigation={navigation} active={"main"}/>
    </MultiColorGradient>
  );
}


export default MainPage