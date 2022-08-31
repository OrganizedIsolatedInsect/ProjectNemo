/*
 * Search Screen including Results
 */

import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
// import InfoList from '../components/InfoList';

import data from '../data/mvavt_records.json';

const SearchScreen = props => {
  const [query, setQuery] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);

  const searchFilters = [
    'Criminal Code',
    'Motor Vehicle Act',
    'Motor Vehicle Regulations',
  ];

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        query={query}
        filteredDataSource={filteredDataSource}
        data={data}
      />

      {/* Implementation of FilterButton Component */}
      <View style={styles.alignOnRow}>
        <FilterButton buttonLabel="Criminal Code" />
        <FilterButton buttonLabel="Motor Vehicle Act" />
        <FilterButton buttonLabel="Motor Vehicle Regulations" />
      </View>
      {/* <InfoList
        query={query}
        filteredDataSource={filteredDataSource}
        // data={data}
      /> */}
    </SafeAreaView>
  );
};

export default SearchScreen;
