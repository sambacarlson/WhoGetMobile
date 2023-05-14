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
// import HeaderLeft from '../../components/headerStyleComponents/HeaderLeft';
import {useAppDispatch, useAppSelector} from '../../redux/redux_store/hooks';
import {askType, userType} from '../../redux/services/types';
import {formattedDate, getUid} from '../../global/functions';
// import {formatDistanceToNow} from 'date-fns';
import {fetchUser} from '../../redux/services/redux_slices/userSlice';

export default function Respond({route}) {
  const {askId} = route.params;
  const dispatch = useAppDispatch();
  const [thisUser, setThisUser] = useState<userType>();
  const thisAsk: askType = useAppSelector(
    state => state.ask.asks.filter(ask => ask._id === askId)[0],
  );
  //user who wants to respond must be logged In
  getUid().then(uid => {
    uid === null && navigation.navigate('Auth');
  });
  // useEffect
  useEffect(() => {
    // user who created the ask
    dispatch(fetchUser({userDbId: thisAsk.userInfo.user_id})).then(user =>
      setThisUser(user.payload),
    );
  }, [dispatch, thisAsk.userInfo.user_id]);
  // const thisUsers = useAppSelector(state => state.user.users);
  // console.log(thisUser);
  // const thisUser = {
  //   telephone: 677964952,
  //   whatsapp: 677964952,
  //   email: 'sambacarlson@yahoo.com',
  // };
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerTitle: () => (
      <HeaderTitle
        showProfile={true}
        username={thisAsk.userInfo.username}
        postDate={`${formattedDate(thisAsk.createdAt)}`}
      />
    ),
    // headerLeft: () => <HeaderLeft onPress={() => navigation.pop()} />,
  });
  return (
    <SafeAreaView style={styles.Container}>
      <BodyText style={styles.TimeLeft}>
        {thisAsk.expiry.toString() + ' days'}
      </BodyText>
      <View style={styles.AskBody}>
        <ScrollView>
          <BodyText>{thisAsk.message}</BodyText>
          <BodyText style={styles.Categories}>
            {thisAsk.categories.join(', ')}
          </BodyText>
          {thisAsk.image && (
            <View style={styles.AskImages}>
              <Image source={placeholderImage} style={styles.AskImage} />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.ReplyButtonsView}>
        <Pressable
          onPress={() => {
            thisUser && Linking.openURL(`tel:${thisUser.telephone}`);
          }}>
          <Image source={telephone} style={styles.ReplyButton} />
        </Pressable>
        {thisUser && thisUser.whatsapp && (
          <Pressable
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?text=Hello,&phone=${thisUser.whatsapp}`,
              );
            }}>
            <Image source={whatsapp} style={styles.ReplyButton} />
          </Pressable>
        )}
        {thisUser && thisUser.email && (
          <Pressable
            onPress={() => {
              Linking.openURL(
                `mailto:${thisUser.email}?subject=Reply to your ${thisAsk.updatedAt}ask on whoget&body=Hello`,
              );
            }}>
            <Image source={email} style={styles.ReplyButton} />
          </Pressable>
        )}
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
