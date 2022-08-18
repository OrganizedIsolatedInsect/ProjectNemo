/*Framework for generalizing legislation titles and props for passing*/

class MVAItem {
  constructor(
    index,
    provision,
    contravention,
    fine,
    reducedFine,
    victimLevySurcharge,
    ticketedAmount,
    reducedTicketedAmount,
    source,
    sectionText,
    sectionSubsection,
    sectionParagraph,
    sectionSubparagraph,
  ) {
    this.index = index;
    this.provision = provision;
    this.contravention = contravention;
    this.fine = fine;
    this.reducedFine = reducedFine;
    this.victimLevySurcharge = victimLevySurcharge;
    this.ticketedAmount = ticketedAmount;
    this.reducedTicketedAmount = reducedTicketedAmount;
    this.source = source;
    this.sectionText = sectionText;
    this.sectionSubsection = sectionSubsection;
    this.sectionParagraph = sectionParagraph;
    this.sectionSubparagraph = sectionSubparagraph;
  }
}

export default MVAItem;

/*Example of an MVA Data record

		"index": 37,
		"provision": "section 85",
		"contravention": "Allow unlicensed minor to drive",
		"fine": "$120",
		"reducedFine": "$95",
		"victimLevySurcharge": "$18",
		"ticketedAmount": "$138",
		"reducedTicketedAmount": "$113",
		"source": "Motor Vehicle Act",
		"sectionText": "If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not",
		"sectionSubsection": null,
		"sectionParagraph": null,
		"sectionSubparagraph": null

*/
