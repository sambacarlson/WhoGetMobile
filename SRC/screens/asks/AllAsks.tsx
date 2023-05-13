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

export default function AllAsks() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const asks = useAppSelector(state => state.ask);
  const [asksData, setAsksData] = useState<askType[]>(asks.asks);
  const [busy, setBusy] = useState<boolean>(false);
  const [googleUid, setGoogleUid] = useState<string | null>('');

  getUid().then(value => {
    setGoogleUid(value);
  });
  /**fetch on mount*/
  useEffect(() => {
    setBusy(true);
    console.log('uid===>>', googleUid);
    try {
      dispatch(fetchAsks()).then(response => setAsksData(response.payload));
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }, [dispatch, googleUid]);
  //states

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
        <View style={styles.ErrorContainer}>
          <BodyText>{asks.error}</BodyText>
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
