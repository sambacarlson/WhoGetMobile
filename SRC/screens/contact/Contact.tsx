import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import {ScrollView} from 'react-native-gesture-handler';
import Heading1Text from '../../components/baseTextComponents/heading1Text/Heading1Text';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import BaseInputComponent from '../../components/baseInputComponents/BaseInputComponent';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {whotheme} from '../../global/variables';
import {useAppDispatch, useAppSelector} from '../../redux/redux_store/hooks';
import {setUserAuth} from '../../redux/services/redux_slices/userAuthSlice';
import {createUser} from '../../redux/services/redux_slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image_add = require('../../images/icons/image_add.png');

export default function Contact() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();

  const [busy, setBusy] = useState<boolean>(false);
  const currentUserAuthState = useAppSelector(state => state.userAuth);
  console.log('auth state ======>>>>>', currentUserAuthState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    username?: string;
    whatsapp?: number;
    telephone?: number;
    email?: string;
    photo?: string;
  }>({
    username: currentUserAuthState.username,
    whatsapp: currentUserAuthState.telephone,
    telephone: currentUserAuthState.telephone,
    email: currentUserAuthState.email,
    photo: currentUserAuthState.photo,
  });

  const handleFormChange = (name: string, value: string | number) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSave = async () => {
    setBusy(true);
    dispatch(setUserAuth(formData));
    try {
      await dispatch(createUser(formData));
      await AsyncStorage.setItem('uid', currentUserAuthState.uid);
      navigation.navigate('AsksNav');
    } catch (error) {
      console.log(error);
      // navigation.navigate('AsksNav');
    } finally {
      setBusy(false);
    }
  };
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
            <ActionButton onPress={handleSave} busy={busy}>
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
});
