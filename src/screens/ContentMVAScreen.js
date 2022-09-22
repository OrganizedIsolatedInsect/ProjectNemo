/*
Arrival can be from either BrowseMVAScreen or BookMarkScreen.  Items passed into ContentMVA to be returned to screen.
*/

import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = props => {
  const provision = props.route.params.provision.provisionItem;
  const lastScreen = props.route.params.provision.lastScreen;

  return <ContentMVA provisionId={provision} lastScreen={lastScreen} />;
};

export default ContentMVAScreen;
