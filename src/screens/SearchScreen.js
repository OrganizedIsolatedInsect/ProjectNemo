/*
 * Search Screen including Results
 */

import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = props => {
  return (
    <View style={styles.background}>
      <Text style={[styles.title, styles.secondary]}>Project Nemo</Text>
      <View>
        <Pressable onPress={() => navAid.navigate('SearchScreen')}>
          <View>
            <Ionicons name={'search-outline'} size={30} />
          </View>
        </Pressable>
      </View>
      <Text style={[styles.heading_1, styles.neutral]}>
        SEARCH SCREEN - ALL CONTENT
      </Text>
      <Text style={styles.heading_2}>Heading 2</Text>
      <Text style={[styles.body, styles.accent_1]}>Body</Text>
      <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
      <Ionicons name={'bookmark'} size={30} />
      <Ionicons name={'bookmark-outline'} size={30} />
      <Ionicons name={'book'} size={30} />
      <Ionicons name={'book-outline'} size={30} />
    </View>
  );
};

export default SearchScreen;
