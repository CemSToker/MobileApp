import React, { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { colours } from '../../colours';
import { useFocusEffect } from '@react-navigation/native';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SvgGradient = ({ children }) => {
  const x1 = useRef(new Animated.Value(0)).current;
  const y1 = useRef(new Animated.Value(0)).current;
  const x2 = useRef(new Animated.Value(1)).current;
  const y2 = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  const animateGradient = useCallback(() => {
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(x1, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(y1, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(x2, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(y2, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    );
    animationRef.current.start();
  }, [x1, y1, x2, y2]);

  useFocusEffect(
    useCallback(() => {
      animateGradient();

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [animateGradient])
  );

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <AnimatedLinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
            <Stop offset="0" stopColor={colours.background[0]} />
            <Stop offset="0.33" stopColor={colours.background[1]} />
            <Stop offset="0.66" stopColor={colours.background[2]} />
            <Stop offset="1" stopColor={colours.background[3]} />
          </AnimatedLinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View style={styles.overlay}>{children}</View>
    </View>
  );
};

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

export default SvgGradient;
