import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BodyText from '../textComponents/BodyText';
import Heading2Text from '../textComponents/Heading2Text';

const logo = require('../../images/whoget_white.png');
const profilePlaceHolder = require('../../images/icons/user.png');

type HeaderTitleProps = {
  style?: {};
  showProfile?: boolean;
  userImage?: string;
  username?: string;
  postDate?: string;
  profilePicture?: string;
};

export default function HeaderTitle(props: HeaderTitleProps) {
  return (
    <View style={styles.Container}>
      {props.showProfile ? (
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileImageContainer}>
            <Image
              source={
                props.profilePicture
                  ? {uri: props.profilePicture}
                  : profilePlaceHolder
              }
              style={styles.ProfileImage}
            />
          </View>
          <View style={styles.ProfileTextContainer}>
            <Heading2Text style={styles.ProfileText}>
              {props.username as string}
            </Heading2Text>
            <BodyText style={styles.ProfileText}>
              {`Posted ${props.postDate}`}
            </BodyText>
          </View>
        </View>
      ) : (
        <Image
          source={props.userImage ? props.userImage : logo}
          style={[styles.Logo, styles.Logo, props.style]}
        />
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
    width: 33,
    height: 33,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  ProfileTextContainer: {
    flexDirection: 'column',
  },
  ProfileText: {
    color: 'white',
  },
});
