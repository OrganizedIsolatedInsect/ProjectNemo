/*
 * Search Screen including Results
 */

import React, {useState} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchResults from '../components/SearchResults';

const SearchScreen = props => {
  const [query, setQuery] = useState('');

  const submitQuery = query => console.log(query);

  return (
    <SafeAreaView style={styles.background}>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TextInput
          style={styles.SearchBar_Styling}
          value={query}
          onChangeText={query => setQuery(query)}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
        <Icon name="search" size={45} onPress={query => submitQuery(query)} />
      </View> */}
      <SearchResults />
    </SafeAreaView>
  );
};

export default SearchScreen;
