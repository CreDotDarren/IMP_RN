import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginPage} from './LoginPage';
import {HomePage} from './HomePage';
import {ScannerPage} from './ScannerPage';
import {AssembleCarScannerPage} from './AssembleCarScannerPage';
import {AreaLocationPage} from './AreaLocationPage';

const Stack = createStackNavigator();

const LaunchPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AssembleCarScanner"
          component={AssembleCarScannerPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AreaLocation"
          component={AreaLocationPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {LaunchPage};
