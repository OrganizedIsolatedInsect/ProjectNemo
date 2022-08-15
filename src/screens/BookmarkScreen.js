import React from 'react';

import {Text, View, Button, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Bookmark from '../components/Bookmark';
import DATA from '../data/dummy-data';
import styles from '../assets/styles';

const BookmarkScreen = props => {
  const navAid = useNavigation();



/*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  const renderBookmarkList = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navAid.navigate('ContentScreen')}>
          <Text>{item.title}</Text>
        </Pressable>
        <Bookmark />
      </View>
    );
  };

  /*Output Section*/
  return (

      <View style={styles.background}>
        <Text style={[styles.heading_1, styles.neutral]}>
          Dev Screen name: BOOKMARK SCREEN
        </Text>
        <View style={styles.sectionDivider} />
        <View>
          <Text>Insert Filters Here</Text>
          <Button
            style={styles.filterButton}
            onpress={''}
            title="Create filters here"
          />
        </View>
        <View style={styles.sectionDivider} />
        <View>
          <Text>Flatlist setup goes here</Text>
          <FlatList
            data={DATA}
            renderItem={renderBookmarkList}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

  );
};

export default BookmarkScreen;

