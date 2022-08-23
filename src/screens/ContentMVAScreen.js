/*

*/
import React from 'react';
import ContentMVA from '../components/ContentMVA';

const ContentMVAScreen = ({route}) => {
  const item = route.params.paramkey;

  return <ContentMVA item={item} />;
}


export default ContentMVAScreen;

