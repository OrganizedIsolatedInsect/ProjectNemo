
/* BROWSE screen - re-usable screen for browses for all legislation
*/

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, ScrollView, StyleSheet} from 'react-native';

//USER Imports
import MVA from '../data/mvavt_records.json';  // for PRODUCTION Purposes
import { MVAData } from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles from '../assets/styles';



const BrowseMVAScreen = (props) => {

  const [ShowAct, setShowAct] = useState(true);
  const [ShowReg, setShowReg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);      //for loading spinner

  const navAid = useNavigation();

  return (

    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        {/* Hide Show View component
        https://snack.expo.dev/@kkevranian/example-to-hide-show-view-component-in-react-native-on-button-click?platform=web */}

        {/* ACT BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowAct ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => setShowAct(!ShowAct)}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowAct ? '#E6E6E6' : '#000000',
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
            backgroundColor: ShowReg ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => setShowReg(!ShowReg)}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowReg ? '#E6E6E6' : '#000000',
            }}>
            Regulations
          </Text>
        </Pressable>

        {/*Here we will return the view when state is true and will return false if state is false*/}
      </View>
      <View>
        <ScrollView>
          {ShowAct ? (
            <View style={styles.container}>
              <Text style={styles.heading_1}>Motor Vehicle Act</Text>
              <Text style={styles.heading_2}>Definitions</Text>
              {MVA.filter(MVA_List => {
                return MVA_List.source === 'Motor Vehicle Act';
              }).map(MVA_List => {
                return (
                  <Pressable
                    key={MVA_List.index}
                    onPress={() => navAid.navigate('ContentMVAScreen', {paramkey: MVA_List})}
                    style={styles.innerContainer}>
                    <View style={styles.innerContainerLeft}>
                      <Text>{MVA_List.contravention}</Text>
                      <Text>{MVA_List.provision}</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                      <Text>{MVA_List.fine}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {ShowReg ? (
            <View style={styles.container}>
              <Text style={styles.heading_1}>Motor Vehicle Act Regulation</Text>
              <Text style={styles.heading_2}>Definitions</Text>
              {MVA.filter(MVA_List => {
                return MVA_List.source === 'Motor Vehicle Act Regulations';
              }).map(MVA_List => {
                return (
                  <Pressable
                    key={MVA_List.index}
                    style={styles.innerContainer}
                    onPress={() => navAid.navigate('ContentMVAScreen', {paramkey: MVA_List})}>
                    <View style={styles.innerContainerLeft}>
                      <Text>{MVA_List.contravention}</Text>
                      <Text>{MVA_List.provision}</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                      <Text>{MVA_List.fine}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default BrowseMVAScreen;



//SAMPLE CODES AND SOURCES
{
  /// Maping JSON example ///
  /* {MVA.map(MVA_List => {
return (
  <View key={MVA_List.index} style={styles.innerContainer}>
    <View>
      <Text>{MVA_List.contravention}</Text>
    </View>
    <View>
      <Text>{MVA_List.provision}</Text>
    </View>
    <View>
      <Text>{MVA_List.fine}</Text>
    </View>
  </View>
);
})} */
  // Fetch data from JSON: https://www.youtube.com/watch?v=aJgAwjP20RY
  // Used Filter then map JSON: https://www.youtube.com/watch?v=8MoElay6dWU
}