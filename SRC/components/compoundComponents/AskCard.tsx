import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import BodyText from '../baseTextComponents/bodyText/BodyText';
import Heading2Text from '../baseTextComponents/heading2Text/Heading2Text';
import {whotheme} from '../../global/variables';

const profilePlaceholderImage = require('../../images/icons/user.png');
const profilePlaceholderImage2 = require('../../images/icons/google.png');

type AskCardProps = {
  onPress: any;
  username: string;
  message: string;
  expiry: string;
};

export default function AskCard(props: AskCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Pressable
      onPress={props.onPress}
      style={styles.Container}
      android_ripple={{color: '#f0f0f0'}}>
      <View style={styles.CardContainer}>
        <View style={styles.ImageContainer}>
          {loading ? (
            <Image
              source={profilePlaceholderImage}
              style={styles.Image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={profilePlaceholderImage2}
              style={styles.Image}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.BodyTextView}>
          <View style={styles.BodyTextInfoView}>
            <Heading2Text>{props.username}</Heading2Text>
            <BodyText
              style={styles.DateText}>{`${props.expiry} days`}</BodyText>
          </View>
          <BodyText>{props.message}</BodyText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  CardContainer: {
    padding: 8,
    gap: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 35,
    height: 35,
  },
  Image: {
    width: 40,
    height: 40,
    // backgroundColor: '#f000f0',
    backgroundColor: '#e0e0e0',
    borderRadius: 100,
  },
  BodyTextView: {
    flexDirection: 'column',
    flex: 1,
  },
  BodyTextInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DateText: {
    color: whotheme.colors.tertiary,
  },
});
