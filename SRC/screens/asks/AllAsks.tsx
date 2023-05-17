import React, {useEffect, useState} from 'react';
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
import {whotheme} from '../../global/variables';
import {useAppDispatch, useAppSelector} from '../../redux/redux_store/hooks';
import {askType} from '../../redux/services/types';
import {fetchAsks} from '../../redux/services/requests';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import {formatDistanceToNow} from 'date-fns';
import {getUid} from '../../global/functions';
import {fetchUser} from '../../redux/services/redux_slices/userSlice';

export default function AllAsks() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const asks = useAppSelector(state => state.ask);
  const [asksData, setAsksData] = useState<askType[]>(asks.asks);
  const [busy, setBusy] = useState<boolean>(false);
  // const [googleUid, setGoogleUid] = useState<string | null>('');
  const [error, setError] = useState<string>('');

  //get google id from local storage.
  useEffect(() => {
    setBusy(true);
    setError('');
    // get local id.
    getUid().then(value => {
      // setGoogleUid(value);
      //if a local id exists
      if (value !== null) {
        // fetch the user who owns the id
        dispatch(fetchUser({userAuthId: value}))
          .then(userInfo => {
            //then fetch asks categorized by that user's interets
            dispatch(fetchAsks([...userInfo.payload.interests])).then(askList =>
              // set Ask data for this component(screen.)
              setAsksData(askList.payload),
            );
          })
          .catch(err => {
            setError(`${err}`);
            setBusy(false);
          });
        //if no id exists in local storage
      } else {
        // fetch all asks uncategorized
        dispatch(fetchAsks([]))
          .then(askList => setAsksData(askList.payload))
          .catch(err => {
            setError(`${err}`);
            setBusy(false);
          });
      }
    });
    setBusy(false);
    setError('');
  }, [dispatch]);
  // console.log(asksData);
  //methods
  console.log(asksData);
  console.log(
    'loading:',
    asks.loading,
    'error:',
    asks.error,
    'data:',
    asksData,
  );
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      {(busy || asks.loading) && (
        <View style={styles.LoadingContainer}>
          <ActivityIndicator size={'large'} color={whotheme.colors.tertiary} />
        </View>
      )}
      {asks.error && (
        <View style={styles.AsksErrorContainer}>
          <BodyText>{asks.error}</BodyText>
        </View>
      )}
      {error && (
        <View style={styles.ErrorErrorContainer}>
          <BodyText>{error}</BodyText>
        </View>
      )}
      {!asks.loading && !asks.error && !asksData && (
        <View style={styles.LoadingContainer}>
          <BodyText>
            {
              'No asks to show right now :( be sure you are connected to the internet and reload the app'
            }
          </BodyText>
        </View>
      )}
      <ScrollView style={styles.ScrollableView}>
        {asksData &&
          asksData.length > 0 &&
          asksData.map(ask => (
            <AskCard
              key={ask._id}
              onPress={() => navigation.navigate('Respond', {askId: ask._id})}
              username={ask.userInfo.username}
              profilePhoto={ask.userInfo.photo}
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
  AsksErrorContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ErrorErrorContainer: {
    position: 'absolute',
    paddingTop: 50,
    zIndex: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
