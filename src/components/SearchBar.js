// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

import React, {useState, useEffect, useCallback} from 'react';
import {View, TextInput, Pressable, Text, FlatList, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import HighlightText from '@sanar/react-native-highlight-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles, {colors} from '../assets/styles';

import {db} from './Database';

// TODO separate the searchbar and list components
//      replace spaces in the search query with '+' (RegEx?)
//      figure out 'Full Text Search' (FTS4 in SQLite) which will allow us to search across all columns
//      in a table without needing to hardcode the column names, etc.

const SearchBar = () => {
  const [query, setQuery] = useState('');

  // const [filteredDataSource, setFilteredDataSource] = useState();
  // const [masterDataSource, setMasterDataSource] = useState();

  const [filteredMvaData, setFilteredMvaData] = useState([]);
  const [allMvaData, setAllMvaData] = useState([]);

  // const [allCCData, setAllCCData] = useState([]);
  // const [filteredCCData, setFilteredCCData] = useState([]);

  // const [loading, setLoading] = useState(false);

  // Build wildcard search string for SQL
  let queryWildcard = `%${query}%`;

  const navAid = useNavigation();
  console.log(filteredMvaData.length);

  useEffect(() => {
    console.log('first');
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM MVA', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setAllMvaData(temp);
      });
    });
  }, []);

  const queryForMvaAct = query => {
    console.log('Queried Term:', query);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM MVA WHERE contravention like ? OR provision like ? OR sectionText like ? OR sectionSubsection like ? OR sectionParagraph like ? OR sectionSubparagraph like ?',
        [queryWildcard],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFilteredMvaData(temp);
        },
      );
    });
  };

  useEffect(() => {
    queryForMvaAct(query);
  }, [query]);

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View>
        <Text
          style={[
            styles.searchResultsFlatList_ItemView,
            styles.body,
            {color: colors.primaryText},
          ]}
          onPress={() => getItem(item)}>
          {item.index + 1}
          {'. '}
          <HighlightText
            searchWords={[query]}
            textToHighlight={item.contravention}
            highlightStyle={styles.searchResultsHighlight}
          />
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.sectionDivider} />
    );
  };

  // Navigate to the content screen when clicked
  const getItem = item => {
    navAid.navigate('ContentMVAScreen', {paramkey: item, query: query});
  };

  const submitTextQuery = text => {
    setQuery(text);
  };

  return (
    <View>
      <View style={styles.searchView_Styling}>
        <TextInput
          style={styles.SearchBar_Styling}
          onChangeText={text => setQuery(text)}
          // onSubmitEditing={text => setQuery(text)}
          value={query}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
        <Icon name="search" size={30} style={styles.searchIcon_styling} />
        <Pressable
          onPress={() => {
            setFilteredMvaData(allMvaData);
            setQuery('');
          }} // When the 'Close Icon' is pressed, this will clear the contents of the Searchbar and reset the query.
          android_ripple={styles.closeIcon_ripple_styling}
          style={styles.closeIcon_pressable_styling}>
          <Icon name="close" size={30} style={styles.closeIcon_styling} />
        </Pressable>
      </View>
      <View>
        <Button title="debug" onPress={() => queryForMvaAct(query)} />
      </View>
      {/* List out the resulting data */}
      <View style={{height: 640}}>
        {/* TODO Discussion to be had on options for listing component ie. Scollview, Flatlist, Sectionlist, Flashlist? */}
        <FlatList
          // data={filteredDataSource}
          data={filteredMvaData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          // initialNumToRender={500}
        />
      </View>
    </View>
  );
};

export default SearchBar;
