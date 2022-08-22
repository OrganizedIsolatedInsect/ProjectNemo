//PACKAGE Imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//USER Imports
import AppNavigator from './src/navigation/TabNavigation';

import styles from './src/assets/styles';

// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);

import SearchBar from './src/components/SearchBar';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

      {/* <SearchBar /> */}
    </SafeAreaProvider>
  );
};

export default App;

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
