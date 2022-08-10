import React from 'react';
import styles from '../assets/styles';

import {Text, View} from 'react-native';

const SearchResultScreen = ({ route }) => {
  return (
    <View>
      <Text style={styles.title}>Search Result Screen</Text>
      <Text>{route.name}</Text>
    </View>
  );
};

export default SearchResultScreen;
