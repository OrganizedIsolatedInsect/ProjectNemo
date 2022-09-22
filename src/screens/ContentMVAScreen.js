/*
Arrival can be from either BrowseMVAScreen or BookMarkScreen.  Items passed into ContentMVA to be returned to screen.
*/

import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = props => {
  const provision = props.route.params.provisionId;

  return <ContentMVA provisionId={provision} />;
};

export default ContentMVAScreen;
