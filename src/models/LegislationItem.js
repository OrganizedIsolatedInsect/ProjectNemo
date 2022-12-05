/*Framework for generalizing legislation titles and props for passing*/

class LegislationItem {
  constructor(id, title, type) {
    this.legislationId = id;
    this.legislationTitle = title;
    this.screenDestination = this.getScreenName(type);
    this.legislationType = type;
  }
  //set the screen which it will navigate too
  getScreenName(legislationType) {
    if (legislationType === 'CrimCode') {
      return (this.screenDestination = 'PartsCCScreen');
    }
    if (legislationType === 'MVA') {
      return (this.screenDestination = 'BrowseMVAScreen');
    }
  }
}

export default LegislationItem;
