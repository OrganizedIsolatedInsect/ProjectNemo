/* BROWSE screen - re-usable screen for browses for all legislation
 */

import React, {useState} from 'react';
import { View, FlatList, SectionList, StyleSheet } from 'react-native';

//USER Imports
import {CCDATAPARTS} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';

const BrowseCCScreen = ({route}) => {
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

  const Item = ({ part }) => (
    <View style={sty.item}>
      <Text style={sty.title}>{part}</Text>
    </View>
  );
  
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

const sty = StyleSheet.create({
    screen: {
      marginTop: 18,
    },
    header: {
      fontSize: 30,
      color: "#FFF",
      marginTop: 10,
      padding: 2,
      backgroundColor: "#C2185B",
      textAlign: "center",
    },
    row: {
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 2,
      },
      rowText: {
        fontSize: 18,
      },
  });

export default BrowseCCScreen;
