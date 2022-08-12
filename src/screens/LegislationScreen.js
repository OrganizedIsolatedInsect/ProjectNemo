import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView, Text, View} from 'react-native';
import styles from '../assets/styles';
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';
import MVAGridList from '../components/MVAGridList';
import MVA from '../data/mvavt_records.json';



const LegislationScreen = () => {

  const [currentScreen, setCurrentScreen] = useState('Landing');
  const [useableData, setUsableData] = useState(LEGISLATION);


  /*Switch data depending on what "screen" user is on.*/
  const CurrentData = () => {
    if (currentScreen === 'Landing') {
      setUsableData(LEGISLATION);

    } else {
      setUsableData(MVA);
    };

  };

  //Function for setting up the Render list for the FlatList; Generic depending on what data is showing
  const renderList = itemdata => {
    if (currentScreen === 'Landing') {
      return(
      <LegislationGridList
        id={itemdata.item.id}
        title={itemdata.item.title}
        destination={itemdata.item.destination}
      />);
    } else {
      return (
        <MVAGridList
          provision={itemdata.item.provision}
          contravention={itemdata.item.contravention}
          fine={itemdata.item.fine}
        />
      );
    }
  };

  /*OUTPUT*/


  return (
    <SafeAreaView>
      <CurrentData />
      <View style={styles.background}>
        <View>

          <FlatList data={useableData} renderItem={renderList} keyExtractor={item => item.id} />
        </View>
      </View> 
    </SafeAreaView>
  );
};

export default LegislationScreen;
