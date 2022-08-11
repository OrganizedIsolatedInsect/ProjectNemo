//PACKAGE Imports
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//USER Imports
import AppNavigator from './src/navigation/TabNavigation';

const App = () => {
  //TO DO - Remove Console Log
  let now = new Date();
  // convert date to a string in UTC timezone format:
  console.log('[Apps] - Last Compile/Run -' + now.toUTCString());

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
