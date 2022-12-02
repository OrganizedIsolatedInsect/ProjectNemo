import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = props => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne
  const [fullSomeData, setFullSomeData] = useState([]);
  const localLawType = props.lawType;
  const localData = props.data;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const bookmarkStateId = useSelector(state => state.bookmarks.bookmarkArray); //retrievs list of current bookmarks

  console.log('bookmark => props');

  console.log(bookmarkStateId);

  useEffect(() => {
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    setFullSomeData(localData);
  }, [localData]);

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  const dispatchAction = () => {
    if (marked === true) {
      dispatch(
        addBookmark({
          legislationGroup: {
            data: fullSomeData,
            passingKey: props.passingKey,
            heading1Label: props.heading1Label,
            heading1TitleText: props.heading1TitleText,
            heading2TitleText: props.heading2TitleText,
          },
          lawType: localLawType,
        }),
      );
    }
    if (marked === false) {
      dispatch(
        removeBookmark({
          legislationGroup: fullSomeData,
          lawType: localLawType,
        }),
      );
    }
  };
  useEffect(() => {
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (
      bookmarkStateId.some(e => e.bookmarkArray == fullSomeData) &&
      isFocused
    ) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [isFocused]);

  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction();
      }}>
      <View>{marked ? <BookmarkMarked /> : <BookmarkUnmarked />}</View>
    </Pressable>
  );
};

export default Bookmark;

//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press
