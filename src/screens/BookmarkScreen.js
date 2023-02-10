import React, {useEffect, useCallback} from 'react';
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
  const bookmarks = useSelector(state => state.bookmarks); //retrieve all the bookmarks from the redux store

  //create array for each section, then loop though bookmarks to parse into arrays
  let MVAArray = [];
  let CCArray = [];

  useEffect(() => {
    if (bookmarks.bookmarkArray.length > 0) {
      splitBookmarks();
    }
  }, [bookmarks, isFocused]);

  //created as function so it can be re-run during delete function - used to populate it's own flatlist.
  const splitBookmarks = useCallback(() => {
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
  }, [isFocused, bookmarks]);

  //run function to split bookmarks
  splitBookmarks();

  //actual render of the text part of the bookmark
  const renderText = item => {
    if (item.lawType === 'MVA') {
      return (
        <Text style={[styles.body, {color: colors.primaryText}]}>
          {item.bookmarkDisplayData.provision}{' '}
          {item.bookmarkDisplayData.contravention}
        </Text>
      );
    } else if (item.lawType === 'CC') {
      return (
        <Text style={[styles.body, {color: colors.primaryText}]}>
          {item.bookmarkDisplayData.sectionLabel}{' '}
          {item.bookmarkDisplayData.subsectionLabel}{' '}
          {item.bookmarkDisplayData.marginalNote}
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
            const provisionItem = item.bookmarkDisplayData.provision;
            navAid.navigate('ContentMVAScreen', {
              provisionKey: provisionItem,
            });
          }
          if (item.lawType === 'CC') {
            navAid.navigate(
              'ContentCCScreen',
              {
                heading2Key: item.heading2Key,
                marginalNoteKey: item.marginalNoteKey,
              }, //marginalNoteKey to be passed back to the ContentCCScreen -> Section.js
            );
          }
        }}
        android_ripple={{color: styles.AndroidRiplePressable}}>
        <Text>{renderText(item)}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch(
            removeBookmark({
              //passingKey: item.passingKey,
              marginalNoteKey: item.marginalNoteKey,
              provisionKey: item.provisionKey,
              lawType: item.lawType,
            }),
          );
        }}>
        <DeleteIcon />
      </Pressable>
    </View>
  );

  /*Output Section*/

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
              <FlatList data={CCArray} renderItem={renderBookmark} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default BookmarkScreen;
