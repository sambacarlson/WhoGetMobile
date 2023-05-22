import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {BASE_URL, whotheme} from '../../global/variables';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams, userType} from '../../global/types';
import axios from 'axios';
import {ActionButton} from '../../components/buttonComponents/ActionButton';
import CategoryButton from '../../components/buttonComponents/CategoryButton';
import BaseInputComponent from '../../components/imputComponents/BaseInputComponent';
import Heading2Text from '../../components/textComponents/Heading2Text';
import {getItemLocalStorage} from '../../global/functions';
// import {useAppDispatch} from '../../redux/hooks';
// import {createAsk} from '../../redux/slices/askSlice';
import BodyText from '../../components/textComponents/BodyText';

// const askImage = require('../../images/icons/image_add.png');

export default function NewAsk(this: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  // const dispatch = useAppDispatch();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [fault, setFault] = useState<string>('');
  const [thisUser, setThisUser] = useState<userType>();

  const allMyInterests = thisUser ? thisUser.interests : [];

  // form
  const defaultAskData: {
    user: string;
    message: string;
    categories: string[];
    expiry: number;
    status: {hidden: boolean; hiddenDate?: string};
  } = {
    user: '',
    message: '',
    categories: [],
    expiry: 3,
    status: {
      hidden: false,
      hiddenDate: '',
    },
  };
  const [newAskData, setNewAskData] = useState(defaultAskData);
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
  //methods
  const handleChange = (name: string, value: any) => {
    setNewAskData(prevData => ({...prevData, [name]: value}));
  };
  //submit
  const submitForm = async () => {
    try {
      setFault('');
      setIsBusy(true);
      console.log('ask to create>>', {
        ...newAskData,
        expiry: Number(newAskData.expiry),
        user: thisUser?._id,
      });
      const response = await axios.post(`${BASE_URL}/asks/one`, newAskData);
      // dispatch(createAsk([...response.data]));
      console.log('the just created asks===<>>', response.data);
      setIsBusy(false);
      navigation.navigate('AsksNav');
      // return response.data;
    } catch (error: any) {
      setFault(error.message);
      setIsBusy(false);
    }
  };

  //use effect
  useEffect(() => {
    setFault('');
    getItemLocalStorage('@thisUser').then(results => {
      setThisUser(results);
      console.log('thisUser in effect >>>==>', results);
      if (results === null) {
        navigation.navigate('Auth');
      }
    });
  }, [navigation]);

  //return
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ContentView}>
        <Heading2Text> Expiry (1 - 7 days)</Heading2Text>
        <BaseInputComponent
          onChangeText={(num: number) => {
            handleChange('expiry', num);
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
          {allMyInterests.map((interest: string) => (
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
        {/* <Heading2Text>Upload an Image</Heading2Text> */}
        <View style={styles.AskImageView}>
          {/* <Image source={askImage} style={styles.AskImage} /> */}
        </View>
      </View>
      {fault && <BodyText style={styles.Expiry}>{fault}</BodyText>}
      <View style={styles.ActionButtonView}>
        <ActionButton
          onPress={!isBusy && submitForm}
          busy={isBusy}
          style={fault && styles.FaultOccured}>
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
    // height: 150,
    height: 70,
    // backgroundColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  AskImage: {
    width: 40,
    height: 40,
  },
  ActionButtonView: {
    paddingVertical: 32,
  },
  FaultOccured: {
    backgroundColor: whotheme.colors.tertiary,
  },
});
