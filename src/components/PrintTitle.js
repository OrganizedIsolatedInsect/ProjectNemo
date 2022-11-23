import React from 'react';
import {Text} from 'react-native';

import styles, {colors} from '../assets/styles';

export const PrintTitle = props => {
  let pageTitle = props.pageTitle;
  let pagePartTitle = props.pagePartTitle;
  let pagePartLabel = props.pagePartLabel;
  let pagePartHeadingTitle = props.pagePartHeadingTitle;

  return (
    <Text style={[styles.title, styles.container, {color: colors.primaryText}]}>
      {pageTitle}
      {pagePartLabel == null ? (<Text style={styles.title}>{'\n'}{pagePartTitle}</Text>) : null}
      {pagePartLabel != null ? (<Text style={styles.title}>{'\n'}{pagePartTitle} - {pagePartLabel}</Text>) : null}
      {pagePartHeadingTitle != null ? (<Text style={styles.body}>{'\n'}{pagePartHeadingTitle}</Text>) : null}
    </Text>
  );
};
