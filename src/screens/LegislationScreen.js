import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';
import {FlatList, View} from 'react-native';
import styles from '../assets/styles';


const LegislationScreen = () => {

  //Function for setting up the Render list for the FlatList 
  const renderLandingList = (itemdata) => {
    return(
    <LegislationGridList
      id={itemdata.item.id}
      title={itemdata.item.title}
      destination={itemdata.item.destination}
    />);

  };

  /*OUTPUT*/
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <FlatList data={ LEGISLATION } renderItem={renderLandingList} />
      </View>
    </SafeAreaView>
  );
};

export default LegislationScreen;

