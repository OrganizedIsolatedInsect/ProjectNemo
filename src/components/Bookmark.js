import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = ({
  //declare prop names passed to this bookmark component
  lawType, // determines which legislative table data is from
  bookmarkDisplayData, //object containing text to be displayed on bookmarks screen
  provisionKey, // key for MVA data
  heading2Key, // key for CC data by heading, passed on to bookmark screen for navigation purposes
  marginalNoteKey, // key for CC data, used for adding and removing bookmarks from state
}) => {
  const [marked, setMarked] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)

  const bookmarks = useSelector(state => state.bookmarks.bookmarkArray); //retrieves list of current bookmarks

  // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
  //isFocused is used to force the bookmark to refresh when user tabs back to accordion screen.
  useEffect(() => {
    if (checkBookmarkArray() === true) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [marked, isFocused]);

  //function to check to see if items exist in the bookmark redux
  const checkBookmarkArray = () => {
    let doesBookmarkExist = false;
    // checks if bookmark exists in Crim Code
    if (lawType === 'CC') {
      doesBookmarkExist = bookmarks.some(
        item => item.marginalNoteKey === marginalNoteKey,
      );
    }
    // checks if bookmark exists in MVA
    if (lawType === 'MVA') {
      doesBookmarkExist = bookmarks.some(
        item => item.provisionKey === provisionKey,
      );
    }
    return doesBookmarkExist;
  };

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  //calls the redux methods for adding/remove from the redux store.
  const dispatchAction = () => {
    if (marked === false) {
      //bookmark icon is empty
      dispatch(
        addBookmark({
          bookmarkDisplayData: bookmarkDisplayData,
          heading2Key: heading2Key,
          lawType: lawType,
          marginalNoteKey: marginalNoteKey,
          provisionKey: provisionKey,
        }),
      );
    }
    if (marked === true) {
      //bookmark icon is filled
      dispatch(
        removeBookmark({
          marginalNoteKey: marginalNoteKey,
          provisionKey: provisionKey,
          lawType: lawType,
        }),
      );
    }
  };

  //render portion to implement the bookmark icon in the appropriate place.
  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction();
      }}>
      <View>
        {marked === true && isFocused ? (
          <BookmarkMarked />
        ) : (
          <BookmarkUnmarked />
        )}
      </View>
    </Pressable>
  );
};

export default Bookmark;

//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press
