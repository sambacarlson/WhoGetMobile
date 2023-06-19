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
import {logMessage} from '../../global/functions';
import {useAxiosQuery} from '../../global/fetching';
import {useQueryClient} from '@tanstack/react-query';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import {useAppSelector} from '../../redux/hooks';

export default function MyAsks() {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  const loadedUser = useAppSelector(state => state.user);
  //use states
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<userType>(loadedUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fault, setFault] = useState<string>('');

  // fetch categorized asks
  logMessage('userId', user._id);
  const {isLoading, error, data} = useAxiosQuery(
    ['myasks'],
    `asks/many/byuser/${user?._id ? user._id : ''}`,
    {
      retry: 0,
    },
  );
  //refresh
  const onRefresh = React.useCallback(() => {
    queryClient.invalidateQueries();
    logMessage('cleared');
  }, [queryClient]);

  //return
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
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
      {!user._id && (
        <View style={styles.ErrorContainer}>
          <ActionButton
            onPress={() => {
              navigation.navigate('Auth');
            }}
            children={'Sign in'}
            style={styles.ReloadButton}
          />
        </View>
      )}
      {user._id && error && (
        <View style={styles.ErrorContainer}>
          <BodyText>{`${error}`}</BodyText>
          <ActionButton
            onPress={() => onRefresh()}
            children={'reload'}
            style={styles.ReloadButton}
          />
        </View>
      )}
      {!user._id ||
        (!isLoading && !error && !(data.length > 0) && (
          <View style={styles.LoadingContainer}>
            <BodyText>{'No asks to show right now ☹️'}</BodyText>
          </View>
        ))}
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
  ReloadButton: {
    zIndex: 1000,
    borderRadius: 10,
    marginTop: 30,
    height: 36,
    padding: 0,
    paddingHorizontal: 3,
    backgroundColor: whotheme.colors.secondary,
  },
});
