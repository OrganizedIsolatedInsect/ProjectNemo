import React from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Button, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {removeBookmark} from '../redux/bookmarkSlice';

const BookmarkScreen = props => {
  const navAid = useNavigation();

  //get bookmarks from state redux store
  const bookmarks = useSelector(state => state.bookmarks);

  //create array for each section, then loop though bookmarks to parse into arrays
  let MVAArray = [];
  let CCArray = [];

  for (let i = 0; i < bookmarks.sections.length; ++i) {
    if (bookmarks.sections[i].lawtype == 'MVA') {
      MVAArray.push(bookmarks.sections[i]);
    }
    if (bookmarks.sections[i].lawtype == 'CC') {
      CCArray.push(bookmarks.sections[i]);
    }
  }

  const dispatch = useDispatch();

  //render bookmark links and navigate based on section type
  const renderBookmark = ({item}) => (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Pressable
        onPress={() => {
          if (item.lawtype === 'MVA') {
            const provisionItem = item.section;
            navAid.navigate('ContentMVAScreen', {
              provisionId: provisionItem,
            });
          }
          if (item.lawtype === 'CC') {
            const sectionId = item.section;
            navAid.navigate('ContentCCScreen', {
              section: sectionId,
            });
          }
        }}>
        <Text style={[styles.body, {color: colors.primaryText}]}>
          {item.section} {item.sectionHeader}
        </Text>
      </Pressable>

      <Icon
        name="delete"
        size={20}
        onPress={() => dispatch(removeBookmark({section: item.section}))}
      />
    </View>
  );

  /*Output Section*/

  if (bookmarks.sections.length === 0) {
    return (
      <View style={styles.centerOnScreen}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          No Bookmarks Currently
        </Text>
        <Icon
          name="collections-bookmark"
          size={200}
          style={{color: colors.primaryText}}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.background}>
          {/* conditional headers based on section array length */}
          {MVAArray.length > 0 && (
            <View>
              <Text style={styles.heading_2}>Motor Vehicle Act</Text>
              <FlatList data={MVAArray} renderItem={renderBookmark} />
            </View>
          )}
          {CCArray.length > 0 && (
            <View>
              <Text style={styles.heading_2}>Criminal Code of Canada</Text>
              <FlatList data={CCArray} renderItem={renderBookmark} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default BookmarkScreen;
