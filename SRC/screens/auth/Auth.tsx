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
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import BodyText from '../../components/textComponents/BodyText';
import Heading2Text from '../../components/textComponents/Heading2Text';
import {RouteStackParams} from '../../global/types';
import {getItemLocalStorage, setItemLocalStorage} from '../../global/functions';
// import {auth} from '../../firebase/firebaseConfig';
const logo = require('../../images/whoget_green.png');
// const facebook = require('../../images/icons/facebook.png');
const google = require('../../images/icons/google.png');

export default function Auth() {
  // const dispatch = useAppDispatch();
  // google signin configuration..
  GoogleSignin.configure({
    webClientId:
      '676597152690-fvpb5vccfeocca13qafru15ep859sqek.apps.googleusercontent.com',
  });
  //handle google sign in procedure
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
  const [busy, setBusy] = useState<boolean>(false);
  const [fault, setFault] = useState<string>('');
  const [thisUser, setThisUser] = useState<any>();
  const handleSkip = () => {
    navigation.push('AsksNav');
  };
  // handle google sign in button press.
  const handleGoogleAuth = async () => {
    setBusy(true);
    try {
      /** if user information is not found on local storage? */
      !thisUser &&
        onGoogleButtonPress()
          .then(userObj => {
            /** collect basic information from user from auth  */
            const {uid, email, displayName, photoURL} = userObj.user;
            setItemLocalStorage(
              '@tempThisUser',
              JSON.stringify({
                oAuthId: uid,
                oAuthProvider: 'google',
                email,
                username: displayName,
                photo: photoURL,
              }),
            );
            navigation.navigate('Interests');
          })
          /// if an error occurs communicating with google
          .catch(() => {
            setBusy(false);
            setFault('could not sign in');
          });
      thisUser && navigation.navigate('AsksNav');
    } catch (error: any) {
      // in case any other errors occur
      setFault('an error occured');
    } finally {
      setBusy(false);
    }
  };
  /**
  const handleFacebookAuth = () => {
    setBusy(true);
    //FIXME: remove setTimeout
    setTimeout(() => {
      navigation.push('Interests');
    }, 500);
  };
  */

  useEffect(() => {
    // navigation.push('Splash');
    getItemLocalStorage('@thisUser').then(results => setThisUser(results));
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <Image source={logo} style={styles.Logo} resizeMode="contain" />
      <Heading2Text style={styles.ContinueWithText}>
        continue with ...
      </Heading2Text>
      <View style={styles.IconsContainer}>
        {/* <Pressable onPress={handleFacebookAuth}>
          <Image source={facebook} style={styles.Icon} />
        </Pressable> */}
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
        {fault && <BodyText style={styles.ErrorText}>{fault}</BodyText>}
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
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 3,
    // alignSelf: 'flex-end',
    marginTop: 16,
  },
  ErrorText: {
    textAlign: 'center',
    color: whotheme.colors.tertiary,
  },
});
