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
import {RouteStackParams, askType} from '../../global/types';
import {BASE_URL, whotheme} from '../../global/variables';

import {formatDistanceToNow} from 'date-fns';
import BodyText from '../../components/textComponents/BodyText';
import {getItemLocalStorage} from '../../global/functions';
import axios from 'axios';

export default function MyAsks() {
  // const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const [busy, setBusy] = useState<boolean>(false);
  const [fault, setFault] = useState<string>();
  const [myAsk, setMyAsk] = useState<any>();
  const [myId, setMyId] = useState<string>('');

  useEffect(() => {
    setBusy(true);
    setFault('');
    try {
      getItemLocalStorage('@thisUser').then(thisUser => {
        setMyId(thisUser._id);
        axios
          // .get(`${BASE_URL}/asks/many/byuser/${thisUser._id}`)
          .get(`${BASE_URL}/asks/all`)
          .then(results => {
            setMyAsk(results.data);
            setBusy(false);
            console.log('my asks ==>>>-', results.data);
          })
          .catch(error => {
            setFault(error.message);
            setBusy(false);
          });
      });
    } catch (error) {
      setFault(error as string);
      setBusy(false);
    } finally {
      // setBusy(false);
    }
  }, []);

  useEffect(() => {
    setMyAsk(myAsk);
  }, [myAsk]);

  //return
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      {busy && !fault && (
        <View style={styles.LoadingContainer}>
          <ActivityIndicator size={'large'} color={whotheme.colors.tertiary} />
        </View>
      )}
      {!busy && fault && (
        <View style={styles.ErrorContainer}>
          <BodyText>{fault}</BodyText>
        </View>
      )}
      {myAsk && !(myAsk.length > 0) && (
        <View style={styles.LoadingContainer}>
          <BodyText>{'No asks to show right now ☹️'}</BodyText>
        </View>
      )}
      <ScrollView style={styles.ScrollableView}>
        {myAsk &&
          myAsk.length > 0 &&
          myAsk.map(
            (ask: askType) =>
              ask.user._id === myId && (
                <AskCard
                  key={ask._id}
                  // onPress={() => navigation.navigate('EditAsk', {askId: ask._id})}
                  onPress={() => {}}
                  username={ask.user?.username || 'you'}
                  profilePhoto={ask.user?.photo}
                  // onPress={() => {}}
                  message={ask.message}
                  expiry={`${formatDistanceToNow(new Date(ask.createdAt))}`}
                />
              ),
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
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
    paddingTop: 50,
    zIndex: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
