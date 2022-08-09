import React from 'react';
import styles from '../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, View, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SearchStack } from '../navigation/navigator';

const LegislationScreen = ({navigation}) => {
  return (
    <View style={styles.background}>s
      <View>
        <Text style={[styles.title, styles.secondary]}>Project Nemo </Text>
        {/* <TouchableOpacity  onPress={() => navigation.navigate('AdvancedSearchScreen')}>
          <View>
          <Ionicons name={'search-outline'} size={30} />
          </View>
        </TouchableOpacity> */}
      </View>

      <Text style={[styles.heading_1, styles.neutral]}></Text>
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

export default LegislationScreen;
