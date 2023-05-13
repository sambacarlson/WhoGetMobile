import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AskCard from '../../components/compoundComponents/AskCard';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import {whotheme} from '../../global/variables';
import {useAppSelector} from '../../redux/redux_store/hooks';
import {askType} from '../../redux/services/types';
import {formatDistanceToNow} from 'date-fns';

export default function MyAsks() {
  // const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const allAsks = useAppSelector(state => state.ask);
  const thisUser = useAppSelector(state => state.user); //the dispatch to get this user is made on allAsks screen
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [asksData, setAsksData] = useState<askType[]>(
    allAsks.asks.filter(a => a.userInfo.user_id === thisUser.user._id),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [busy, setBusy] = useState<boolean>(false);
  // const [googleUid, setGoogleUid] = useState<string | null>('');
  // console.log(googleUid);
  // getUid().then(value => {
  //   setGoogleUid(value);
  // });
  // clearLocalStorage().then(() => console.log('storage cleared'));
  // /**fetch on mount*/
  // useEffect(() => {
  //   console.log('uid===>>', googleUid);
  //   if (googleUid) {
  //     dispatch(fetchUser(googleUid));
  //   } else {
  //     console.log('user not subscribed');
  //     return;
  //   }
  //   try {
  //     setBusy(true);
  //     dispatch(fetchAsks()).then(response => setAsksData(response.payload));
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setBusy(false);
  //   }
  // }, [dispatch, googleUid]);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      {busy && (
        <View style={styles.LoadingContainer}>
          <ActivityIndicator size={'large'} color={whotheme.colors.tertiary} />
        </View>
      )}
      {false && (
        <View style={styles.ErrorContainer}>
          <BodyText>{'an error occured'}</BodyText>
        </View>
      )}
      {/* {!busy && !asksData && ( */}
      {true && (
        <View style={styles.LoadingContainer}>
          <BodyText>{'No asks to show right now ☹️'}</BodyText>
        </View>
      )}
      <ScrollView style={styles.ScrollableView}>
        {asksData &&
          asksData.length > 0 &&
          asksData.map(ask => (
            <AskCard
              key={ask._id}
              onPress={() => navigation.navigate('EditAsk', {askId: ask._id})}
              username={ask.userInfo.username}
              // onPress={() => {}}
              message={ask.message}
              expiry={`${formatDistanceToNow(new Date(ask.createdAt))}`}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    flex: 1,
  },
  ScrollableView: {
    flex: 1,
  },
  LoadingContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ErrorContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
