import React from 'react';
import {whotheme} from './global/variables';
import {StatusBar} from 'react-native';
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
import {RootStackParams} from './global/types';

const Stack = createStackNavigator<RootStackParams>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={whotheme.colors.primary} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {backgroundColor: whotheme.colors.primary},
          headerTitleStyle: {
            fontFamily: whotheme.fontFamily.bold,
            fontSize: whotheme.fontSize.medium,
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="Asks" component={AsksNav} />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Interests" component={Interests} />
        <Stack.Screen name="Respond" component={Respond} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="NewAsk" component={NewAsk} />
        <Stack.Screen name="EditAsk" component={EditAsk} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
