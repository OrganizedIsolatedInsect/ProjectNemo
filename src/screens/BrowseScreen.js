//PACKAGE IMPORTS
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, FlatList} from 'react-native';

//USER Imports
import Bookmark from '../components/Bookmark';
import DATA from '../data/dummy-data';
import styles from '../assets/styles';

const BrowseScreen = props => {

  const navAid = useNavigation();


  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  const renderBrowseList = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navAid.navigate('ContentScreen')}><Text>{item.title}</Text></Pressable>
        <Bookmark />
      </View>
    );
  };


  /*OUTPUT*/
  return (

      <View style={styles.background}>

        <View style={styles.sectionDivider} />
        <Text style={[styles.heading_1, styles.neutral]}>Dev screen name: MVA BROWSE</Text>
        <Text style={styles.heading_2}>Heading 2</Text>
        <Text style={[styles.body, styles.accent_1]}>Body</Text>
        <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
        <View style={styles.sectionDivider} />
        <View>
          <Text>Flatlist setup goes here</Text>
          <FlatList
            data={DATA}
            renderItem={renderBrowseList}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

  );
};

export default BrowseScreen;
