//PACKAGE Imports
import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

//USER IMPORTS
import LegislationGridList from '../components/LegislationGridList';
import {LEGISLATION} from '../data/LegislationMenuItems';
import MVA from '../data/mvavt_records.json';
import styles from '../assets/styles';

const LandingScreen = props => {
  const navAid = useNavigation();

  const [currentScreen, setCurrentScreen] = useState('Landing');
  const [useableData, setUsableData] = useState(LEGISLATION);

  /*Switch data depending on what "screen" user is on.*/
  const CurrentData = () => {
    if (currentScreen === 'Landing') {
      setUsableData(LEGISLATION);
    } else {
      setUsableData(MVA);
    }
  };

  //Function for setting up the Render list for the FlatList; Generic depending on what data is showing
  const renderList = itemdata => {
    if (currentScreen === 'Landing') {
      return (
        <LegislationGridList
          id={itemdata.item.id}
          title={itemdata.item.title}
          destination={itemdata.item.destination}
        />
      );
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
    <View>
      <CurrentData />
      <View style={styles.background}>
        <View>
          <FlatList
            data={useableData}
            renderItem={renderList}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );

  //   return (
  //     <SafeAreaView>
  //     <View style={styles.background}>

  //       <View style={styles.sectionDivider} />
  //       <Text style={[styles.heading_1, styles.neutral]}>Dev screen name: LANDING SCREEN</Text>
  //       <View style={styles.sectionDivider} />
  //       <View><Pressable onPress={() => navAid.navigate('MVABrowse')}><Text style={styles.heading_2}>Criminal Code of Canada</Text></Pressable></View>
  //       <View style={styles.sectionDivider} />
  //       <View><Pressable onPress={() => navAid.navigate('MVABrowse')}><Text style={styles.heading_2}>Motor Vehicle Act / Regulations</Text></Pressable></View>
  //       <View style={styles.sectionDivider} />
  //       <Text style={[styles.body, styles.accent_1]}>Body</Text>
  //       <Text style={[styles.body, styles.accent_2]}>Body 2</Text>

  //     </View>
  //     </SafeAreaView>
  //   );
};

export default LandingScreen;
