import React, {useState} from 'react';
import {View, TextInput, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import HighlightText from '@sanar/react-native-highlight-text';

import data from '../data/mvavt_records.json';

import styles, {colors} from '../assets/styles';

import {FlashList} from '@shopify/flash-list';

const InfoList = (query, setQuery, data, filteredDataSource) => {
//   const [filteredDataSource, setFilteredDataSource] = useState(data);

  const navAid = useNavigation();

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
          {item.contravention.toUpperCase()}
          {/* <HighlightText
            searchWords={[query]}
            textToHighlight={item.contravention}
            highlightStyle={styles.searchResultsHighlight}
          /> */}
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

  const getItem = item => {
    // Navigate to the content screen when clicked
    navAid.navigate('ContentMVAScreen', {paramkey: item});
  };

  return (
    <View style={{height: 640}}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        estimatedItemSize={500}
        // initialNumToRender={500}
      />
    </View>
  );
};

export default InfoList;
