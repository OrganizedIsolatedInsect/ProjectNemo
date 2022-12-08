import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';

const SearchScreen = props => {
  // query state returns onChangeText (each character passed into the text box)
  const [query, setQuery] = useState();
  // searchTerm state returns onSubmitEditing prop (the whole term that is submitted)
  const [searchTerm, setSearchTerm] = useState();

  console.log('Query: ', query);
  console.log('SearchTerm: ', searchTerm);

  const SearchFeatures = () => {
    return (
      <View>
        <View style={styles.alignOnRow}>
          {/* Implementation of FilterButton Component */}
          <FilterButton buttonLabel="Criminal Code" />
          <FilterButton buttonLabel="Motor Vehicle Act" />
          <FilterButton buttonLabel="Motor Vehicle Regulations" />
        </View>
        <View>
          <SearchResults searchQueryTerm={searchTerm} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* If the query is blank, do not show filter buttons or empty search results section */}
      {searchTerm !== undefined ? <SearchFeatures /> : null}
    </SafeAreaView>
  );
};

export default SearchScreen;
