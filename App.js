//PACKAGE Imports
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import store from './src/redux/store';

import {colors} from './src/assets/styles';

// Android database file location: './android/app/src/main/assets/www'
// sourced from https://stackoverflow.com/a/57506699
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native/

// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);

// Make React Navigation's default theme background color match the rest of the app
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundColoring,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.backgroundColoring}
          barStyle="dark-content"
        />
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
