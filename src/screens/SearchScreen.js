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

  const [crimCodeFilter, setCrimCodeFilter] = useState(false);
  const [mvaFilter, setMvaFilter] = useState(false);
  const [mvaRegulationFilter, setMvaRegulationFilter] = useState(false);

  const filterArray = [
    {
      type: 'Criminal Code',
      filterState: crimCodeFilter,
    },
    {
      type: 'Motor Vehicle Act',
      filterState: mvaFilter,
    },
    {
      type: 'Motor Vehicle Regulations',
      filterState: mvaRegulationFilter,
    },
  ];

  const SearchFeatures = () => {
    return (
      <View>
        <View style={styles.alignOnRow}>
          {/* Implementation of FilterButton Component */}
          <FilterButton
            buttonLabel="Criminal Code"
            setFilter={setCrimCodeFilter}
            filterState={crimCodeFilter}
          />
          <FilterButton
            buttonLabel="Motor Vehicle Act"
            setFilter={setMvaFilter}
            filterState={mvaFilter}
          />
          <FilterButton
            buttonLabel="Motor Vehicle Regulations"
            setFilter={setMvaRegulationFilter}
            filterState={mvaRegulationFilter}
          />
        </View>
        <View>
          <SearchResults
            searchQueryTerm={searchTerm}
            filterArray={filterArray}
          />
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
