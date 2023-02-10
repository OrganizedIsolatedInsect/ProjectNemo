//PACKAGE Imports
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

//USER IMPORTS
import LegislationGridList from '../components/LegislationGridList';
import styles from '../assets/styles';
import {db} from '../components/Database';

const LandingScreen = props => {
  const [legislationIndex, setLegislationIndex] = useState();

  //pull db data after mount
  useEffect(() => {
    getDbData();
  }, []);

  // function to get data from NemoDB
  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql('Select * from LegislationIndex', [], (_tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setLegislationIndex(temp);
      });
    });
  };

  //Function for setting up the Render list for the FlatList; Generic depending on what data is showing
  const renderList = ({item}) => {
    return (
      <LegislationGridList
        id={item.legislationId}
        title={item.legislationTitle}
        destination={item.destination}
        dataSource={item.legislationType}
      />
    );
  };

  /*OUTPUT*/
  return (
    <View>
      <View style={[styles.background, styles.container]}>
        <View>
          <FlatList
            data={legislationIndex}
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
