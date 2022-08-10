//PACKAGE IMPORTS
import React from 'react';
import styles from '../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, SafeAreaView, FlatList} from 'react-native';

//USER Imports
import Bookmark from '../components/Bookmark';

const MVABrowse = props => {
  //VARIABLE SETUP
  const navAid = useNavigation();

  //*************TEST DATA for FLATLIST
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  //*************END TEST DATA

  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  const renderBrowseList = ({title}) => {
    return (
      <View>
        <Text>{title}</Text>
        <Bookmark />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.background}>
      <View>

<View>
  <Ionicons name={'search-outline'} size={30} />
</View>

</View>

        <View style={styles.sectionDivider} />
        <Text style={[styles.heading_1, styles.neutral]}>MVA BROWSE</Text>
        <Text style={styles.heading_2}>Heading 2</Text>
        <Text style={[styles.body, styles.accent_1]}>Body</Text>
        <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
        <View style={styles.sectionDivider} />
        <View>
          <Text>Flatlist setup goes here</Text>
          <FlatList
            data={DATA}
            renderItem={renderBrowseList}
            keyExtractor={item => item.id}
            onPress={() => navAid.navigate('MVABrowse')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MVABrowse;
