
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


//Project Nemo title presses to HOME landing page on all pages
//Fix Header title styles to      <Text style={[styles.title, styles.secondary]}>Project Nemo</Text>