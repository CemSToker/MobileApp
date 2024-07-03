import React, { useEffect, useRef } from 'react'
import BottomTab from '../components/main/BottomTab';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { colours } from '../colours';
import MultiColorGradient from '../components/main/MultiColorGradient';
import SvgGradient from '../components/main/SvgGradient';

function MainPage({ navigation }) {
  return(
    <SvgGradient>
       <Text style={styles.text}>Smooth Gradient with SVG</Text>
    </SvgGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default MainPage