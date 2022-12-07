import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';

const SearchScreen = props => {
  // query state returns onChangeText (each character passed into the text box)
  const [query, setQuery] = useState();
  // searchTerm state returns onSubmitEditing prop (the whole term that is submitted)
  const [searchTerm, setSearchTerm] = useState();

  console.log('Query: ', query);
  console.log('SearchTerm: ', searchTerm);

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
