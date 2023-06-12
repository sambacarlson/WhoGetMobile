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
  axiosRequest,
  getItemLocalStorage,
  setItemLocalStorage,
} from '../../global/functions';

// const categories = Array.from(new Set([...defaultInterests]));

export default function Interests() {
  // const dispatch = useAppDispatch();
  const onRefresh = useCallback(() => {
    setLoading(true);
    // fetch categories
    axiosRequest('interests/all', 'GET')
      .then(results => {
        setLoading(false);
        setAllCategories(results.data);
      })
      .catch(error => {
        setLoading(false);
        setFault(error);
      });
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  const [busy, setBusy] = useState<boolean>(false); // for continue button
  const [loading, setLoading] = useState<boolean>(false); // for loading interests button
  // const [fault, setFault] = useState<string>('');
  const [tempThisUser, setTempThisUser] = useState<any>('');

  const [chosenCategories, setChosenCategories] = useState<interestType[]>([]);
  const [allCategories, setAllCategories] = useState<interestType[]>([]);
  const [fault, setFault] = useState<string>('');

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
    console.log('tempUser', tempThisUser);
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
      .catch(() => {
        setBusy(false);
      });
    //navigate to contacts
    setBusy(false);
    navigation.navigate('Contact');
  };

  useEffect(() => {
    setLoading(true);
    //get tempThisUser from local storage
    getItemLocalStorage('@tempThisUser').then(results =>
      setTempThisUser(results),
    );
    // fetch categories
    axiosRequest('interests/all', 'GET')
      .then(results => {
        setLoading(false);
        setAllCategories(results.data);
      })
      .catch(error => {
        setLoading(false);
        setFault(error);
      });
  }, []);

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
        {!busy && fault && (
          <View style={styles.FaultOrLoadingContainer}>
            <BodyText style={styles.FaultText}>{fault}</BodyText>
          </View>
        )}
        {loading && (
          <View style={styles.FaultOrLoadingContainer}>
            <ActivityIndicator size="large" color={whotheme.colors.primary} />
          </View>
        )}
        {!fault && !busy && (
          <ScrollView
            style={styles.ScrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={loading}
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
                    allCategories.map(category => (
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
