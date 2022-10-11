// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import HighlightText from '@sanar/react-native-highlight-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

import FilterButton from './FilterButton';

import styles, {colors} from '../assets/styles';

// TODO separate the searchbar and list components
//      figure out 'Full Text Search' (FTS4 in SQLite) which will allow us to search across all columns
//      in a table without needing to hardcode the column names, etc.

// SearchBar receives the query value as the state from SearchScreen and the onChange prop
//      for the onChangeText. Additionally, receives the clearButtonPressed function so that
//      the Pressable clear button will reset the query state to blank when pressed.

const SearchBarTest = props => {
  return (
    <View>
      {/* Searchbar component starts here */}
      <View style={styles.searchView_Styling}>
        <TextInput
          style={styles.SearchBar_Styling}
          onChangeText={props.onChange}
          value={props.query}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
        {/* Search Icon with styling to position it on the left of the Searchbar */}
        <Icon name="search" size={30} style={styles.searchIcon_styling} />
        {/* When the 'Close Icon' is pressed, this will clear the contents of the Searchbar and reset the query. */}
        <Pressable
          onPress={props.clearPressed}
          android_ripple={styles.closeIcon_ripple_styling}
          style={styles.closeIcon_pressable_styling}>
          <Icon name="close" size={30} style={styles.closeIcon_styling} />
        </Pressable>
      </View>
      {/* Searchbar component ends here */}
    </View>
  );
};

export default SearchBarTest;
