import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import styles, {colors} from '../assets/styles';
import {removeBookmark} from '../redux/bookmarkSlice';
import {DeleteIcon, LargeBookmarkIcon} from '../assets/icons';

const BookmarkScreen = () => {
  const navAid = useNavigation();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const dispatch = useDispatch();
  // console.log('props');
  // console.log(props);
  //get bookmarks from state redux store
  const bookmarks = useSelector(state => state.bookmarks); //retrieve all the bookmarks from the  redux store
  console.log('bookmark screen => bookmarks');
  console.log(bookmarks);

  //create array for each section, then loop though bookmarks to parse into arrays
  let MVAArray = [];
  let CCArray = [];

  //created as function so it can be re-run during delete function
  const splitBookmarks = () => {
    console.log('in splitbookmarks');
    console.log(bookmarks);
    MVAArray = [];
    CCArray = [];
    for (let i = 0; i < bookmarks.bookmarkArray.length; ++i) {
      if (bookmarks.bookmarkArray[i].lawType === 'MVA') {
        MVAArray.push(bookmarks.bookmarkArray[i]);
      }
      if (bookmarks.bookmarkArray[i].lawType === 'CC') {
        CCArray.push(bookmarks.bookmarkArray[i]);
      }
    }
    console.log('CCArray ');
    console.log(CCArray);
  };

  useEffect(() => {
    if (bookmarks.bookmarkArray.length > 0) {
      splitBookmarks();
    }
  }, [bookmarks, isFocused]);

  const renderText = item => {
    if (item.lawType === 'MVA') {
      return (
        <Text style={[styles.body, {color: colors.primaryText}]}>
          {item.legislationGroup.provision}{' '}
          {item.legislationGroup.contravention}
        </Text>
      );
    } else if (item.lawType === 'CC') {
      return (
        <Text>
          {item.legislationGroup.sectionLabel}{' '}
          {item.legislationGroup.subsectionLabel}{' '}
          {item.legislationGroup.marginalNote}
        </Text>
      );
    }
  };

  //render bookmark links and navigate based on section type.  Includes pressable
  const renderBookmark = ({item}) => (
    <View style={styles.bookmarkRender}>
      <Pressable
        onPress={() => {
          if (item.lawType === 'MVA') {
            const provisionItem = item.legislationGroup.provision;
            navAid.navigate('ContentMVAScreen', {
              provisionId: provisionItem,
            });
          }
          if (item.lawType === 'CC') {
            const functionPassingKey = item.passingKey;
            navAid.navigate('ContentCCScreen', {
              props: {
                params: functionPassingKey,
              },
            });
          }
        }}>
        <Text>{renderText(item)}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log(item.passingKey);
          console.log(item.lawType);
          dispatch(
            removeBookmark({
              passingKey: item.passingKey,
              lawType: item.lawType,
              field1: item.field1,
            }),
          );
        }}>
        <DeleteIcon />
      </Pressable>
    </View>
  );

  /*Output Section*/
  splitBookmarks();
  if (bookmarks.bookmarkArray.length === 0) {
    return (
      <View style={styles.centerOnScreen}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          No Bookmarks Currently
        </Text>
        <LargeBookmarkIcon />
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
              <FlatList
                data={CCArray}
                renderItem={renderBookmark}
                keyExtractor={item => item.index}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default BookmarkScreen;
