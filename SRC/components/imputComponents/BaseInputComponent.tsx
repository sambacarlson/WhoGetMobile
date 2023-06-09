import React from 'react';
import {InputModeOptions, StyleSheet} from 'react-native';
import {whotheme} from '../../global/variables';
import {TextInput} from 'react-native-gesture-handler';
import BodyText from '../textComponents/BodyText';

export default function BaseInputComponent(props: {
  style?: {};
  multiline?: boolean;
  onChangeText: any;
  numberOfLines?: number;
  children?: string | number;
  textStyle?: {};
  inputMode?: InputModeOptions;
  autoFocus?: boolean;
}) {
  return (
    <TextInput
      style={[styles.defaultStyle, props.style]}
      onChangeText={props.onChangeText}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
      inputMode={props.inputMode}
      autoFocus={props.autoFocus}
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
