/*
 * Search Screen including Results
 */

import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';

const SearchScreen = props => {
  return (
    <SafeAreaView style={styles.background}>
      <SearchBar />
    </SafeAreaView>
  );
};

export default SearchScreen;
