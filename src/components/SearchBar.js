// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

import React, {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Text, FlatList, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import HighlightText from '@sanar/react-native-highlight-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

import FilterButton from './FilterButton';

import styles, {colors} from '../assets/styles';

import {db} from './Database';

// TODO separate the searchbar and list components
//      replace spaces in the search query with '+' (RegEx?)
//      figure out 'Full Text Search' (FTS4 in SQLite) which will allow us to search across all columns
//      in a table without needing to hardcode the column names, etc.

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const [filteredMvaData, setFilteredMvaData] = useState([]);
  const [allMvaData, setAllMvaData] = useState([]);
  // prettier-ignore
  const [filteredMvaRegulationData, setFilteredMvaRegulationData] = useState([]);
  const [allMvaRegulationData, setAllMvaRegulationData] = useState([]);

  const [allCCData, setAllCCData] = useState([]);
  const [filteredCCData, setFilteredCCData] = useState([]);

  const [mvaFiltered, setMvaFiltered] = useState(false);
  const [mvaRegulationFiltered, setMvaRegulationFiltered] = useState(false);
  const [ccFiltered, setCcFiltered] = useState(false);

  // const [loading, setLoading] = useState(false);

  // Build wildcard search string for SQL
  let queryWildcard = `%${query}%`;

  const navAid = useNavigation();
  // console.log(filteredMvaData.length);
  // console.log(filteredCCData.length);
  // console.log(filteredMvaRegulationData.length);
  // console.log(mvaFiltered);
  // console.log(ccFiltered);

  // On load, set the full MVA and Criminal Code state for when you clear the query
  useEffect(() => {
    console.log('MVA');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM MVA where source = "Motor Vehicle Act"',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setAllMvaData(temp);
        },
      );
    });
    console.log('MVA Regulations');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM MVA where source = "Motor Vehicle Act Regulations"',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setAllMvaRegulationData(temp);
        },
      );
    });
    console.log('CC');
    db.transaction(tx => {
      tx.executeSql('SELECT DISTINCT * FROM CrimCode', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setAllCCData(temp);
      });
    });
  }, []);

  const queryForMvaAct = query => {
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

  const queryForMvaRegulation = query => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM MVA WHERE source = "Motor Vehicle Act Regulations" AND contravention like ? OR provision like ? OR sectionText like ? OR sectionSubsection like ? OR sectionParagraph like ? OR sectionSubparagraph like ?',
        [queryWildcard],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFilteredMvaRegulationData(temp);
        },
      );
    });
  };

  const queryForCCAct = query => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT DISTINCT * FROM CrimCode WHERE sectionHeader like ?',
        [queryWildcard],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFilteredCCData(temp);
        },
      );
    });
  };

  useEffect(() => {
    queryForMvaAct(query);
    queryForCCAct(query);
    queryForMvaRegulation(query);
  }, [query]);

  const motorVehicleItemView = ({item}) => {
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

  const criminalCodeItemView = ({item}) => {
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
            textToHighlight={item.sectionHeader}
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

  return (
    <View>
      <View style={styles.searchView_Styling}>
        <TextInput
          style={styles.SearchBar_Styling}
          onChangeText={text => setQuery(text)}
          // onSubmitEditing={text => setQuery(text)}
          // onChangeText={setQuery}
          value={query}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
        <Icon name="search" size={30} style={styles.searchIcon_styling} />
        <Pressable
          onPress={() => {
            setFilteredMvaData(allMvaData);
            setFilteredCCData(allCCData);
            setFilteredMvaRegulationData(allMvaRegulationData);
            setQuery('');
          }} // When the 'Close Icon' is pressed, this will clear the contents of the Searchbar and reset the query.
          android_ripple={styles.closeIcon_ripple_styling}
          style={styles.closeIcon_pressable_styling}>
          <Icon name="close" size={30} style={styles.closeIcon_styling} />
        </Pressable>
      </View>
      <View style={{...styles.alignOnRow, marginHorizontal: 10}}>
        <FilterButton
          buttonLabel={'Motor Vehicle Act'}
          onPress={() => {
            queryForMvaAct(query);
            setMvaFiltered(previousState => !previousState);
          }}
          query={query}
        />
        <FilterButton
          buttonLabel={'Motor Vehicle Act Regulations'}
          onPress={() => {
            queryForMvaRegulation(query);
            setMvaRegulationFiltered(previousState => !previousState);
          }}
          query={query}
        />
        <FilterButton
          buttonLabel={'Criminal Code'}
          onPress={() => {
            queryForCCAct();
            setCcFiltered(previousState => !previousState);
          }}
        />
      </View>
      {/* List out the resulting data */}
      <View style={{height: 640}}>
        {/* TODO Discussion to be had on options for listing component ie. Scollview, Flatlist, Sectionlist, Flashlist? */}

        {!ccFiltered ? (
          <View>
            <Text style={styles.alignOnRow}>Criminal Code</Text>
            <FlatList
              data={filteredCCData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={criminalCodeItemView}
            />
          </View>
        ) : null}

        {!mvaFiltered ? (
          <View>
            <Text style={styles.alignOnRow}>Motor Vehicle Act</Text>
            <FlatList
              data={filteredMvaData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={motorVehicleItemView}
            />
          </View>
        ) : null}

        {!mvaRegulationFiltered ? (
          <View>
            <Text style={styles.alignOnRow}>Motor Vehicle Act Regulations</Text>
            <FlatList
              data={filteredMvaRegulationData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={motorVehicleItemView}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SearchBar;
