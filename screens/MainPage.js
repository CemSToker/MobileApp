import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import BottomTab from '../components/main/BottomTab';
import SvgGradient from '../components/main/SvgGradient';
import { storeObject } from '../AsyncStorage';
import { colours } from '../colours';

function MainPage({ navigation }) {
  useEffect(() => {
    storeObject('answeredQuestion', {
      Alevel:[1,0,0],
      Sat:[1,1,1],
      Integral:[1,2,0],
      Differentiation:[1,2,0],
      Trigonometry:[1,2,0]
    });

    storeObject('userInfo', {
      points:12,
      lastlogin:1,
      lastchosen:"Sat"
    });
  }, []);

  return(
    <View style={styles.container}>
      <SvgGradient>
        <Text style={styles.text}>Smooth Gradient with SVG</Text>
      </SvgGradient>
      <BottomTab navigation={navigation} active={"main"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure background is transparent
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

export default MainPage;
