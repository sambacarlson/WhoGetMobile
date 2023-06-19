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
import {RouteStackParams, userType} from '../../global/types';
import {whotheme} from '../../global/variables';
import {formatDistanceToNow} from 'date-fns';
import BodyText from '../../components/textComponents/BodyText';
import {useAxiosQuery} from '../../global/fetching';
import {useQueryClient} from '@tanstack/react-query';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logMessage} from '../../global/functions';
import {populateAsks} from '../../redux/slices/askSlice';

export default function AllAsks() {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  const dispatch = useAppDispatch();
  const loadedUser = useAppSelector(state => state.user);
  // replace spaces with uri encoding %20
  logMessage(loadedUser.interests);
  const catArr =
    loadedUser.interests !== undefined
      ? loadedUser.interests.map((str: string) => str.replace(/ /g, '%20'))
      : [];
  //use states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<userType>({
    ...loadedUser,
    interests: catArr,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fault, setFault] = useState<string>('');

  // fetch categorized asks
  const interestStr = user?.interests.join(',') || '';
  logMessage('interests-------->', user.interests);
  const fetchUri =
    user._id !== undefined
      ? `asks/many/unflagged/bycategories?categories=${interestStr}`
      : 'asks/many/unflagged';
  logMessage(fetchUri);
  const {isLoading, error, data} = useAxiosQuery(['asks'], fetchUri);

  //refresh
  const onRefresh = React.useCallback(() => {
    queryClient.invalidateQueries(['asks']);
    logMessage('invalidated queries');
  }, [queryClient]);

  useEffect(() => {
    onRefresh(); // necessary so onRefresh runs just once
  }, [onRefresh]);
  useEffect(() => {
    dispatch(populateAsks(data));
  }, [data, dispatch]);

  //return
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      {isLoading && (
        <View style={styles.LoadingContainer}>
          <ActivityIndicator size={'large'} color={whotheme.colors.tertiary} />
        </View>
      )}
      {error && (
        <View style={styles.AsksErrorContainer}>
          <BodyText>{error.toString()}</BodyText>
          <ActionButton
            onPress={() => onRefresh}
            children={'reload'}
            style={styles.ReloadButton}
          />
        </View>
      )}
      {!isLoading && !error && data?.length === 0 && (
        <View style={styles.LoadingContainer}>
          <BodyText style={styles.ErrorText}>
            {
              'No asks to show right now ☹️ be sure you are connected to the internet and reload the app'
            }
          </BodyText>
        </View>
      )}
      {data && (
        <FlatList
          style={styles.ScrollableView}
          data={data}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={[whotheme.colors.primaryLight]}
            />
          }
          renderItem={({item}) => (
            <AskCard
              key={item._id}
              onPress={() => navigation.navigate('Respond', {askId: item._id})}
              username={item.user.username}
              profilePhoto={item.user.photo}
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
  ReloadButton: {
    borderRadius: 10,
    marginTop: 30,
    height: 36,
    padding: 0,
    paddingHorizontal: 3,
    backgroundColor: whotheme.colors.secondary,
  },
});
