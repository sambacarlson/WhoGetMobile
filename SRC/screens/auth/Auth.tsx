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
const logo = require('../../images/whoget_green.png');
const facebook = require('../../images/icons/facebook.png');
const google = require('../../images/icons/google.png');

export default function Auth() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  useEffect(() => {
    navigation.push('Splash');
  }, [navigation]);
  const [busy, setBusy] = useState<boolean>(false);
  const handleSkip = () => {
    setBusy(true);
    setTimeout(() => {
      navigation.push('AsksNav');
    }, 500);
  };
  const handleFacebookAuth = () => {
    setBusy(true);
  };
  const handleGoogleAuth = () => {
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
