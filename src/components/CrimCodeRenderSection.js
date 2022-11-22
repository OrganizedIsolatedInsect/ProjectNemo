import React from 'react';
import styles, {colors} from '../assets/styles';
import {Text, View, FlatList} from 'react-native';

const CrimCodeRenderHeader = ({subsectionData}) => {
  return (
    <View>
      <Text>
        {subsectionData.flagShowLabel === false && (
          <Text style={{fontWeight: 'bold', color: 'blue'}}>
            {subsectionData.sectionLabel}
          </Text>
        )}
        {subsectionData.subsectionLabel} {subsectionData.marginalNote}
      </Text>
    </View>
  );
};

const CrimCodeRenderBody = ({subsectionData, dbData}) => {
  //filter data that contains paragraphs based on subsectionKey
  let paraData = dbData.filter(
    (paragraph, i) => dbData[i].subsectionkey == subsectionData.subsectionKey,
  );

  //array created to contain paragraphs
  const paraFilter = [];

  for (var i = 0, l = paraData.length; i < l; i++) {
    if (i === 0) {
      paraFilter.push(paraData[i]);
    }
    //compares paragraphText to previous index's paragraphText
    if (i > 0) {
      const prevPara = paraData[i - 1].paragraphText;

      if (paraData[i].paragraphText !== prevPara) {
        paraFilter.push(paraData[i]);
      }
    }
  }

  const renderParagraph = ({item, index}) => {
    let subParaData = dbData.filter(
      (subParagraph, i) =>
        dbData[i].paragraphLabel === item.paragraphLabel &&
        dbData[i].paragraphText === item.paragraphText &&
        dbData[i].subparagraphText !== null,
    );

    return (
      <View style={styles.paragraph}>
        <Text>
          {item.paragraphLabel} {item.paragraphText}
        </Text>
        <FlatList
          data={subParaData}
          keyExtractor={item => item.field1}
          listKey={(item3, index) => 'C' + index.toString()}
          renderItem={renderSubParagraph}
        />
      </View>
    );
  };

  const renderSubParagraph = ({item, index}) => {
    return (
      <View style={styles.subParagraph}>
        <Text>
          {item.subparagraphLabel} {item.subparagraphText}
        </Text>
      </View>
    );
  };

  //check if sectionText needs to be rendered
  if (subsectionData.sectionText != null) {
    return (
      <View>
        <Text>{subsectionData.sectionText}</Text>
      </View>
    );
  } //check if paragraphs exists
  else if (paraFilter.length > 1) {
    return (
      <View>
        <Text>
          {subsectionData.subsectionText}
          {'\n'}
        </Text>
        <FlatList
          data={paraFilter}
          keyExtractor={item => item.field1}
          listKey={(item2, index) => 'B' + index.toString()}
          renderItem={renderParagraph}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{subsectionData.subsectionText}</Text>
      </View>
    );
  }
};

export {CrimCodeRenderHeader, CrimCodeRenderBody};
