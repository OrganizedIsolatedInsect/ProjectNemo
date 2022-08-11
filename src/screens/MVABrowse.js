//PACKAGE IMPORTS
import React from 'react';
import styles from '../assets/styles';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, FlatList} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
//USER Imports
import Bookmark from '../components/Bookmark';
import DATA from '../dummydata/data';

const MVABrowse = props => {

  const navAid = useNavigation();


  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  const renderBrowseList = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navAid.navigate('MVAContent')}><Text>{item.title}</Text></Pressable>
        <Bookmark />
      </View>
    );
  };

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default MVABrowse;
