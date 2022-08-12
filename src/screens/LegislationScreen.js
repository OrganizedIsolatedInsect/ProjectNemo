import React from 'react';
import styles from '../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';

import {FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


const LegislationScreen = () => {


  const renderLandingList = (itemdata) => {
    console.log('Legscreen' + JSON.stringify(itemdata));

    return(
    <LegislationGridList
      id={itemdata.item.id}
      title={itemdata.item.title}
      destination={itemdata.item.destination}
    />);



    console.log('legscreen - Legscreen other side iof gridlist');
  };






  console.log('Legscreen before flatlist');
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View>{console.log('inside return')}</View>


        <FlatList data={ LEGISLATION } renderItem={renderLandingList} />
      </View>
    </SafeAreaView>
  );
};

export default LegislationScreen;
//        keyExtractor={(item, index) => item.id}
