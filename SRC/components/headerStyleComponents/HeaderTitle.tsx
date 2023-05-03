import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Heading2Text from '../baseTextComponents/heading2Text/Heading2Text';
import BodyText from '../baseTextComponents/bodyText/BodyText';

const logo = require('../../images/whoget_white.png');
const profilePlaceHolder = require('../../images/icons/user.png');

type HeaderTitleProps = {
  style?: {};
  showProfile?: boolean;
};

export default function HeaderTitle(props: HeaderTitleProps) {
  return (
    <View style={styles.Container}>
      {props.showProfile ? (
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileImageContainer}>
            <Image source={profilePlaceHolder} style={styles.ProfileImage} />
          </View>
          <View style={styles.ProfileTextContainer}>
            <Heading2Text style={styles.ProfileText}>Username</Heading2Text>
            <BodyText style={styles.ProfileText}>Posted 21 days ago</BodyText>
          </View>
        </View>
      ) : (
        <Image source={logo} style={[styles.Logo, styles.Logo, props.style]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginLeft: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 100,
    height: 25,
  },
  ProfileContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ProfileImageContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  ProfileImage: {
    width: 30,
    height: 30,
    // borderRadius: 100,
    resizeMode: 'cover',
  },
  ProfileTextContainer: {
    flexDirection: 'column',
  },
  ProfileText: {
    color: 'white',
  },
});
