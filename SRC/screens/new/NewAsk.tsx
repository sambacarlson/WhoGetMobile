import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import Heading2Text from '../../components/baseTextComponents/heading2Text/Heading2Text';
import BaseInputComponent from '../../components/baseInputComponents/BaseInputComponent';
import {whotheme} from '../../global/variables';
import CategoryButton from '../../components/baseButtonComponents/categoryButton/CategoryButton';
import {ActionButton} from '../../components/baseButtonComponents/actionButton/ActionButton';
import {useAppDispatch} from '../../redux/redux_store/hooks';
import {createAsks} from '../../redux/services/requests';
import axios from 'axios';

const allMyInterests = [
  'Health',
  'Nature',
  'Culture',
  'Science',
  'Education',
  'Entertainment',
];

const askImage = require('../../images/icons/image_add.png');

export default function NewAsk(this: any) {
  const dispatch = useAppDispatch();

  const [isBusy, setIsBusy] = useState<boolean>(false);
  /**Pick categories */
  // const [categories, setCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    if (newAskData.categories.includes(category)) {
      // setCategories(categories.filter(c => c !== category));
      setNewAskData(prevData => ({
        ...prevData,
        categories: prevData.categories.filter(c => c !== category),
      }));
    } else {
      // setCategories([...categories, category]);
      setNewAskData(prevData => ({
        ...prevData,
        categories: [...prevData.categories, category],
      }));
    }
    // console.log(categories);
  };
  //form
  const defaultAskData = {
    userInfo: {
      user_id: 't3r45sfe32',
      username: 'dummyuser',
      photo: '',
    },
    message: '',
    categories: [],
    expiry: 1,
    status: {
      hidden: false,
      hiddenDate: '',
    },
  };
  const [newAskData, setNewAskData] = useState(defaultAskData);
  //methods
  const handleChange = (name: string, value: any) => {
    setNewAskData(prevData => ({...prevData, [name]: value}));
  };
  //submit
  const submitForm = async () => {
    setIsBusy(true);
    try {
      // await dispatch(createAsks(newAskData));
      const response = await axios.post(
        'https://whoget-api.onrender.com/api/asks',
        newAskData,
      );
      console.log('response ======>>>', response.data);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
    setIsBusy(false);
  };
  console.log(newAskData);

  //return
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContentView}>
        <Heading2Text> Expiry (1 - 7 days)</Heading2Text>
        <BaseInputComponent
          onChangeText={(text: number) => {
            handleChange('expiry', text);
          }}
          inputMode="numeric"
          textStyle={styles.Expiry}
          style={styles.ExpiryView}>
          {newAskData.expiry}
        </BaseInputComponent>
      </View>
      <View style={styles.ContentView}>
        <Heading2Text>Ask</Heading2Text>
        <View style={styles.AskContainer}>
          <BaseInputComponent
            onChangeText={(text: string) => handleChange('message', text)}
            multiline={true}
            autoFocus={true}
            textStyle={styles.AskText}
            style={styles.Ask}>
            {newAskData.message}
          </BaseInputComponent>
        </View>
      </View>
      <View style={styles.ContentView}>
        <Heading2Text>Categories</Heading2Text>
        <View style={styles.Categories}>
          {allMyInterests.map(interest => (
            <CategoryButton
              key={allMyInterests.indexOf(interest) + interest}
              setActiveState={true}
              onPress={() => toggleCategory(interest)}>
              {interest}
            </CategoryButton>
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
        <ActionButton onPress={!isBusy && submitForm} busy={isBusy}>
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
    textAlign: 'center',
    paddingLeft: 0,
  },
  Expiry: {
    fontSize: whotheme.fontSize.medium,
    color: whotheme.colors.tertiary,
  },
  AskContainer: {
    borderWidth: 1,
    borderColor: whotheme.colors.secondary,
    borderRadius: 12,
    minHeight: 100,
  },
  Ask: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderWidth: 0,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: 16,
    marginRight: 16,
    borderStyle: 'dotted',
  },
  AskText: {
    // paddingBottom: 0,
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
