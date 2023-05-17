import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

const backIcon = require('../../images/icons/previous_light.png');

type HeaderLeftProp = {
  onPress: () => any;
};

export default function HeaderLeft(props: HeaderLeftProp) {
  return (
    <Pressable onPress={props.onPress} style={styles.Container}>
      <Image source={backIcon} style={styles.Icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 4,
  },
  Icon: {
    width: 16,
    height: 20,
    marginBottom: 6,
    resizeMode: 'stretch',
  },
});
