function createSubSectionArray(dbData) {
  let subsectionArray = [];
  for (var i = 0, l = dbData.length; i < l; i++) {
    const field1 = dbData[i].field1; // index
    const sectionLabel = dbData[i].sectionLabel; // section
    const subsectionLabel = dbData[i].subsectionLabel; // subsection
    const marginalNote = dbData[i].marginalNote; // sebsectionHeader
    const subsectionText = dbData[i].subsectionText; // subsectionText
    const heading2Key = dbData[i].heading2Key;
    const sectionKey = dbData[i].sectionKey;
    const subsectionKey = dbData[i].subsectionKey;
    const sectionText = dbData[i].sectionText;
    const paragraphKey = dbData[i].paragraphKey;
    const subparagraphKey = dbData[i].subparagraphKey;
    const subclauseKey = dbData[i].subclauseKey;
    let prevSectionLabel = '';

    if (i > 0) {
      prevSectionLabel = dbData[i - 1].sectionLabel;
    }
    //create flag to see if this is the first label of a new section
    const flagShowLabel = sectionLabel === prevSectionLabel;

    //function to push subsections into subsectionArray
    /* eslint-disable */
    const pushArray = (
      field1,
      sectionLabel,
      subsectionLabel,
      marginalNote,
      subsectionText,
      heading2Key,
      sectionText,
      sectionKey,
      subsectionKey,
      flagShowLabel,
      paragraphKey,
      subparagraphKey,
      subclauseKey,
    ) => {
      subsectionArray.push({
        field1: field1,
        sectionLabel: sectionLabel,
        subsectionLabel: subsectionLabel,
        marginalNote: marginalNote,
        subsectionText: subsectionText,
        heading2Key: heading2Key,
        sectionText: sectionText,
        sectionKey: sectionKey,
        subsectionKey: subsectionKey,
        flagShowLabel: flagShowLabel,
        paragraphKey: paragraphKey,
        subparagraphKey: subparagraphKey,
        subclauseKey: subclauseKey,
      });
    };
    /* eslint-enable */
    if (i === 0) {
      pushArray(
        field1,
        sectionLabel,
        subsectionLabel,
        marginalNote,
        subsectionText,
        heading2Key,
        sectionText,
        sectionKey,
        subsectionKey,
        flagShowLabel,
        paragraphKey,
        subparagraphKey,
        subclauseKey,
      );
    } else {
      const prevSubsection = dbData[i - 1].subsectionLabel;
      if (subsectionLabel !== prevSubsection) {
        pushArray(
          field1,
          sectionLabel,
          subsectionLabel,
          marginalNote,
          subsectionText,
          heading2Key,
          sectionText,
          sectionKey,
          subsectionKey,
          flagShowLabel,
          paragraphKey,
          subparagraphKey,
          subclauseKey,
        );
      }
    }
  }
  return subsectionArray;
}

export {createSubSectionArray};
