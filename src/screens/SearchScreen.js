import React, {useState, useEffect} from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native';
import {MagnifyingGlass} from '../assets/icons';

import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';

const SearchScreen = props => {
  // query state returns onChangeText (each character passed into the text box)
  const [query, setQuery] = useState();
  // searchTerm state returns onSubmitEditing prop (the whole term that is submitted)
  const [searchTerm, setSearchTerm] = useState();

  const [searchBarFocused, setSearchBarFocused] = useState(false);

  console.log('Query: ', query);
  console.log('SearchTerm: ', searchTerm);
  console.log('searchBarFocused: ', searchBarFocused);

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

  const SearchPlaceholder = () => {
    return (
      <View style={styles.centerOnScreen}>
        <MagnifyingGlass size={150} style={{}} />
        <Text style={[styles.heading_1]}>Search legislation</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBarFocused={searchBarFocused}
        setSearchBarFocused={setSearchBarFocused}
      />
      {/* If the query is blank, do not show filter buttons or empty search results section */}
      {searchTerm !== undefined ? <SearchFeatures /> : null}
      {searchBarFocused === false && searchTerm === undefined ? (
        <SearchPlaceholder />
      ) : null}
    </SafeAreaView>
  );
};

export default SearchScreen;
