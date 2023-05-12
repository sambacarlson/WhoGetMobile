import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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

export default function AllAsks() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  //get asks
  const asks = useAppSelector(state => state.ask);
  const [asksData, setAsksData] = useState<askType[]>(asks.asks);
  //fetch on mount
  useEffect(() => {
    dispatch(fetchAsks()).then(response => setAsksData(response.payload));
  }, [dispatch]);
  //states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // console.log(asksData);
  //methods

  //return
  return (
    <ScrollView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      {asks.loading && (
        <View style={styles.LoadingContainer}>
          <ActivityIndicator size={'large'} color={whotheme.colors.tertiary} />
        </View>
      )}
      {!asks.loading && asks.error && (
        <View style={styles.LoadingContainer}>
          <BodyText>{asks.error}</BodyText>
        </View>
      )}
      {!asks.loading && !asks.error && !(asksData.length > 0) && (
        <View style={styles.LoadingContainer}>
          <BodyText>{'No asks to show right now :('}</BodyText>
        </View>
      )}
      {asksData.length > 0 &&
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
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    flex: 1,
  },
  LoadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
