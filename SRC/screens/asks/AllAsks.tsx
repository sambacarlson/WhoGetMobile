import React from 'react';
import {StyleSheet, View} from 'react-native';
import AskCard from '../../components/compoundComponents/AskCard';

export default function AllAsks() {
  return (
    <View style={styles.Container}>
      <AskCard />
      <AskCard />
      <AskCard />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
});
