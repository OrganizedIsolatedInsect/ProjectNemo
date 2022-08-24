/* BROWSE screen - re-usable screen for browses for all legislation
 */

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, SectionList, StyleSheet} from 'react-native';

//USER Imports
import MVA from '../data/mvavt_records.json'; // for PRODUCTION Purposes
import {MVAData} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles from '../assets/styles';

const BrowseMVAScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const navAid = useNavigation();

  const data_Act = MVA.filter(element => element.source == 'Motor Vehicle Act');
  const data_Reg = MVA.filter(
    element => element.source == 'Motor Vehicle Act Regulations',
  );

  var data_Act_Array = [];
  data_Act_Array.push({title: 'Motor Vehicle Act', data: data_Act});

  var data_Reg_Array = [];
  data_Reg_Array.push({title: 'Motor Vehicle Act Regulations', data: data_Reg});

  const [ShowAct, setShowAct] = useState(data_Act_Array);
  const [ShowReg, setShowReg] = useState(data_Reg_Array);

  const [ShowActButton, setShowActButton] = useState(true);
  const [ShowRegButton, setShowRegButton] = useState(true);

  function onPressActHandler() {
    if (ShowAct.length === 0) {
      setShowAct(data_Act_Array);
      setShowActButton(!ShowActButton);
    } else setShowAct([]);
    setShowActButton(!ShowActButton);
  }

  function onPressRegHandler() {
    if (ShowReg.length === 0) {
      setShowReg(data_Reg_Array);
      setShowRegButton(!ShowRegButton);
    } else setShowReg([]);
    setShowRegButton(!ShowRegButton);
  }

  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        {/* ACT BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowActButton ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => onPressActHandler()}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowActButton ? '#E6E6E6' : '#000000',
            }}>
            Act
          </Text>
        </Pressable>
        <View>
          <Text> </Text>
        </View>
        {/* REGULATIONS BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowRegButton ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => onPressRegHandler()}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowRegButton ? '#E6E6E6' : '#000000',
            }}>
            Regulations
          </Text>
        </Pressable>
      </View>
      <View>
        {/* Start of SectionList */}

        <SectionList
          sections={[...ShowAct, ...ShowReg]}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Pressable
                key={item.index}
                onPress={() =>
                  navAid.navigate('ContentMVAScreen', {paramkey: item})
                }
                style={styles.innerContainer}>
                <View style={styles.innerContainerLeft}>
                  <Text>{item.contravention}</Text>
                  <Text>{item.provision}</Text>
                </View>
                <View style={styles.innerContainerRight}>
                  <Text>{item.fine}</Text>
                </View>
              </Pressable>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionListTitle}>
              <Text style={styles.heading_1}>{section.title}</Text>
              <Text style={styles.heading_2}>Definition</Text>
            </View>
          )}
          keyExtractor={item => item.index}
          stickySectionHeadersEnabled
        />

        {/* End of SectionList */}
      </View>
    </View>
  );
};

export default BrowseMVAScreen;

