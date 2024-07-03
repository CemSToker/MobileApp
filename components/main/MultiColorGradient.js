import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MultiColorGradient = (props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.gradient, { backgroundColor: '#ff7e5f', zIndex: 1 }]} />
      <View style={[styles.gradient, { backgroundColor: '#feb47b', zIndex: 2, opacity: 0.75 }]} />
      <View style={[styles.gradient, { backgroundColor: '#6a82fb', zIndex: 3, opacity: 0.5 }]} />
      <View style={[styles.gradient, { backgroundColor: '#fc5c7d', zIndex: 4, opacity: 0.25 }]} />
      <View style={styles.overlay}>
        {props.children}
      </View>
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
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});

export default MultiColorGradient;