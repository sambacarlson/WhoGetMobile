import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import {whotheme} from '../../global/variables';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import HeaderLeft from '../../components/headerStyleComponents/HeaderLeft';
const editButton = require('../../images/icons/edit.png');
const deleteButton = require('../../images/icons/delete.png');
const askImage = require('../../images/icons/image_add.png');

export default function EditAsk() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerLeft: () => <HeaderLeft onPress={() => navigation.pop()} />,
  });
  return (
    <View style={styles.Container}>
      <ScrollView style={styles.Wrapper}>
        <View style={styles.ContainerView}>
          <View style={styles.TopRow}>
            <BodyText style={styles.Expiry}>2 days</BodyText>
            <View style={styles.EditIcons}>
              <Image source={editButton} style={styles.EditAndDeleteButton} />
              <Image source={deleteButton} style={styles.EditAndDeleteButton} />
            </View>
          </View>
          <View style={styles.AskBody}>
            <BodyText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
              possimus ratione vel tenetur adipisci optio!
            </BodyText>
            <BodyText style={styles.Categories}>
              'Education', 'Finance', 'Agriculture'
            </BodyText>
          </View>
          <View style={styles.AskImageView}>
            <Image source={askImage} style={styles.AskImage} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.ActionButtonView}>
        <ActionButton onPress={undefined} busy={isBusy}>
          Done
        </ActionButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: 'white',
    flex: 1,
  },
  Container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
  },
  ContainerView: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    height: '100%',
  },
  TopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Expiry: {
    color: whotheme.colors.tertiary,
  },
  EditIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  EditAndDeleteButton: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  AskBody: {
    flexDirection: 'column',
    gap: 8,
  },
  Categories: {
    color: whotheme.colors.tertiary,
  },
  AskImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  AskImage: {
    width: 40,
    height: 40,
  },
  ActionButtonView: {
    paddingTop: 8,
    paddingBottom: 32,
    width: '100%',
  },
});
