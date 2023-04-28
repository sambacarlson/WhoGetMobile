import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {whotheme} from '../../global/variables';

const logo = require('../../images/whoget_white.png');

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.Logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={whotheme.colors.tertiary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whotheme.colors.primary,
  },
  Logo: {
    width: 120,
    height: 60,
  },
});
