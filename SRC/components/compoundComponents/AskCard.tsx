import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {whotheme} from '../../global/variables';
import BodyText from '../textComponents/BodyText';
import Heading2Text from '../textComponents/Heading2Text';

const profilePlaceholderImage = require('../../images/icons/user.png');
// const profilePlaceholderImage2 = require('../../images/icons/google.png');

type AskCardProps = {
  onPress: any;
  username: string;
  message: string;
  expiry: string;
  profilePhoto?: string;
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
          {
            <Image
              source={
                props.profilePhoto
                  ? {uri: props.profilePhoto}
                  : profilePlaceholderImage
              }
              style={styles.Image}
              resizeMode="cover"
            />
          }
        </View>
        <View style={styles.BodyTextView}>
          <View style={styles.BodyTextInfoView}>
            <Heading2Text>{props.username}</Heading2Text>
            <BodyText style={styles.DateText}>{`${props.expiry}`}</BodyText>
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
    gap: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    gap: 2,
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
