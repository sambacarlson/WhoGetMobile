import React from 'react';
import AllAsks from './AllAsks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MyAsks from './MyAsks';
import {StyleSheet, View} from 'react-native';

export default function AsksNav() {
  return (
    <View style={styles.Container}>
      <AllAsks />
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
