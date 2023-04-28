import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {whotheme} from '../../../global/variables';
import BodyText from '../../baseTextComponents/bodyText/BodyText';
export default function CategoryButton(props: {
  onPress: any;
  style?: {};
  children: string;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={[styles.defaultStyle, props.style]}>
      <BodyText>{props.children}</BodyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: whotheme.colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
