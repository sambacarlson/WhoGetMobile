import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AskCard from '../../components/compoundComponents/AskCard';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams, askType} from '../../global/types';
import {whotheme} from '../../global/variables';

import {formatDistanceToNow} from 'date-fns';
import BodyText from '../../components/textComponents/BodyText';
import {axiosRequest, getItemLocalStorage} from '../../global/functions';
export default function MyAsks() {
  // const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const [busy, setBusy] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fault, setFault] = useState<string>();
  const [myAsk, setMyAsk] = useState<askType[]>([]);
  const [myId, setMyId] = useState<string>('');

  //refresh control
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setFault('');
    axiosRequest(`asks/many/byuser/${myId}`, 'GET')
      .then(allAsks => {
        setMyAsk(allAsks.data);
        setRefreshing(false);
      })
      .catch(error => {
        setFault(error.message);
        setRefreshing(false);
      });
  }, [myId]);

  //useffect
  useEffect(() => {
    setBusy(true);
    setFault('');
    try {
      getItemLocalStorage('@thisUser').then(thisUser => {
        if (thisUser === null) {
          setMyAsk([]);
          setBusy(false);
          return;
        }
        setMyId(thisUser._id);
        axiosRequest(`asks/many/byuser/${myId}`, 'GET')
          .then(results => {
            setMyAsk(results.data);
            setBusy(false);
          })
          .catch(error => {
            setFault(error.message);
            setBusy(false);
          });
      });
    } catch (error) {
      setFault(error as string);
      setBusy(false);
    }
  }, [myId]);

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
      {!fault && myAsk && !(myAsk.length > 0) && (
        <View style={styles.LoadingContainer}>
          <BodyText>{'No asks to show right now ☹️'}</BodyText>
        </View>
      )}
      {!fault && !busy && (
        <FlatList
          style={styles.ScrollableView}
          data={myAsk.filter(ask => ask.user._id === myId)}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[whotheme.colors.primaryLight]}
            />
          }
          renderItem={({item}) => (
            <AskCard
              key={item._id}
              // onPress={() => navigation.navigate('EditAsk', {askId: item._id})}
              onPress={() => {}}
              username={item.user?.username || 'you'}
              profilePhoto={item.user?.photo}
              message={item.message}
              expiry={`${formatDistanceToNow(new Date(item.createdAt))}`}
            />
          )}
        />
      )}
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
