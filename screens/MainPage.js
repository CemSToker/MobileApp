import React, { useEffect, useRef } from 'react'
import BottomTab from '../components/main/BottomTab';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { colours } from '../colours';

function mainpage({ navigation }) {
  const color1 = useRef(new Animated.Value(0)).current;
  const color2 = useRef(new Animated.Value(0)).current;
  const color3 = useRef(new Animated.Value(0)).current;
  const color4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(color1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(color2, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(color3, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(color4, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [color1, color2, color3, color4]);

  const backgroundColor1 = color1.interpolate({
    inputRange: [0, 1],
    outputRange: [colours.background[0], colours.background[1]],
  });

  const backgroundColor2 = color2.interpolate({
    inputRange: [0, 1],
    outputRange: [colours.background[1], colours.background[2]],
  });

  const backgroundColor3 = color3.interpolate({
    inputRange: [0, 1],
    outputRange: [colours.background[2], colours.background[3]],
  });

  const backgroundColor4 = color4.interpolate({
    inputRange: [0, 1],
    outputRange: [colours.background[3], colours.background[4]],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradient, { backgroundColor: backgroundColor1 }]} />
      <Animated.View style={[styles.gradient, { backgroundColor: backgroundColor2 }]} />
      <Animated.View style={[styles.gradient, { backgroundColor: backgroundColor3 }]} />
      <Animated.View style={[styles.gradient, { backgroundColor: backgroundColor4 }]} />
      <View style={styles.overlay}>
        <Text style={styles.text}>Smooth Gradient without Library</Text>
      </View>
      <Text>Home Screen</Text>
      <BottomTab navigation={navigation} active={"main"}/>
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.5,
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

export default mainpage