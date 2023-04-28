import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {whotheme} from '../../../global/variables';

export function ActionButton(props: {
  onPress: any;
  style?: {};
  textStyle?: {};
  children: string;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={[styles.defaultContainerStyle, props.style]}>
      <View style={[styles.defaultViewStyle]}>
        <Text style={[styles.defaultTextStyle, props.textStyle]}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: whotheme.colors.primaryLight,
    flexDirection: 'column',
    borderRadius: 1000,
  },
  defaultViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultTextStyle: {
    color: 'white',
    padding: 10,
    fontFamily: 'Montserrat-Bold',
  },
});
