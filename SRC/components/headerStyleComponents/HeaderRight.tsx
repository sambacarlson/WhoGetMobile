import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {whotheme} from '../../global/variables';
import {ActionButton} from '../buttonComponents/ActionButton';

const menuIcon = require('../../images/icons/options.png');
const searchIcon = require('../../images/icons/search.png');

type HeaderRightProp = {
  onPressSearch?: any;
  onPressNewAsk?: any;
  onPressMenu?: any;
  showMenu?: boolean;
};

export default function HeaderRight(props: HeaderRightProp) {
  return (
    <View style={styles.Container}>
      {props.showMenu ? (
        <Pressable onPress={props.onPressMenu}>
          <Image source={menuIcon} />
        </Pressable>
      ) : (
        <View style={styles.Container}>
          <Pressable onPress={props.onPressSearch} style={styles.SearchIcon}>
            <Image source={searchIcon} style={styles.SearchIcon} />
          </Pressable>
          <ActionButton
            onPress={props.onPressNewAsk}
            children={'new ask'}
            style={styles.ActionButtonStyle}
            textStyle={styles.ActionButtonTextStyle}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingRight: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  ActionButtonStyle: {
    width: 60,
    height: 24,
    backgroundColor: 'white',
    //padding elements stated individually to overite those set on the ActionButtonComponent
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },
  ActionButtonTextStyle: {
    color: whotheme.colors.primary,
    fontSize: whotheme.fontSize.small,
    fontWeight: '100',
    whiteSpace: 'no-wrap',
  },
  SearchIcon: {
    width: 24,
    height: 24,
  },
});
