import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {BookmarkMarked, BookmarkUnmarked} from '../assets/icons';

const Bookmark = props => {
  const [marked, setMarked] = useState(false);
  const [fullSomeData, setFullSomeData] = useState(); //max amount of data to be passed through the redux
  const localLawType = props.lawType;
  const localPassKey = props.heading2Key; //can be marginNoteKey from CC or provision from MVA
  const localData = props.data; //needs this data to pass through redux for rendering purposes.
  const localMarginalNoteKey = props.marginalNoteKey;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); //checks for state change of mark when screen is focussed (required when switching tab navigation components)
  const bookmarkStateId = useSelector(state => state.bookmarks.bookmarkArray); //retrieves list of current bookmarks

  //reloads the data state anytime new data is moved into the component.
  useEffect(() => {
    setFullSomeData(localData);
  }, [localData]);

  //function to check to see if items exist in the bookmark redux
  const checkBookmarkArray = () => {
    const checkBool =
      bookmarkStateId.some(
        e =>
          e.lawType === localLawType &&
          e.marginalNoteKey === localMarginalNoteKey, //passingkey: for CC it's marginNoteKey, for MVA it's provision
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
  }, [fullSomeData, marked, isFocused]);

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  //calls the redux methods for adding/remove from the redux store.  "marked" is opposite of logic because of the way react-native handles the use effect state changes.
  const dispatchAction = (bmData, bmKey, lawT, mNoteKey) => {
    console.log(bmData);
    console.log(bmKey);
    console.log(lawT);
    console.log(mNoteKey);
    if (marked === false) {
      dispatch(
        addBookmark({
          legislationGroup: bmData, //adds all data for output purposes on BookmarkScreen.js,
          heading2Key: bmKey, //for CC it's marginNoteKey, for MVA it's provision
          lawType: lawT,
          marginalNoteKey: mNoteKey,
          passingKey: mNoteKey,
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          passingKey: bmKey, //for CC it's marginNoteKey, for MVA it's provision
          lawType: lawT,
        }),
      );
    }
  };

  //render portion to implement the bookmark icon in the appropriate place.
  return (
    <Pressable
      onPress={() => {
        switchMarks();
        dispatchAction(
          fullSomeData,
          localPassKey,
          localLawType,
          localMarginalNoteKey,
        );
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
