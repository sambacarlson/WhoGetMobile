import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Pressable,
  Linking,
} from 'react-native';
import {whotheme} from '../../global/variables';

const whatsapp = require('../../images/icons/whatsapp.png');
const telephone = require('../../images/icons/telephone.png');
const email = require('../../images/icons/email.png');
const placeholderImage = require('../../images/icons/image.png');
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams, askType, userType} from '../../global/types';
import HeaderTitle from '../../components/headerStyleComponents/HeaderTitle';
// import HeaderLeft from '../../components/headerStyleComponents/HeaderLeft';
import {formattedDate, getTimeLeft} from '../../global/functions';
import BodyText from '../../components/textComponents/BodyText';
import {useAppSelector} from '../../redux/hooks';
// import {formatDistanceToNow} from 'date-fns';

export default function Respond({route}: any) {
  const {askId} = route.params;
  const loadedUser = useAppSelector(state => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [thisUser, setThisUser] = useState<userType>(loadedUser);
  const [isExpired, setIsExpired] = useState<boolean>(true);
  //get asks
  const oneAsk: askType = useAppSelector(
    state => state.ask.filter(ask => ask._id === askId)[0],
  );
  let greeting: string = '';
  if (oneAsk.user && thisUser) {
    greeting = `Hello, ${oneAsk.user.username}, I am ${
      thisUser.username
    }. I came across your request on *whoget*. from ${formattedDate(
      oneAsk.updatedAt,
    )}. `;
  }
  // // useEffect
  // useEffect(() => {
  //   getItemLocalStorage('@thisUser').then(value => setThisUser(value));
  // }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerTitle: () => (
      <HeaderTitle
        showProfile={true}
        username={oneAsk.user.username}
        postDate={`${formattedDate(oneAsk.createdAt)}`}
        profilePicture={oneAsk.user.photo}
      />
    ),
    // headerLeft: () => <HeaderLeft onPress={() => navigation.pop()} />,
  });
  const toDate = getTimeLeft(oneAsk.createdAt, oneAsk.expiry);
  useEffect(() => {
    toDate.seconds <= 0 && setIsExpired(true);
  }, [toDate.seconds]);
  return (
    <SafeAreaView style={styles.Container}>
      <BodyText style={styles.TimeLeft}>
        {toDate.days > 0
          ? `${toDate.days} days left`
          : toDate.hours > 0
          ? `${toDate.hours} hours left`
          : toDate.minutes > 0
          ? `${toDate.minutes} minutes left`
          : 'expired'}
      </BodyText>
      <View style={styles.AskBody}>
        <ScrollView>
          <BodyText>{oneAsk.message}</BodyText>
          <BodyText style={styles.Categories}>
            {oneAsk.categories.join(', ')}
          </BodyText>
          {oneAsk.images[0] && (
            <View style={styles.AskImages}>
              <Image source={placeholderImage} style={styles.AskImage} />
            </View>
          )}
        </ScrollView>
      </View>
      {!isExpired && (
        <View style={styles.ReplyButtonsView}>
          <Pressable
            onPress={() => {
              thisUser
                ? oneAsk.user && Linking.openURL(`tel:${oneAsk.user.telephone}`)
                : navigation.navigate('Auth');
            }}>
            <Image source={telephone} style={styles.ReplyButton} />
          </Pressable>
          {oneAsk.user && oneAsk.user.whatsapp && (
            <Pressable
              onPress={() => {
                thisUser
                  ? Linking.openURL(
                      `whatsapp://send?phone=${oneAsk.user.whatsapp}&text=${greeting}`,
                    )
                  : navigation.navigate('Auth');
              }}>
              <Image source={whatsapp} style={styles.ReplyButton} />
            </Pressable>
          )}
          {oneAsk.user && oneAsk.user.email && (
            <Pressable
              onPress={() => {
                thisUser
                  ? Linking.openURL(
                      `mailto:${oneAsk.user.email}?subject=reply to your request on whoget&body=${greeting}`,
                    )
                  : navigation.navigate('Auth');
              }}>
              <Image source={email} style={styles.ReplyButton} />
            </Pressable>
          )}
        </View>
      )}
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
    // backgroundColor: '#f0f0f0',
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  AskImage: {
    resizeMode: 'contain',
  },
  Categories: {
    // alignSelf: 'center',
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
