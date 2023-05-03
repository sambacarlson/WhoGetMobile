import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, StatusBar} from 'react-native';
import Heading1Text from '../../components/baseTextComponents/heading1Text/Heading1Text';
import BodyText from '../../components/baseTextComponents/bodyText/BodyText';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import CategoryButton from '../../components/baseButtonComponents/categoryButton/CategoryButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import {whotheme} from '../../global/variables';

// TODO: remove allCategories array. replace with actual data
const categories = [
  'Education',
  'Health',
  'Religion',
  'Politics',
  'Football',
  'Science',
  'Sports',
  'Technology',
  'Travel',
];

export default function Interests() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
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

  //Return
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={whotheme.colors.primary}
        barStyle={'light-content'}
      />
      <Heading1Text>What are your Interests?</Heading1Text>
      <BodyText>Choose as many as interests you</BodyText>
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
      <ActionButton
        onPress={() => navigation.navigate('Contact')}
        busy={false}
        style={styles.ActionButton}>
        Continue
      </ActionButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'white',
    flexDirection: 'column',
    padding: 24,
    // backgroundColor: 'orange',
    minHeight: '100%',
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
    bottom: 70,
  },
});
