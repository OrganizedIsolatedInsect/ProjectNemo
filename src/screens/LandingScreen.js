//PACKAGE Imports
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {db} from '../components/Database';

//USER IMPORTS
import LegislationGridList from '../components/LegislationGridList';
import LegislationItem from '../models/LegislationItem';
import styles from '../assets/styles';

const LandingScreen = props => {
  const [legislationMenu, setLegislationMenu] = useState([]);

  useEffect(() => {
    getDbData();
  }, []);

  /*   get menu items from database table LegislationIndex, if a new value is added you must
  go to data/models/LegislationItem.js, to update the class to get which screen it will navigate too */
  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql('Select * from LegislationIndex', [], (tx, results) => {
        const tempMenu = [];
        for (let i = 0; i < results.rows.length; ++i) {
          const item = results.rows.item(i);
          tempMenu.push(
            new LegislationItem(
              item.legislationId,
              item.legislationTitle,
              item.legislationType,
            ),
          );
        }
        setLegislationMenu(tempMenu);
      });
    });
  };

  //Function for setting up the Render list for the FlatList; Generic depending on what data is showing
  const renderList = itemdata => {
    return (
      <LegislationGridList
        legislationId={itemdata.item.legislationId}
        legislationTitle={itemdata.item.legislationTitle}
        screenDestination={itemdata.item.screenDestination}
        legislationType={itemdata.item.legislationType}
      />
    );
  };

  /*OUTPUT*/
  return (
    <View>
      <View style={[styles.background, styles.container]}>
        <View>
          <FlatList
            data={legislationMenu}
            renderItem={renderList}
            keyExtractor={item => item.legislationId}
            ItemSeparatorComponent={() => <View style={{margin: 15}} />}
          />
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;
