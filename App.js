//PACKAGE Imports
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import store from './src/redux/store';

import SQLite from 'react-native-sqlite-storage';

import {colors} from './src/assets/styles';

// Android database file location: './android/app/src/main/assets'
// sourced from https://stackoverflow.com/a/57506699
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native/

// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);

// To declare the Nemo Database globally, we load it in from App.js as this is the first thing to load.
const db = SQLite.openDatabase(
  {
    name: 'NemoDB.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

// Make React Navigation's default theme background color match the rest of the app
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundColoring,
  },
};

const App = () => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_schema WHERE type='table' AND name='MVA'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS MVA', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS MVA(index INTEGER, provision TEXT, contravention TEXT, fine TEXT, reducedFine TEXT, victimLevySurcharge TEXT, ticketedAmount TEXT, reducedTicketedAmount TEXT, source TEXT, sectionText TEXT, sectionSubsection TEXT, sectionParagraph TEXT, sectionSubparagraph TEXT)',
              [],
            );
          }
        },
      );
    });
  }, []);

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

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
