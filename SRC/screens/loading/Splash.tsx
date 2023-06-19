import React, {useEffect, useState} from 'react';
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
import {getItemLocalStorage} from '../../global/functions';
import {useAppDispatch} from '../../redux/hooks';
import {populateUser} from '../../redux/slices/userSlice';

const logo = require('../../images/whoget_white.png');

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  // const [thisUser, setThisUser] = useState<userType>();
  useEffect(() => {
    setLoading(true);
    getItemLocalStorage('@thisUser').then(results => {
      if (results) {
        dispatch(populateUser(results));
        navigation.pop();
        navigation.pop();
        navigation.navigate('AsksNav');
        setLoading(false);
      } else {
        navigation.pop();
        setLoading(false);
      }
    });
  }, [dispatch, navigation]);
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
