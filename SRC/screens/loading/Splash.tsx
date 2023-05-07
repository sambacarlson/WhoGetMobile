import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {whotheme} from '../../global/variables';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';

const logo = require('../../images/whoget_white.png');

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //FIXME: remove setTimeout
  setTimeout(() => navigation.pop(), 1000);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      <Image source={logo} style={styles.Logo} resizeMode="contain" />
      <ActivityIndicator
        animating={loading}
        size="large"
        color={whotheme.colors.tertiary}
      />
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
    width: 160,
    height: 80,
  },
});
