import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import AskCard from '../../components/compoundComponents/AskCard';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import {whotheme} from '../../global/variables';

export default function AllAsks() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      <AskCard onPress={() => navigation.navigate('Respond')} />
      <AskCard onPress={() => navigation.navigate('Respond')} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    flex: 1,
  },
});
