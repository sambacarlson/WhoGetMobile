import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Heading1Text from '../../components/baseTextComponents/heading1Text/Heading1Text';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import BaseInputComponent from '../../components/baseInputComponents/BaseInputComponent';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const image_add = require('../../images/icons/image_add.png');

export default function Contact() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [busy, setBusy] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <ScrollView style={styles.Container}>
        <Heading1Text>How can you be contacted?</Heading1Text>
        <BodyText>Provide at least 2 contact informations</BodyText>
        <View style={styles.FormContainer}>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Username</Heading2Text>
            <BaseInputComponent onChangeText={undefined}>
              name
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>WhatsApp</Heading2Text>
            <BaseInputComponent onChangeText={undefined}>
              name
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Telephone</Heading2Text>
            <BaseInputComponent onChangeText={undefined}>
              name
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Email</Heading2Text>
            <BaseInputComponent onChangeText={undefined}>
              name
            </BaseInputComponent>
          </View>
          <View style={styles.FormFieldsContainer}>
            <Heading2Text>Profile picture</Heading2Text>
            <View style={styles.ProfilePicture}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Image source={image_add} style={styles.ImageAdd} />
              )}
            </View>
          </View>
          <View style={styles.ActionButton}>
            <ActionButton onPress={undefined} busy={busy}>
              Next
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
    width: 40,
    height: 40,
  },
});
