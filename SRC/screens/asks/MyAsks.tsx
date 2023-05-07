import React from 'react';
import {StyleSheet, View} from 'react-native';
import AskCard from '../../components/compoundComponents/AskCard';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';

export default function MyAsks() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  return (
    <View style={styles.Container}>
      {/* <AskCard onPress={() => navigation.navigate('EditAsk')} /> */}
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
