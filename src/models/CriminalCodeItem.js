/*Framework for generalizing legislation titles and props for passing*/

class CriminalCodeItem {
  constructor(
    index,
    section,
    sectionHeader,
    sectionText,
    subsection,
    subsectionHeader,
    subsectionText,
    paragraph,
    paragraphText,
    subparagraph,
    subparagraphText,
  ) {
    this.index = index;
    this.section = section;
    this.sectionHeader = sectionHeader;
    this.sectionText = sectionText;
    this.subsection = subsection;
    this.subsectionHeader = subsectionHeader;
    this.subsectionText = subsectionText;
    this.paragraph = paragraph;
    this.paragraphText = paragraphText;
    this.subparagraph = subparagraph;
    this.subparagraphText = subparagraphText;
  }
}

export default CriminalCodeItem;

/*Example of CC Record

      "index": 10,
      "section": "2.3",
      "sectionHeader": "Concurrent jurisdiction",
      "sectionText": null,
      "subsection": "(1)",
      "subsectionHeader": null,
      "subsectionText": "The proceedings for the purposes of paragraph (a) of the definition ",
      "paragraph": "(b)",
      "paragraphText": "proceedings in relation to an offence against a member of United Nations personnel or associated personnel under section 235, 236, 266 to 269, 269.1, 271 to 273, 279 or 279.1;",
      "subparagraph": null,
      "subparagraphText": null

*/
