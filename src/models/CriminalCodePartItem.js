/*Framework for generalizing legislation titles and props for passing*/

class CriminalCodePartItem {
    constructor(index, part, section, sectionHeader) {
      this.index = index;
      this.part = part;
      this.section = section;
      this.sectionHeader = sectionHeader;
    }
  };
  
  export default CriminalCodePartItem;
  