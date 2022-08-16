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

  const bookmarks = useSelector(state => state.bookmarks);
  console.log(bookmarks);
  const dispatch = useDispatch();

  /*Output Section*/
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <FlatList
          data={bookmarks.sections}
          renderItem={({item}) => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                onPress={() =>
                  navAid.navigate('MVAContent', {
                    section: item.section,
                  })
                }>
                <Text>
                  {item.section} {item.sectionHeader}
                </Text>
              </Pressable>

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
      <View>
        <Button title="debug" onPress={() => console.log(bookmarks)} />
      </View>

  );
};

export default BookmarkScreen;
