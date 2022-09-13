/*
 * Search Screen including Results
 */

import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Button} from 'react-native';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
// import InfoList from '../components/InfoList';

import {openDatabase} from 'react-native-sqlite-storage';

// Connction to access the pre-populated NemoDB.db
const db = openDatabase({name: 'NemoDB.db', createFromLocation: 1});

const SearchScreen = props => {
  const searchFilters = [
    'Criminal Code',
    'Motor Vehicle Act',
    'Motor Vehicle Regulations',
  ];

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
    </SafeAreaView>
  );
};

export default SearchScreen;
