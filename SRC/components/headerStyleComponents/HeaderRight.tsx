import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {whotheme} from '../../global/variables';
import {ActionButton} from '../buttonComponents/ActionButton';

const menuIcon = require('../../images/icons/options.png');
const searchIcon = require('../../images/icons/search.png');
const EditIcon = require('../../images/icons/edit.png');

type HeaderRightProp = {
  onPressEdit?: any;
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
          <Pressable onPress={props.onPressEdit} style={styles.EditIcon}>
            <Image source={EditIcon} style={styles.EditIcon} />
          </Pressable>
          <Pressable onPress={props.onPressSearch} style={styles.SearchIcon}>
            <Image source={searchIcon} style={styles.SearchIcon} />
          </Pressable>
          <ActionButton
            onPress={props.onPressNewAsk}
            children={'+'}
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
    gap: 14,
  },
  ActionButtonStyle: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 20,
  },
  ActionButtonTextStyle: {
    color: whotheme.colors.primary,
    fontSize: whotheme.fontSize.medium,
  },
  SearchIcon: {
    width: 30,
    height: 30,
  },
  EditIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
