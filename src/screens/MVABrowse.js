//PACKAGE IMPORTS
import React from 'react';
import styles from '../assets/styles';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//USER Imports

import DATA from '../dummydata/data';

const MVABrowse = props => {
  const navAid = useNavigation();

  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/

  // renders flat list and sends section number as prop for content page
  const renderBrowseList = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() =>
            navAid.navigate('MVAContent', {
              section: item.section,
            })
          }>
          <Text>
            {item.section} {item.title}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Text style={[styles.heading_1, styles.neutral]}>
          Dev screen name: MVA BROWSE
        </Text>

        <View style={styles.sectionDivider} />
        <View>
          <FlatList
            data={DATA}
            renderItem={renderBrowseList}
            keyExtractor={item => item.section}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MVABrowse;
