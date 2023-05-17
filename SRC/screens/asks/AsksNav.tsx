import React from 'react';
import AllAsks from './AllAsks';
import MyAsks from './MyAsks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {whotheme} from '../../global/variables';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteStackParams} from '../../global/types';
import HeaderRight from '../../components/headerStyleComponents/HeaderRight';

const Tab = createMaterialTopTabNavigator();

export default function AsksNav() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();
  navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <HeaderRight onPressNewAsk={() => navigation.navigate('NewAsk')} />
    ),
  });
  /************* */

  /************* */
  return (
    <Tab.Navigator
      initialRouteName="AllAsks"
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          backgroundColor: whotheme.colors.primary,
        },
        tabBarLabelStyle: {textTransform: 'capitalize'},
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
        tabBarActiveTintColor: 'white',
        // tabBarInactiveTintColor: whotheme.colors.tertiary,
        tabBarAndroidRipple: {color: '#00000000'},
      }}>
      <Tab.Screen
        name="AllAsks"
        component={AllAsks}
        options={{title: 'All Asks'}}
      />
      <Tab.Screen
        name="MyAsks"
        component={MyAsks}
        options={{title: 'My Asks'}}
      />
    </Tab.Navigator>
  );
}
