/*
 * Search Screen including Results
 */

import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Button, Text} from 'react-native';

import SearchBar from '../components/SearchBar';

import SearchBarTest from '../components/SearchBarTest';

import FilterButton from '../components/FilterButton';
// import InfoList from '../components/InfoList';

import {openDatabase} from 'react-native-sqlite-storage';

// Connction to access the pre-populated NemoDB.db
const db = openDatabase({name: 'NemoDB.db', createFromLocation: 1});

const SearchScreen = props => {
  // query state for the search bar
  const [query, setQuery] = useState('');
  // Function to clear the query; used when the X button is pressed in the search bar
  const clearButtonPressed = () => {
    setQuery('');
  };

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        // query={query}
        // filteredDataSource={filteredDataSource}
        // data={data}
      />
      {/* Implementation of FilterButton Component */}
      {/* <View style={styles.alignOnRow}>
        <FilterButton buttonLabel="Criminal Code" />
        <FilterButton buttonLabel="Motor Vehicle Act" />
        <FilterButton buttonLabel="Motor Vehicle Regulations" />
      </View> */}
      {/* <InfoList
        query={query}
        filteredDataSource={filteredDataSource}
        // data={data}
      /> */}

      {/* Passes the Query state to the Searchbar component and the clearButtonPressed function
      to clear the searchbar with setQuery */}
      <SearchBarTest
        onChange={setQuery}
        query={query}
        clearPressed={clearButtonPressed}
      />
      <Text>TEMPORARY {query} TEMPOARY</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;