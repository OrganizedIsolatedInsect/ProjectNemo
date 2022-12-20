function createSubSectionArray(dbData) {
  let subsectionArray = [];
  for (var i = 0, l = dbData.length; i < l; i++) {
    const field1 = dbData[i].field1; // index
    const sectionLabel = dbData[i].sectionLabel; // section
    const subsectionLabel = dbData[i].subsectionLabel; // subsection
    const marginalNoteKey = dbData[i].marginalNoteKey; // subsection
    const marginalNote = dbData[i].marginalNote; // sebsectionHeader
    const subsectionText = dbData[i].subsectionText; // subsectionText
    const sectionKey = dbData[i].sectionKey;
    const subsectionKey = dbData[i].subsectionKey;
    const sectionText = dbData[i].sectionText;
    const paragraphKey = dbData[i].paragraphKey;
    const subparagraphKey = dbData[i].subparagraphKey;
    const subclauseKey = dbData[i].subclauseKey;
    const heading2Key = dbData[i].heading2Key;  //used to pass into the bookmark
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
      marginalNoteKey,
      marginalNote,
      subsectionText,
      sectionText,
      sectionKey,
      subsectionKey,
      flagShowLabel,
      paragraphKey,
      subparagraphKey,
      subclauseKey,
      heading2Key,
    ) => {
      subsectionArray.push({
        field1: field1,
        sectionLabel: sectionLabel,
        subsectionLabel: subsectionLabel,
        marginalNoteKey: marginalNoteKey,
        marginalNote: marginalNote,
        subsectionText: subsectionText,
        sectionText: sectionText,
        sectionKey: sectionKey,
        subsectionKey: subsectionKey,
        flagShowLabel: flagShowLabel,
        paragraphKey: paragraphKey,
        subparagraphKey: subparagraphKey,
        subclauseKey: subclauseKey,
        heading2Key: heading2Key,
      });
    };
    /* eslint-enable */
    if (i === 0) {
      pushArray(
        field1,
        sectionLabel,
        subsectionLabel,
        marginalNoteKey,
        marginalNote,
        subsectionText,
        sectionText,
        sectionKey,
        subsectionKey,
        flagShowLabel,
        paragraphKey,
        subparagraphKey,
        subclauseKey,
        heading2Key,
      );
    } else {
      const prevSubsection = dbData[i - 1].subsectionLabel;
      if (subsectionLabel !== prevSubsection) {
        pushArray(
          field1,
          sectionLabel,
          subsectionLabel,
          marginalNoteKey,
          marginalNote,
          subsectionText,
          sectionText,
          sectionKey,
          subsectionKey,
          flagShowLabel,
          paragraphKey,
          subparagraphKey,
          subclauseKey,
          heading2Key,
        );
      }
    }
  }
  return subsectionArray;
}

export {createSubSectionArray};
