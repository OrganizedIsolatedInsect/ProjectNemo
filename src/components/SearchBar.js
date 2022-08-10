import React, {useState} from 'react';
import {View, TextInput, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../assets/styles';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.searchView_Styling}>
      <TextInput
        placeholder="Search ..."
        value={query}
        onChange={e => setQuery(e.target.query)}
        style={styles.SearchBar_Styling}
      />
      <Icon name="search" size={30} style={styles.searchIcon_styling} />
      <Pressable
        onPress={() => {
          setQuery('');
        }} // When the 'Close Icon' is pressed, this will clear the contents of the Searchbar and reset the query.
        android_ripple={styles.closeIcon_ripple_styling}
        style={styles.closeIcon_pressable_styling}>
        <Icon name="close" size={30} style={styles.closeIcon_styling} />
      </Pressable>
    </View>
  );
};

export default SearchBar;
