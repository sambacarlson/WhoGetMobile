import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import {whotheme} from '../../global/variables';
import {defaultInterests} from './interetsList';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import CategoryButton from '../../components/buttonComponents/CategoryButton';
import BodyText from '../../components/textComponents/BodyText';
import Heading1Text from '../../components/textComponents/Heading1Text';
import Heading2Text from '../../components/textComponents/Heading2Text';
import {getItemLocalStorage, setItemLocalStorage} from '../../global/functions';

// TODO: remove allCategories array. replace dynamic categories
const categories = Array.from(new Set([...defaultInterests]));
export default function Interests() {
  // const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  const [busy, setBusy] = useState<boolean>(false);
  // const [fault, setFault] = useState<string>('');
  const [tempThisUser, setTempThisUser] = useState<any>('');

  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(categories);

  const handleAddInterest = (value: string) => {
    setChosenCategories(prevState => [...prevState, value]);
    setAllCategories(prevState => {
      prevState.splice(allCategories.indexOf(value), 1);
      return prevState;
    });
  };
  const handleRemoveInterest = (value: string) => {
    setAllCategories(prevState => [...prevState, value]);
    setChosenCategories(prevState => {
      prevState.splice(chosenCategories.indexOf(value), 1);
      return prevState;
    });
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
    //get tempThisUser from local storage
    getItemLocalStorage('@tempThisUser').then(results =>
      setTempThisUser(results),
    );
    if (!tempThisUser.isNewUser) {
      //TODO: we will use isNewUser to decide if to pull interests from the database for user to continue from there
    }
  }, [tempThisUser.isNewUser]);

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
        <ScrollView>
          <View style={styles.Interests}>
            {chosenCategories.length > 0 && (
              <View>
                <Heading2Text>Your Interests</Heading2Text>
                <View style={styles.ChosenInterests}>
                  {/* here map over chosen interests and display */}
                  {chosenCategories.map(category => (
                    <CategoryButton
                      key={chosenCategories.indexOf(category) + category}
                      onPress={() => handleRemoveInterest(category)}>
                      {category}
                    </CategoryButton>
                  ))}
                </View>
              </View>
            )}
            <View>
              <Heading2Text>Choose from below</Heading2Text>
              <View style={styles.AllCategories}>
                {/* here map over chosen interests and display */}
                {allCategories.map(category => (
                  <CategoryButton
                    key={allCategories.indexOf(category) + category}
                    onPress={() => {
                      handleAddInterest(category);
                    }}>
                    {category}
                  </CategoryButton>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
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
});
