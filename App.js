import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import {LaunchStack} from './src/navigation/StackNavigation';
import store from './src/redux/store';

import {colors} from './src/assets/styles';

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
          <LaunchStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
