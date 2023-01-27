import React, {useRef} from 'react';
import {View, TextInput, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MagnifyingGlass, CloseIcon} from '../assets/icons';
import styles from '../assets/styles';
import {colors} from '../assets/styles';

// SearchBar receives the query value as the state from SearchScreen and the onChange prop
//      for the onChangeText. Additionally, receives the clearButtonPressed function so that
//      the Pressable clear button will reset the query state to blank when pressed.

const SearchBar = props => {
  // Function to clear all text (and state) entered into the searchbar
  const clearPressed = () => {
    props.setQuery();
    props.setSearchTerm();
  };
  // Pass the actual searched term back to the search screen and results
  const submitSearchTerm = () => {
    props.setSearchTerm(props.query);
  };

  const searchBarFocused = () => {
    props.setSearchBarFocused(true);
  };

  const searchBarBlurred = () => {
    props.setSearchBarFocused(false);
  };

  const inputReference = useRef(null); //Focus on textinput and open keyboard

  return (
    <SafeAreaView style={styles.searchView_Styling}>
      <TextInput
        style={styles.SearchBar_Styling}
        onChangeText={props.setQuery}
        value={props.query}
        underlineColorAndroid="transparent"
        placeholder="Search"
        returnKeyType="search"
        onSubmitEditing={submitSearchTerm}
        autoCapitalize="none"
        onFocus={searchBarFocused}
        onBlur={searchBarBlurred}
        ref={inputReference} //Focus on textinput and open keyboard
        onLayout={() => inputReference.current.focus()} //Focus on textinput and open keyboard
      />
      {/* Search Icon with styling to position it on the left of the Searchbar */}
      <MagnifyingGlass />
      {/* When the 'Close Icon' is pressed, this will clear the contents of the Searchbar and reset the query. */}
      <Pressable
        onPress={clearPressed}
        android_ripple={styles.closeIcon_ripple_styling}
        style={styles.closeIcon_pressable_styling}>
        <CloseIcon />
      </Pressable>
    </SafeAreaView>
  );
};

export default SearchBar;
