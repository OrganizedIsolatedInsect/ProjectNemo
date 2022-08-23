import React from 'react';
import styles from '../assets/styles';
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

  const dispatch = useDispatch();

  /*Output Section*/

  // checks if bookmarks state from redux store exists, if it doesn't render a no bookmark screen
  if (bookmarks.sections.length === 0) {
    return (
      <View>
        <Text>No Bookmarks Currently</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.background}>
          <FlatList
            data={bookmarks.sections}
            renderItem={({item}) => (
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={() =>
                    navAid.navigate('ContentCCScreen', {
                      section: item.section,
                    })
                  }>
                  <Text>
                    {item.section} {item.sectionHeader}
                  </Text>
                </Pressable>
                {/* trash can icon to delete bookmark */}
                <Icon
                  name="delete"
                  size={20}
                  onPress={() =>
                    dispatch(removeBookmark({section: item.section}))
                  }
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default BookmarkScreen;
