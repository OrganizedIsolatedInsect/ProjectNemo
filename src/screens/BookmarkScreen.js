import React from 'react';
import styles from '../assets/styles';

import {SafeAreaView, Text, View, Button, FlatList, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchStack } from '../navigation/StackNavigation';
import { useNavigation } from '@react-navigation/native';

const BookmarkScreen = props => {
  //console.log(props);



  const navAid = useNavigation();

  console.log(props)
    //Prepares data to be output to flatlistlist
  const renderBookmarkList = () => {
    return <View></View>;
  };


  
  return (
    <SafeAreaView>
    <View style={styles.background}>
      <Text style={[styles.title, styles.primary]}>Project Nemo</Text>
      <View>

        <Pressable
         onPress={() =>navAid.navigate('SearchStack', {screen:'SearchResultScreen'})}
          >

          <View>
            <Ionicons name={'search-outline'} size={30} />
          </View>
        </Pressable>


      </View>
      <Text style={[styles.heading_1, styles.neutral]}>My Bookmarks</Text>

      <View style={styles.filterBox}>
        <Button
          style={styles.filterButton}
          onpress={''}
          title="Create filters here"
        />
        <Text>Insert Filters Here</Text>
      </View>

      <View>
        <Text>Flatlist setup goes here</Text>
        <FlatList data={renderBookmarkList} />
      </View>
    </View>
    </SafeAreaView>
  );
};



export default BookmarkScreen;




//          onPress={navAid.navigate('SearchResultScreen')}>
//          onPress={() => navAid.navigate('SearchStack', {screen: 'SearchResultScreen'})}>