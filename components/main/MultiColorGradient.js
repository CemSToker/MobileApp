import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colours } from '../../colours';
const MultiColorGradient = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.gradient, styles.gradient1]} />
      <View style={[styles.gradient, styles.gradient2]} />
      <View style={[styles.gradient, styles.gradient3]} />
      <View style={[styles.gradient, styles.gradient4]} />
      <View style={[styles.gradient, styles.gradient5]} />
      <View style={[styles.gradient, styles.gradient6]} />
      <View style={[styles.gradient, styles.gradient7]} />
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
  },
  gradient1: {
    top: 0,
    height: '14.29%',
    backgroundColor: colours.background[0],
  },
  gradient2: {
    top: '14.29%',
    height: '14.29%',
    backgroundColor: colours.background[1],
    opacity: 0.9,
  },
  gradient3: {
    top: '28.58%',
    height: '14.29%',
    backgroundColor: colours.background[2],
    opacity: 0.8,
  },
  gradient4: {
    top: '42.87%',
    height: '14.29%',
    backgroundColor: colours.background[3],
    opacity: 0.7,
  },
  gradient5: {
    top: '57.16%',
    height: '14.29%',
    backgroundColor: colours.background[4],
    opacity: 0.6,
  },
  gradient6: {
    top: '71.45%',
    height: '14.29%',
    backgroundColor: colours.background[5],
    opacity: 0.5,
  },
  gradient7: {
    top: '85.74%',
    height: '14.29%',
    backgroundColor: colours.background[6],
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});

export default MultiColorGradient;

