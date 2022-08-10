
//PACKAGE Imports
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

//USER Imports
import AppNavigator from './src/navigation/TabNavigation'


const App = () => {

  let now = new Date();
// convert date to a string in UTC timezone format:
console.log('[Apps] - Last Compile/Run -' + now.toUTCString());

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
 
  );
};

export default App;
