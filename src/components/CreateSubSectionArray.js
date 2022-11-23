function createSubSectionArray(dbData) {
  let subsectionArray = [];
  for (var i = 0, l = dbData.length; i < l; i++) {
    const field1 = dbData[i].field1; // index
    const sectionLabel = dbData[i].sectionlabel; // section
    const subsectionLabel = dbData[i].subsectionlabel; // subsection
    const marginalNote = dbData[i].marginalnote; // sebsectionHeader
    const subsectionText = dbData[i].subsectiontext; // subsectionText
    const sectionKey = dbData[i].sectionkey;
    const subsectionKey = dbData[i].subsectionkey;
    const sectionText = dbData[i].sectiontext;
    let prevSectionLabel = '';

    if (i > 0) {
      prevSectionLabel = dbData[i - 1].sectionlabel;
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
      sectionText,
      sectionKey,
      subsectionKey,
      flagShowLabel,
    ) => {
      subsectionArray.push({
        field1: field1,
        sectionLabel: sectionLabel,
        subsectionLabel: subsectionLabel,
        marginalNote: marginalNote,
        subsectionText: subsectionText,
        sectionText: sectionText,
        sectionKey: sectionKey,
        subsectionKey: subsectionKey,
        flagShowLabel: flagShowLabel,
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
        sectionText,
        sectionKey,
        subsectionKey,
        flagShowLabel,
      );
    } else {
      const prevSubsection = dbData[i - 1].subsectionlabel;
      if (subsectionLabel !== prevSubsection) {
        pushArray(
          field1,
          sectionLabel,
          subsectionLabel,
          marginalNote,
          subsectionText,
          sectionText,
          sectionKey,
          subsectionKey,
          flagShowLabel,
        );
      }
    }
  }
  return subsectionArray;
}

export {createSubSectionArray};
