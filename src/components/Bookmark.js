//REMOVE THIS AS REDUNDENT

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import styles from '../assets/styles';
import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = (data, lawType) => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne
  const localLawType = lawType;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const bookmarkStateId = useSelector(state => state.bookmarks.bookmarkArray); //retrievs list of current bookmarks

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  const dispatchAction = (data, localLawType) => {
    if (marked === true) {
      dispatch(
        addBookmark({
          legislationGroup: data,
          // sectionHeader: sectionHeader,
          lawType: localLawType,
        }),
      );
    }
    if (marked === false) {
      dispatch(
        removeBookmark({
          legislationGroup: data,
          lawType: localLawType,
        }),
      );
    }
  };

  useEffect(() => {
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (bookmarkStateId.some(e => e.bookmarkArray == data) && isFocused) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [isFocused]);

  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction(data, localLawType);
      }}>
      <View>{marked ? <BookmarkMarked /> : <BookmarkUnmarked />}</View>
    </Pressable>
  );
};

export default Bookmark;

//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press
