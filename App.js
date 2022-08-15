//PACKAGE Imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import store from './src/redux/store';


// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);


const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
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
