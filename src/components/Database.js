import SQLite from 'react-native-sqlite-storage';

// To declare the Nemo Database globally, we load it in from App.js as this is the first thing to load.
export const db = SQLite.openDatabase(
  {
    name: 'NemoDB.db',
    readOnly: true,
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);
