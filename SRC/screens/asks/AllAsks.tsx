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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getItemLocalStorage} from '../../global/functions';
import axios from 'axios';
import {populateAsks} from '../../redux/slices/askSlice';

export default function AllAsks() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const asks = useAppSelector(state => state.ask);

  const [asksData, setAsksData] = useState<askType[]>(asks);
  const [busy, setBusy] = useState<boolean>(false);
  const [fault, setFault] = useState<string>('');

  useEffect(() => {
    try {
      setBusy(true);
      setFault('');
      // get thisuser from local storage.
      getItemLocalStorage('@thisUser')
        .then(thisUser => {
          if (thisUser !== null) {
            // fetch categorized asks
            // const catStr = thisUser.interests.join(',');
            axios
              .get(
                // `${BASE_URL}/asks/many/unflagged/categories?categories=${catStr}`,
                `${BASE_URL}/asks/all`,
              )
              .then(allAsks => {
                dispatch(populateAsks(allAsks.data));
                setBusy(false);
              })
              .catch(error => {
                setFault(error);
                setBusy(false);
              });
          } else {
            // fetch all asks uncategorized
            axios
              // .get(`${BASE_URL}/asks/many/unflagged`)
              .get(`${BASE_URL}/asks/all`)
              .then(allAsks => {
                dispatch(populateAsks(allAsks.data));
                setBusy(false);
              })
              .catch(error => {
                setFault(error);
                setBusy(false);
              });
          }
        })
        .catch(error => {
          setFault(error);
          setBusy(false);
        });
    } finally {
      // setBusy(false);
    }
  }, [dispatch]);
  //methods
  console.log(
    'loading:',
    busy,
    'error:',
    fault,
    'data length:',
    asksData.length,
  );
  useEffect(() => {
    setAsksData(asks);
  }, [asks]);
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
      {!busy && fault && (
        <View style={styles.AsksErrorContainer}>
          <BodyText>{fault}</BodyText>
        </View>
      )}
      {!busy && !fault && !asksData && (
        <View style={styles.LoadingContainer}>
          <BodyText style={styles.ErrorText}>
            {
              'No asks to show right now ☹️ be sure you are connected to the internet and reload the app'
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
              username={ask.user.username}
              profilePhoto={ask.user.photo}
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
  ErrorText: {
    textAlign: 'center',
    color: whotheme.colors.tertiary,
  },
});
