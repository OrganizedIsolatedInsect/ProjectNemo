/* BROWSE screen - re-usable screen for browses for all legislation
 */

import React, {useState} from 'react';
import { View, FlatList } from 'react-native';

//USER Imports
import {CCDATAPARTS} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';



const BrowseCCScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner



  const renderList = itemdata => {

    return (
      <CrimCodeGridList
        index={itemdata.item.index}
        part={itemdata.item.part}
        section={itemdata.item.section}
        sectionHeader={itemdata.item.sectionHeader}
      />
    );
  };
  return (
    <View style={[styles.background, styles.container]}>
      <FlatList
        data={CCDATAPARTS}
        renderItem={renderList}
        keyExtractor={item => item.index}
        ItemSeparatorComponent={() => <View style={{margin: 15}} />}
      />


    </View>

  );
};



export default BrowseCCScreen;
