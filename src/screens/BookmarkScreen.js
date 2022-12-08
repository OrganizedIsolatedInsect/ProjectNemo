import React from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {removeBookmark} from '../redux/bookmarkSlice';

const BookmarkScreen = props => {
  const navAid = useNavigation();

  //get bookmarks from state redux store
  const bookmarks = useSelector(state => state.bookmarks); //retrieve all the bookmarks from the  redux store
  console.log('bookmark screen => bookmarks');
  console.log(bookmarks);

  //create array for each section, then loop though bookmarks to parse into arrays
  let MVAArray = [];
  let CCArray = [];

  for (let i = 0; i < bookmarks.bookmarkArray.length; ++i) {
    if (bookmarks.bookmarkArray[i].lawType == 'MVA') {
      MVAArray.push(bookmarks.bookmarkArray[i]);
    }
    if (bookmarks.bookmarkArray[i].lawType == 'CC') {
      CCArray.push(bookmarks.bookmarkArray[i]);
    }
  }
  console.log('CCArray ');
  console.log(CCArray);
  const dispatch = useDispatch();

  const renderText = item => {
    if (item.lawType == 'MVA') {
      return (
        <Text style={[styles.body, {color: colors.primaryText}]}>
          {item.legislationGroup.provision}{' '}
          {item.legislationGroup.contravention}
        </Text>
      );
    } else if (item.lawType == 'CC') {
      return (
        <Text>
          {item.legislationGroup.sectionLabel}{' '}
          {item.legislationGroup.subsectionLabel}{' '}
          {item.legislationGroup.marginalNote} {item.index}
        </Text>
      );
    }
  };

  //render bookmark links and navigate based on section type
  const renderBookmark = ({item}) => (
    <View style={styles.bookmarkRender}>
      <Pressable
        onPress={() => {
          if (item.lawType === 'MVA') {
            const provisionItem = item.legislationGroup.provision;
            navAid.navigate('ContentMVAScreen', {
              provisionId: provisionItem,
            });
          }
          if (item.lawType === 'CC') {
            const functionPassingKey = item.passingKey;
            navAid.navigate('ContentCCScreen', {
              props: {
                params: functionPassingKey,
              },
            });
          }
        }}>
        <Text>{renderText(item)}</Text>
      </Pressable>

      <Icon
        name="delete"
        size={40} //TO DO - Fix this
        onPress={() => {
          dispatch(
            removeBookmark({
              // legislationGroup: item.legislationGroup,
              passingKey: item.passingKey,
              lawType: item.lawType,
              // index: item.index,
              // id: item.index,
              //indexOfList: item.indexOfList,
            }),
          );
        }}
      />
    </View>
  );

  /*Output Section*/

  if (bookmarks.bookmarkArray.length === 0) {
    return (
      <View style={styles.centerOnScreen}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          No Bookmarks Currently
        </Text>
        <Icon
          name="collections-bookmark"
          size={200}
          style={{color: colors.primaryText}}
        />
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
              <FlatList
                data={MVAArray}
                renderItem={renderBookmark}
                keyExtractor={item => item.index}
              />
            </View>
          )}
          {CCArray.length > 0 && (
            <View>
              <Text style={styles.heading_2}>Criminal Code of Canada</Text>
              <FlatList
                data={CCArray}
                renderItem={renderBookmark}
                keyExtractor={item => item.index}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default BookmarkScreen;
