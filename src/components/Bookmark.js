import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = props => {
  const [marked, setMarked] = useState(false);
  const [fullSomeData, setFullSomeData] = useState(); //max amount of data to be passed through the redux
  //const [array, setArray] = useState([]);
  const localLawType = props.lawType;
  const localPassKey = props.passingKey; //can be marginNoteKey from CC or provision from MVA
  const localData = props.data; //needs this data to pass through redux for rendering purposes.
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const bookmarkStateId = useSelector(state => state.bookmarks.bookmarkArray); //retrieves list of current bookmarks

  // Notes for development.  Only pass thefields you need through the redux.  Do not pass an entire array of data.

  //CHECK WHY BOOKMARK IS INPUTING 2 BOOKMARKS ON THE BOOKMARK SCREEN OF THE SAME ITEM

  //reloads the data state anytime new data is moved into the component.
  useEffect(() => {
    setFullSomeData(localData);
  }, [localData]);

  //function to check to see if items exist in the bookmark redux
  const checkBookmarkArray = () => {
    const checkBool =
      bookmarkStateId.some(
        e => e.lawType === localLawType && e.passingKey === localPassKey,
      ) && isFocused;
    return checkBool;
  };

  // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
  //isFocused is used to force the bookmark to refresh when user tabs back to accordion screen.
  useEffect(() => {
    if (checkBookmarkArray() === true) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [fullSomeData, isFocused]);

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  //calls the redux methods for adding/remove from the redux store.  "marked" is opposite of logic because of the way react-native handles the use effect state changes.
  const dispatchAction = (bmData, bmKey, lawT) => {
    if (marked === false) {
      dispatch(
        addBookmark({
          legislationGroup: bmData,
          passingKey: bmKey,
          lawType: lawT,
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          passingKey: bmKey,
          lawType: lawT,
        }),
      );
      switchMarks();
    }
  };

  //render portion to implement the bookmark icon in the appropriate place.
  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction(fullSomeData, localPassKey, localLawType);
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
