import React from 'react';
import styles from '../assets/styles';

import {
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
//USER Imports
import Bookmark from '../components/Bookmark';

const BookmarkScreen = props => {
  const navAid = useNavigation();

  //*************TEST DATA for FLATLIST
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  //*************END TEST DATA

  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  const renderBookmarkList = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navAid.navigate('MVAContent')}><Text>{item.title}</Text></Pressable>
        <Bookmark />
      </View>
    );
  };

  /*Working Section*/
  return (
    <SafeAreaView>


      <View style={styles.background}>

        <Text style={[styles.heading_1, styles.neutral]}>Dev Screen name: BOOKMARK SCREEN</Text>
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
    </SafeAreaView>
  );
};

export default BookmarkScreen;

//bookmarks do not exist
