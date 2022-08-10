import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

//import {AppNavigator} from './src/navigation/TabNavigation';

import { BottomTabsStack } from './src/navigation/StackNavigation';


const App = () => {

  let now = new Date();
// convert date to a string in UTC timezone format:
console.log(now.toUTCString());

  return (
    <NavigationContainer>
      <BottomTabsStack />
      </NavigationContainer>

  );
};

export default App;
