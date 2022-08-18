/*Framework for generalizing legislation titles and props for passing*/

class LegislationItem {
  constructor(id, title, destination, dataSource) {
    this.id = id;
    this.title = title;
    this.destination = destination;
    this.dataSource = dataSource;
  }
}

export default LegislationItem;
