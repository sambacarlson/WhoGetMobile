/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {whotheme} from './global/variables';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsksNav from './screens/asks/AsksNav';
import Splash from './screens/loading/Splash';
import Auth from './screens/auth/Auth';
import Interests from './screens/interests/Interests';
import Respond from './screens/respond/Respond';
import Contact from './screens/contact/Contact';
import NewAsk from './screens/new/NewAsk';
import EditAsk from './screens/edit/EditAsk';
import {RouteStackParams} from './global/types';
import HeaderTitle from './components/headerStyleComponents/HeaderTitle';
// import HeaderRight from './components/headerStyleComponents/HeaderRight';

const Stack = createStackNavigator<RouteStackParams>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {backgroundColor: whotheme.colors.primary},
          headerTitleStyle: {
            fontFamily: whotheme.fontFamily.bold,
            fontSize: whotheme.fontSize.medium,
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="AsksNav"
          component={AsksNav}
          options={{
            headerTitle: () => <HeaderTitle />,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Interests"
          component={Interests}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
        <Stack.Screen name="Respond" component={Respond} />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
        <Stack.Screen
          name="NewAsk"
          component={NewAsk}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
        <Stack.Screen
          name="EditAsk"
          component={EditAsk}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
