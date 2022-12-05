/*
 * Search Screen including Results
 */

import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';

const SearchScreen = props => {
  const [query, setQuery] = useState();
  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        query={query}
        setQuery={setQuery}
      />

      {/* Implementation of FilterButton Component */}
      <View style={styles.alignOnRow}>
        <FilterButton buttonLabel="Criminal Code" />
        <FilterButton buttonLabel="Motor Vehicle Act" />
        <FilterButton buttonLabel="Motor Vehicle Regulations" />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
