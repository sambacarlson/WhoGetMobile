import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import BaseInputComponent from '../../components/baseInputComponents/BaseInputComponent';
import {whotheme} from '../../global/variables';
import CategoryButton from '../../components/baseButtonComponents/categoryButton/CategoryButton';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';

const allMyInterests = [
  'Health',
  'Nature',
  'Culture',
  'Science',
  'Education',
  'Entertainment',
];

const askImage = require('../../images/icons/image_add.png');

export default function NewAsk() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBusy, setIsBusy] = useState<boolean>(false);
  /**Pick categories */
  const [categories, setCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
    console.log(categories);
  };
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContentView}>
        <Heading2Text> Expiry (1 - 7 days)</Heading2Text>
        <BaseInputComponent
          onChangeText={undefined}
          textStyle={styles.Expiry}
          style={styles.ExpiryView}
        />
      </View>
      <View style={styles.ContentView}>
        <Heading2Text>Ask</Heading2Text>
        <BaseInputComponent
          onChangeText={undefined}
          numberOfLines={7}
          style={styles.Ask}
        />
      </View>
      <View style={styles.ContentView}>
        <Heading2Text>Categories</Heading2Text>
        <View style={styles.Categories}>
          {allMyInterests.map(interest => (
            <CategoryButton
              key={allMyInterests.indexOf(interest) + interest}
              setActiveState={true}
              onPress={() => toggleCategory(interest)}
              children={interest}
            />
          ))}
        </View>
      </View>
      <View style={styles.ContentView}>
        <Heading2Text>Upload an Image</Heading2Text>
        <View style={styles.AskImageView}>
          <Image source={askImage} style={styles.AskImage} />
        </View>
      </View>
      <View style={styles.ActionButtonView}>
        <ActionButton onPress={undefined} busy={isBusy}>
          Done
        </ActionButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  ContentView: {
    paddingVertical: 8,
    flexDirection: 'column',
    gap: 8,
  },
  ExpiryView: {
    width: 50,
  },
  Expiry: {
    color: whotheme.colors.tertiary,
  },
  Ask: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
  },
  Categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  AskImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  AskImage: {
    width: 40,
    height: 40,
  },
  ActionButtonView: {
    paddingVertical: 32,
  },
});
