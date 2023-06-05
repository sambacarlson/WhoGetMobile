import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams, tempUserType} from '../../global/types';
import {ScrollView} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';
import {BASE_URL, whotheme} from '../../global/variables';

import {
  getItemLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from '../../global/functions';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import BaseInputComponent from '../../components/imputComponents/BaseInputComponent';
import BodyText from '../../components/textComponents/BodyText';
import Heading1Text from '../../components/textComponents/Heading1Text';
import Heading2Text from '../../components/textComponents/Heading2Text';
import axios from 'axios';

const image_add = require('../../images/icons/image_add.png');

export default function Contact() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();

  // const [tempThisUser, setTempThisUser] = useState<any>();
  const [busy, setBusy] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<tempUserType>({
    username: '',
    oAuthId: '',
    oAuthProvider: '',
    whatsapp: 237,
    telephone: 237,
    email: '',
    photo: '',
    interests: [],
    status: {banned: false, bannedDate: ''},
  });
  const [fault, setFault] = useState<boolean>(false);

  const handleFormChange = (name: string, value: string | number) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSave = async () => {
    setBusy(true);
    setFault(false);
    try {
      // console.log('<<====FormData===>>', formData, '<<//////>>');
      const user = await axios.post(`${BASE_URL}/users/one`, {...formData});
      // console.log('user====>>>', user.data);
      await setItemLocalStorage('@thisUser', JSON.stringify(user.data));
      await removeItemLocalStorage('@tempThisUser');
      setBusy(false);
      navigation.navigate('AsksNav');
    } catch (error) {
      setBusy(false);
      setFault(true);
      // console.log('error occured =====>> ', error);
    }
  };

  useEffect(() => {
    getItemLocalStorage('@tempThisUser').then(item => {
      // console.log('======>> formost', item);
      setFormData(prev => ({...prev, ...item}));
      // console.log('=====>>>this next');
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      <ScrollView style={styles.Container}>
        <Heading1Text>How can you be contacted?</Heading1Text>
        <BodyText>Provide at least 2 contact informations</BodyText>
        <View style={styles.FormContainer}>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Username</Heading2Text>
            <BaseInputComponent onChangeText={handleFormChange}>
              {formData?.username}
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>WhatsApp</Heading2Text>
            <BaseInputComponent
              onChangeText={(value: number) =>
                handleFormChange('whatsapp', value)
              }
              inputMode="numeric">
              {formData?.whatsapp || ''}
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Telephone</Heading2Text>
            <BaseInputComponent
              onChangeText={(value: number) =>
                handleFormChange('telephone', value)
              }
              inputMode="numeric">
              {formData?.telephone || ''}
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Email</Heading2Text>
            <BaseInputComponent
              onChangeText={(value: string) =>
                handleFormChange('email', value)
              }>
              {formData?.email}
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Profile picture</Heading2Text>
            <View style={styles.ProfilePicture}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Image
                  source={{uri: formData?.photo} || image_add}
                  style={styles.ImageAdd}
                />
              )}
            </View>
          </View>
          <View style={styles.ActionButton}>
            <ActionButton
              onPress={handleSave}
              busy={busy}
              style={fault && styles.FaultOccured}>
              Save
            </ActionButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  FormContainer: {
    marginTop: 20,
  },
  FormFieldsContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    gap: 4,
  },
  ProfilePicture: {
    width: 200,
    height: 200,
    borderRadius: 0,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActionButton: {
    marginBottom: 50,
    marginTop: 20,
  },
  ImageAdd: {
    width: '100%',
    height: '100%',
  },
  FaultOccured: {
    backgroundColor: whotheme.colors.tertiary,
  },
});
