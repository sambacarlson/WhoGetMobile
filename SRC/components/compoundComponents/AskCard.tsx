import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BodyText from '../baseTextComponents/bodyText/BodyText';
import Heading2Text from '../baseTextComponents/heading2Text/Heading2Text';
import {whotheme} from '../../global/variables';

const profilePlaceholderImage = require('../../images/icons/user.png');
const profilePlaceholderImage2 = require('../../images/icons/google.png');

export default function AskCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <View style={styles.Container}>
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
            <Heading2Text>username</Heading2Text>
            <BodyText style={styles.DateText}>2 days</BodyText>
          </View>
          <BodyText>
            Here is the actual body of the ask. monog aldf jl ald lja; jdf
          </BodyText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  CardContainer: {
    paddingVertical: 8,
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