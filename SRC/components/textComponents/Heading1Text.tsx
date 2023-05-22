import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {whotheme} from '../../global/variables';

export default function Heading1Text(props: {style?: {}; children: string}) {
  return (
    <Text style={[styles.defaultStyle, props.style]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: whotheme.colors.secondary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
  },
});
