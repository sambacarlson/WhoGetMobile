import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {whotheme} from '../../global/variables';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {auth} from '../../firebase/firebaseConfig';
const logo = require('../../images/whoget_green.png');
const facebook = require('../../images/icons/facebook.png');
const google = require('../../images/icons/google.png');

export default function Auth() {
  GoogleSignin.configure({
    webClientId:
      '676597152690-fvpb5vccfeocca13qafru15ep859sqek.apps.googleusercontent.com',
  });
  //
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  //
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  useEffect(() => {
    navigation.push('Splash');
  }, [navigation]);
  const [busy, setBusy] = useState<boolean>(false);
  const handleSkip = () => {
    navigation.push('AsksNav');
  };
  // const provider = new GoogleAuthProvider();
  const handleGoogleAuth = async () => {
    console.log('trying to authenticate...');
    setBusy(true);
    try {
      onGoogleButtonPress()
        .then(results => console.log(results))
        .catch(error => console.log(error));
    } catch (error) {
      console.log('an error occured');
      console.log(error);
    } finally {
      setBusy(false);
    }
  };
  const handleFacebookAuth = () => {
    setBusy(true);
    //FIXME: remove setTimeout
    setTimeout(() => {
      navigation.push('Interests');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <Image source={logo} style={styles.Logo} resizeMode="contain" />
      <Heading2Text style={styles.ContinueWithText}>
        continue with ...
      </Heading2Text>
      <View style={styles.IconsContainer}>
        <Pressable onPress={handleFacebookAuth}>
          <Image source={facebook} style={styles.Icon} />
        </Pressable>
        <Pressable onPress={handleGoogleAuth}>
          {/* <Pressable
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }> */}
          <Image source={google} style={styles.Icon} />
        </Pressable>
      </View>
      <BodyText style={styles.TermsText}>
        By continuing, you agree to our
      </BodyText>
      <BodyText style={styles.TermsText}>terms and conditions</BodyText>
      <ActionButton
        onPress={handleSkip}
        children={'skip'}
        style={styles.SkipButton}
      />
      <View>
        <ActivityIndicator
          animating={busy}
          color={whotheme.colors.primary}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 70,
  },
  Logo: {
    width: 180,
    height: 60,
    marginBottom: 60,
  },
  ContinueWithText: {
    marginBottom: 8,
  },
  IconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    marginTop: 20,
    marginBottom: 16,
  },
  Icon: {
    width: 46,
    height: 48,
    resizeMode: 'contain',
  },
  TermsText: {
    textAlign: 'center',
  },
  SkipButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
});
