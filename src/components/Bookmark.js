import React, {useState, useEffect, useCallback} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = props => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne
  const [fullSomeData, setFullSomeData] = useState();
  const localLawType = props.lawType;
  const localPassKey = props.passingKey;
  const localData = props.data;
  const localIndex = props.accordionIndex;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const bookmarkStateId = useSelector(state => state.bookmarks.bookmarkArray); //retrievs list of current bookmarks

  const checkBookmarkArray = () => {
    const checkBool = bookmarkStateId.some(
      e =>
        e.legislationGroup === fullSomeData &&
        e.lawType === localLawType &&
        e.passingKey === localPassKey &&
        e.indexOfList === localIndex,
    );
    console.log('checkBool');
    console.log(checkBool);
    return checkBool;
  };

  useEffect(() => {
    setFullSomeData(localData);
  }, [localData]);

  useEffect(() => {
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (checkBookmarkArray() === true) {
      console.log('return true');
      console.log(fullSomeData);
      setMarked(true);
    } else {
      console.log('return false');
      setMarked(false);
    }
  }, [fullSomeData]);

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  const dispatchAction = (bmData, bmKey, lawT, accIndex) => {
    if (marked === false) {
      dispatch(
        addBookmark({
          legislationGroup: bmData,
          passingKey: bmKey,
          lawType: lawT,
          indexOfList: accIndex,
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          legislationGroup: bmData,
          passingKey: bmKey,
          lawType: lawT,
          indexOfList: accIndex,
        }),
      );
    }
  };

  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction(fullSomeData, localPassKey, localLawType, localIndex);
      }}>
      <View>{marked === true ? <BookmarkMarked /> : <BookmarkUnmarked />}</View>
    </Pressable>
  );
};

export default Bookmark;

//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press
