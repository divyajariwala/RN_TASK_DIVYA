import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import signup from '../Screens/Signup/Signup';
import homescreen from '../Screens/ContactPage/ContactPage';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">

      <Stack.Screen name="Register" component={signup} />
      <Stack.Screen name="homescreen" component={homescreen} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
