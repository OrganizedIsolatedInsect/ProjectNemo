
//PACKAGE Imports
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

//USER Imports
import AppNavigator from './src/navigation/TabNavigation'


const App = () => {


  //TO DO - Remove Console Log
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

//TO DO

//Remove all TO DO Comments
//remove consolelogs 
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component

