import React from 'react';
import {StyleSheet} from 'react-native';
import {whotheme} from '../../global/variables';
import {TextInput} from 'react-native-gesture-handler';
import BodyText from '../baseTextComponents/bodyText/BodyText';

export default function BaseInputComponent(props: {
  style?: {};
  rows?: number;
  onChangeText: any;
  numberOfLines?: number;
  children: string | number;
  textStyle?: {};
}) {
  return (
    <TextInput
      style={[styles.defaultStyle, props.style]}
      onChangeText={props.onChangeText}
      multiline={
        props.numberOfLines !== undefined && props.numberOfLines > 1
          ? true
          : false
      }
      numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
      selectionColor={whotheme.colors.tertiary}>
      <BodyText style={props.textStyle}>{`${props.children}`}</BodyText>
    </TextInput>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderWidth: 1,
    borderColor: whotheme.colors.secondary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingLeft: 16,
    paddingRight: 5,
    textAlign: 'left',
  },
  defaultTextStyle: {},
});
