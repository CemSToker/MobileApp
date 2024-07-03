import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
//import { colours } from '../../colours';
/*
const colors = [
    '#4b0082', '#800080', '#4b0082', '#551a8b', '#3a005f', 
    '#483d8b', '#6a5acd', '#7b68ee', '#00008b', '#0000cd', 
    '#191970', '#000080', '#2e0854', '#4b0082', '#2f4f4f', 
    '#1c1c1c', '#0f0f0f'
  ];
  */
const colors = ["white","white"]
const SvgGradientStatic = ({ children }) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateColors = () => {
      Animated.loop(
        Animated.sequence(
          colors.map((_, index) =>
            Animated.timing(colorAnim, {
              toValue: index + 1,
              duration: 3000,
              useNativeDriver: false,
            })
          )
        )
      ).start();
    };

    animateColors();
  }, [colorAnim]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: colors.map((_, index) => index),
    outputRange: colors,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { backgroundColor }]}>
        <View style={styles.overlay}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure transparent background
  },
  animatedContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default SvgGradientStatic;
