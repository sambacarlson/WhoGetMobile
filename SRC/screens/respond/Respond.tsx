import React from 'react';
import {StyleSheet, ScrollView, View, Image, SafeAreaView} from 'react-native';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import {whotheme} from '../../global/variables';

const whatsapp = require('../../images/icons/whatsapp.png');
const telephone = require('../../images/icons/telephone.png');
const email = require('../../images/icons/email.png');
const placeholderImage = require('../../images/icons/image.png');
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import HeaderTitle from '../../components/headerStyleComponents/HeaderTitle';
import HeaderLeft from '../../components/headerStyleComponents/HeaderLeft';

export default function Respond() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerTitle: () => <HeaderTitle showProfile={true} />,
    // eslint-disable-next-line react/no-unstable-nested-components
    headerLeft: () => <HeaderLeft onPress={() => navigation.pop()} />,
  });
  return (
    <SafeAreaView style={styles.Container}>
      <BodyText style={styles.TimeLeft}>3 days left</BodyText>
      <View style={styles.AskBody}>
        <ScrollView>
          <BodyText>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
            rerum expedita sint est eveniet accusantium.
          </BodyText>
          <BodyText style={styles.Categories}>
            Arts and crafs, workouts, culture
          </BodyText>
          <View style={styles.AskImages}>
            <Image source={placeholderImage} style={styles.AskImage} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.ReplyButtonsView}>
        <Image source={whatsapp} style={styles.ReplyButton} />
        <Image source={telephone} style={styles.ReplyButton} />
        <Image source={email} style={styles.ReplyButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  TimeLeft: {
    alignSelf: 'flex-end',
    color: whotheme.colors.tertiary,
    fontFamily: whotheme.fontFamily.bold,
  },
  AskBody: {
    flex: 4,
    marginTop: 16,
  },
  AskImages: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 1,
  },
  AskImage: {
    resizeMode: 'contain',
  },
  Categories: {
    alignSelf: 'center',
    color: whotheme.colors.tertiary,
    paddingVertical: 10,
  },
  ReplyButtonsView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    bottom: 0,
  },
  ReplyButton: {
    width: 50,
    height: 50,
  },
});
