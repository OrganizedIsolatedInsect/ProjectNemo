import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, View} from 'react-native';
import styles from '../assets/styles';
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';
import MVAGridList from '../components/MVAGridList';
import MVA from '../data/mvavt_records.json';

const LegislationScreen = () => {
  //const MVARecords = JSON.parse(MVA);
  const [currentScreen, setCurrentScreen] = useState('Landing');
  const [currentData, setCurrentData] = useState(LEGISLATION);

  const CurrentData = () => {
    console.log(currentData);
    if (currentScreen === 'Landing') {
      setCurrentData(LEGISLATION);
    } else {
      setCurrentData(MVA);
    }
  };

  //Function for setting up the Render list for the FlatList
  const renderList = itemdata => {
    if (currentScreen === 'Landing') {
      console.log('render landing');
      <LegislationGridList
        id={itemdata.item.id}
        title={itemdata.item.title}
        destination={itemdata.item.destination}
      />;
    } else {
      console.log('render not landing');
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
        <FlatList data={currentData} renderItem={renderList} />
      </View> 
    </SafeAreaView>
  );
};

export default LegislationScreen;
