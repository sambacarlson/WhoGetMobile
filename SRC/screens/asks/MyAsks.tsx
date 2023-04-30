import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MyAsks() {
  return (
    <View style={styles.Container}>
      <Text> Asks i've made in the past </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
});
