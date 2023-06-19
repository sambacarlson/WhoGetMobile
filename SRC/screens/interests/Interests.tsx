import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams, interestType} from '../../global/types';
import {whotheme} from '../../global/variables';
// import {defaultInterests} from './interetsList';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import CategoryButton from '../../components/buttonComponents/CategoryButton';
import BodyText from '../../components/textComponents/BodyText';
import Heading1Text from '../../components/textComponents/Heading1Text';
import Heading2Text from '../../components/textComponents/Heading2Text';
import {
  getItemLocalStorage,
  logMessage,
  setItemLocalStorage,
} from '../../global/functions';
import {useAxiosQuery} from '../../global/fetching';
import {useQueryClient} from '@tanstack/react-query';

// const categories = Array.from(new Set([...defaultInterests]));

export default function Interests() {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();

  const [tempThisUser, setTempThisUser] = useState<any>('');
  const [chosenCategories, setChosenCategories] = useState<interestType[]>([]);
  const [allCategories, setAllCategories] = useState<interestType[]>([]);
  const [fault, setFault] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);

  //add interest
  const handleAddInterest = (value: interestType) => {
    setChosenCategories(prevState => [...prevState, value]);
    setAllCategories(prevState =>
      prevState.filter(category => category._id !== value._id),
    );
  };

  // remove interest
  const handleRemoveInterest = (value: interestType) => {
    setAllCategories(prevState => [...prevState, value]);
    setChosenCategories(prevState =>
      prevState.filter(category => category._id !== value._id),
    );
  };

  const handleContinue = () => {
    setBusy(true);
    //save(append) @tempThisUser
    logMessage('tempUser::::>', tempThisUser);
    setItemLocalStorage(
      '@tempThisUser',
      JSON.stringify({
        ...tempThisUser,
        interests: chosenCategories,
      }),
    )
      .then(() => {
        navigation.navigate('Contact');
      })
      .catch(error => {
        setFault(error as string);
      });
    //navigate to contacts
    setBusy(false);
    navigation.navigate('Contact');
  };
  // useQuery
  const {data, isLoading, error} = useAxiosQuery(
    ['interests'],
    'interests/all',
  );
  useEffect(() => {
    //get tempThisUser from local storage
    data && setAllCategories(data);
    getItemLocalStorage('@tempThisUser')
      .then(results => {
        if (results !== null) {
          setTempThisUser(results);
        } else {
          navigation.navigate('Auth');
        }
      })
      .catch(() => setFault('an error occured'));
  }, [data, navigation]);

  // logMessage(data);
  logMessage('fault==>>', fault);

  // on refresh
  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries(['interests']);
  }, [queryClient]);
  //Return
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      <View style={styles.Headings}>
        <Heading1Text>What are your Interests?</Heading1Text>
        <BodyText>Choose as many as interests you</BodyText>
      </View>
      <View style={styles.Body}>
        {error ? (
          <View style={styles.FaultOrLoadingContainer}>
            <BodyText style={styles.FaultText}>{error as string}</BodyText>
          </View>
        ) : (
          ''
        )}
        {isLoading && (
          <View style={styles.FaultOrLoadingContainer}>
            <ActivityIndicator size="large" color={whotheme.colors.primary} />
          </View>
        )}
        {!error && !isLoading && (
          <ScrollView
            style={styles.ScrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={[whotheme.colors.primaryLight]}
              />
            }>
            <View style={styles.Interests}>
              {chosenCategories && (
                <View>
                  <Heading2Text>Your Interests</Heading2Text>
                  <View style={styles.ChosenInterests}>
                    {/* here map over chosen interests and display */}
                    {chosenCategories.map(category => (
                      <CategoryButton
                        key={category._id}
                        onPress={() => handleRemoveInterest(category)}>
                        {category.name}
                      </CategoryButton>
                    ))}
                  </View>
                </View>
              )}
              <View>
                <Heading2Text>Choose from below</Heading2Text>
                <View style={styles.AllCategories}>
                  {/* here map over chosen interests and display */}
                  {allCategories &&
                    allCategories.map((category: any) => (
                      <CategoryButton
                        key={category._id}
                        onPress={() => {
                          handleAddInterest(category);
                        }}>
                        {category.name}
                      </CategoryButton>
                    ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <View style={styles.Foot}>
        <ActionButton
          onPress={handleContinue}
          busy={busy}
          style={styles.ActionButton}>
          Continue
        </ActionButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 24,
    // backgroundColor: 'orange',
    height: '100%',
  },
  Interests: {
    marginVertical: 24,
    flexDirection: 'column',
    height: '40%',
    gap: 16,
  },
  ChosenInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    gap: 6,
  },
  AllCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 10,
  },
  ActionButton: {
    width: '100%',
    AlignItems: 'center',
    // bottom: 70,
  },
  /////
  Headings: {
    paddingTop: 16,
    flex: 1,
    minHeight: 20,
  },
  Body: {flex: 8, alignItems: 'center'},
  Foot: {
    minHeight: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  ScrollContainer: {
    width: '100%',
  },
  FaultOrLoadingContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FaultText: {
    color: 'pink',
    fontSize: whotheme.fontSize.medium,
  },
});
