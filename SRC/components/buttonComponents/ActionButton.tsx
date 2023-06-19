import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {whotheme} from '../../global/variables';

export function ActionButton(props: {
  onPress: any;
  busy?: boolean;
  disabled?: boolean;
  style?: {};
  textStyle?: {};
  children: any;
}) {
  const disabledBtn: boolean = props.disabled || props.busy ? true : false;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      disabled={disabledBtn}
      style={[styles.defaultContainerStyle, props.style]}>
      <View style={[styles.defaultViewStyle]}>
        <Text style={[styles.defaultTextStyle, props.textStyle]}>
          {props.children}
        </Text>
        {props.busy && <ActivityIndicator color="white" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: whotheme.colors.primaryLight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    padding: 12,
  },
  defaultViewStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultTextStyle: {
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: 'Montserrat-Bold',
  },
});
