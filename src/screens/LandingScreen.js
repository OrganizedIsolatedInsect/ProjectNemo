//PACKAGE Imports
import React, {useState} from 'react';
import {View, FlatList} from 'react-native';

//USER IMPORTS
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';
import styles from '../assets/styles';

const LandingScreen = props => {
  const [useableData, setUsableData] = useState(LEGISLATION);

  //Function for setting up the Render list for the FlatList; Generic depending on what data is showing
  const renderList = itemdata => {
    return (
      <LegislationGridList
        id={itemdata.item.id}
        title={itemdata.item.title}
        destination={itemdata.item.destination}
        dataSource={itemdata.item.dataSource}
      />
    );
  };

  /*OUTPUT*/
  return (
    <View>
      <View style={[styles.background, styles.container]}>
        <View>
          <FlatList
            data={LEGISLATION}
            renderItem={renderList}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{margin: 15}} />}
          />
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;
