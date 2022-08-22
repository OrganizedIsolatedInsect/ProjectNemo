import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';

const Bookmark = (section, sectionHeader) => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne
  const dispatch = useDispatch();

  console.log(section, sectionHeader);
  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  const action = (section, sectionHeader) => {
    if (marked === true) {
      dispatch(
        addBookmark({
          section: section,
          sectionHeader: sectionHeader,
        }),
      );
    }
    if (marked === false) {
      dispatch(
        removeBookmark({
          section: section,
        }),
      );
    }
  };

  useEffect(() => {
    action(section, sectionHeader);
  });

  return (
    <Pressable
      onPress={() => {
        switchMarks();
      }}>
      <View>
        <Icon name={marked ? 'bookmark' : 'bookmark-outline'} size={30} />
      </View>
    </Pressable>
  );
};

export default Bookmark;

//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press
