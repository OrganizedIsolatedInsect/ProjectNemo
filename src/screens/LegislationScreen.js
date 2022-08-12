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

  //Function for setting up the Render list for the FlatList
  const renderLegislationList = itemdata => {
    return (
      <LegislationGridList
        id={itemdata.item.id}
        title={itemdata.item.title}
        destination={itemdata.item.destination}
      />
    );
  };

  //Function for setting up the Render list for the FlatList
  const renderMVARecords = itemdata => {
    return (
      <MVAGridList
        provision={itemdata.item.provision}
        contravention={itemdata.item.contravention}
        fine={itemdata.item.fine}
      />
    );
  };

  /*OUTPUT*/
  return (
    <SafeAreaView>
      <View style={styles.background}>
        if (currentScreen === 'Landing')
        {<FlatList data={LEGISLATION} renderItem={renderLegislationList} />}
        else {<FlatList data={MVA} renderItem={renderMVARecords} />}
        {/* <FlatList data={ LEGISLATION } renderItem={renderLegislationList} /> */}
        {/* <FlatList data={MVA} renderItem={renderMVARecords} /> */}
      </View>
    </SafeAreaView>
  );
};

export default LegislationScreen;
