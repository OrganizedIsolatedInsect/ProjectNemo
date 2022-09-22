/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {db} from '../components/Database';
import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {useIsFocused} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, {colors} from '../assets/styles';

const ContentMVA = ({provisionId}) => {
  const provisionID = provisionId;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [marked, setMarked] = useState(false); //to change marked status of content
  const [dbData, setDbData] = useState([]); //local data array
  const [loading, setLoading] = useState(false); //for loading cursor purposes
  //state management of object returned from database lookup
  const [provision, setProvision] = useState('');
  const [contravention, setContravention] = useState('');
  const [fine, setFine] = useState('');
  const [reducedFine, setReducedFine] = useState('');
  const [source, setSource] = useState('');
  const [sectionText, setSectionText] = useState('');
  const [sectionSubsection, setSectionSubsection] = useState('');
  const [sectionParagraph, setSectionParagraph] = useState('');
  const [sectionSubparagraph, setSectionSubparagraph] = useState('');

  //pull state to see if current section exists in bookmarks
  const bookmarkStateId = useSelector(state => state.bookmarks.sections);

  //used to switch the bookmark icon from outline to fill and vice versa
  const switchMarks = () => {
    setMarked(!marked);
  };

  useEffect(() => {
    setLoading(true);
    getDbData(provisionID);
    setLoading(false);
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (bookmarkStateId.some(e => e.section == provisionID)) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [marked, loading, provisionID]);

  //lookup provisionID on the data table to find the proper row
  // function to get data from NemoDB
  //Issues:  setting setDBData does not appear to work properly in this component so variables set up via temp output
  const getDbData = provID => {
    const temp = [];
    console.log('[getDbData] provID: ' + JSON.stringify(provID));
    db.transaction(tx => {
      tx.executeSql(
        'Select * from MVA where provision = ?',
        [provID],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }

          if (temp.length > 0) {
            setProvision(temp[0].provision);
            setContravention(temp[0].contravention);
            setFine(temp[0].fine);
            setReducedFine(temp[0].reducedFine);
            setSource(temp[0].source);
            setSectionText(temp[0].sectionText);
            setSectionSubsection(temp[0].sectionSubsection);
            setSectionParagraph(temp[0].sectionParagraph);
            setSectionSubparagraph(temp[0].sectionSubparagraph);
          }
        },
      );
    });
  };

  //dispatch add or remove bookmarks based bookmark icon
  //Requires Lawtype to differentiate the source of the bookmark
  const dispatchAction = () => {
    // dispatch based on opposite of flag because marked does not change until the rerender
    if (marked === false) {
      dispatch(
        addBookmark({
          lawtype: 'MVA',
          section: provision,
          sectionHeader: contravention,
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          lawtype: 'MVA',
          section: provision,
        }),
      );
    }
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.MVAContentHeadingContainer}>
        <View style={styles.MVAContentHeadingContainerLeft}>
          <Text
            style={{
              ...styles.heading_1,
              fontWeight: 'bold',
              color: colors.primaryText,
            }}>
            {contravention}
          </Text>
        </View>
        <View style={styles.MVAContentHeadingContainerRight}>
          {/* Bookmark Icon and actions */}
          <Icon
            name={marked ? 'bookmark' : 'bookmark-outline'}
            size={30}
            onPress={() => {
              switchMarks();
              dispatchAction();
            }}
            style={{color: colors.primary}}
          />
        </View>
      </View>
      <View style={styles.MVAContentSection}>
        <Text style={{...styles.accent_1, color: colors.primaryText}}>
          {source}, Section {provision}
        </Text>
        <Text
          style={{...styles.MVAContentSectionText, color: colors.primaryText}}>
          {sectionText}
          {'\n'}
        </Text>
        <View style={styles.MVAContentSubsection}>
          <Text
            style={{
              ...styles.MVAContentSectionText,
              color: colors.primaryText,
            }}>
            {sectionSubsection}
            {sectionParagraph}
            {sectionSubparagraph}
            {'\n'}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{...styles.MVAContentTicket, color: colors.primaryText}}>
          Ticketed Amount: {fine} {'\n'}
          Reduced ticket amount ({'<'}30 days): {reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContentMVA;
