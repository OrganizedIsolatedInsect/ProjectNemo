import React from 'react';
import {Text} from 'react-native';

import styles, {colors} from '../assets/styles';

export const PrintTitle = props => {
  let textReturn = 'Criminal Code of Canada';
  let pagePartTitle = props.pagePartTitle;
  let pagePartLabel = props.pagePartLabel;
  let pagePartHeadingTitle = props.pagePartHeadingTitle;

  console.log(pagePartTitle, pagePartLabel, pagePartHeadingTitle);

  return (
    <Text
      style={[styles.title, styles.titleMargin, {color: colors.primaryText}]}>
      {textReturn}
      {pagePartLabel == null ? (<Text style={styles.title}>{'\n'}{pagePartTitle}</Text>) : null}
      {pagePartTitle != null && pagePartLabel != null ? (<Text style={styles.title}>{'\n'} {pagePartTitle} - {pagePartLabel}</Text>) : null}
      {pagePartHeadingTitle != null ? (<Text style={styles.body}>{'\n'}{pagePartHeadingTitle}</Text>) : null}
    </Text>
  );
};
