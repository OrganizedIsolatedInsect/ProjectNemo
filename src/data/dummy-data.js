//*************TEST DATA for FLATLIST
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
//*************END TEST DATA

const MVAData = [
  {
    index: 0,
    provision: 'section 13 (1) (a)',
    contravention: 'No vehicle licence',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph:
      'without the licence required by this Act for the operation of that motor vehicle or trailer having been first obtained and being then in force,',
    sectionSubparagraph: null,
  },
  {
    index: 1,
    provision: 'section 13 (1) (b)',
    contravention: 'No number plate',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph:
      'without the licence required by this Act for the operation of that motor vehicle or trailer having been first obtained and being then in force,',
    sectionSubparagraph: null,
  },
  {
    index: 2,
    provision: 'section 13 (1) (c)',
    contravention: 'Wrong number plate',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph:
      'without the licence required by this Act for the operation of that motor vehicle or trailer having been first obtained and being then in force,',
    sectionSubparagraph: null,
  },
  {
    index: 3,
    provision: 'section 24 (1)',
    contravention: "No driver's licence",
    fine: '$240',
    reducedFine: '$215',
    victimLevySurcharge: '$36',
    ticketedAmount: '$276',
    reducedTicketedAmount: '$261',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 4,
    provision: 'section 24 (3) (b)',
    contravention: 'No insurance',
    fine: '$520',
    reducedFine: '$495',
    victimLevySurcharge: '$78',
    ticketedAmount: '$598',
    reducedTicketedAmount: '$573',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph:
      'without the licence required by this Act for the operation of that motor vehicle or trailer having been first obtained and being then in force,',
    sectionSubparagraph: null,
  },
  {
    index: 5,
    provision: 'section 25 (15)',
    contravention: "Drive contrary to driver's licence restriction",
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 6,
    provision: 'section 31 (1)',
    contravention: 'Fail to change address',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 7,
    provision: 'section 33 (1)',
    contravention: "Fail to produce driver's licence",
    fine: '$70',
    reducedFine: '$45',
    victimLevySurcharge: '$11',
    ticketedAmount: '$81',
    reducedTicketedAmount: '$56',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 8,
    provision: 'section 33 (1)',
    contravention: 'Fail to produce insurance',
    fine: '$70',
    reducedFine: '$45',
    victimLevySurcharge: '$11',
    ticketedAmount: '$81',
    reducedTicketedAmount: '$56',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 9,
    provision: 'section 68 (1)',
    contravention: 'Fail to remain at scene of accident',
    fine: '$320',
    reducedFine: '$295',
    victimLevySurcharge: '$48',
    ticketedAmount: '$368',
    reducedTicketedAmount: '$343',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 10,
    provision: 'section 68 (2)',
    contravention: 'Fail to stop after collision with unattended vehicle',
    fine: '$170',
    reducedFine: '$145',
    victimLevySurcharge: '$26',
    ticketedAmount: '$196',
    reducedTicketedAmount: '$171',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 11,
    provision: 'section 68 (3)',
    contravention:
      'Fail to stop when in accident resulting in damage to property',
    fine: '$170',
    reducedFine: '$145',
    victimLevySurcharge: '$26',
    ticketedAmount: '$196',
    reducedTicketedAmount: '$171',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 12,
    provision: 'section 71',
    contravention: 'Fail to produce vehicle licence',
    fine: '$70',
    reducedFine: '$45',
    victimLevySurcharge: '$11',
    ticketedAmount: '$81',
    reducedTicketedAmount: '$56',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection: null,
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 13,
    provision: 'section 73 (1)',
    contravention: 'Fail to stop for police',
    fine: '$125',
    reducedFine: '$100',
    victimLevySurcharge: '$19',
    ticketedAmount: '$144',
    reducedTicketedAmount: '$119',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 14,
    provision: 'section 73 (2)',
    contravention: 'Fail to state name and address',
    fine: '$125',
    reducedFine: '$100',
    victimLevySurcharge: '$19',
    ticketedAmount: '$144',
    reducedTicketedAmount: '$119',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection:
      'A person commits an offence if the person drives, operates, parks or is in charge of a motor vehicle or trailer on a highway',
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 37,
    provision: 'section 85',
    contravention: 'Allow unlicensed minor to drive',
    fine: '$120',
    reducedFine: '$95',
    victimLevySurcharge: '$18',
    ticketedAmount: '$138',
    reducedTicketedAmount: '$113',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection: null,
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 38,
    provision: 'section 121',
    contravention: 'Unsafe driving of maintenance or construction vehicle',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection: null,
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
  {
    index: 39,
    provision: 'section 123',
    contravention: 'Fail to obey police direction',
    fine: '$95',
    reducedFine: '$70',
    victimLevySurcharge: '$14',
    ticketedAmount: '$109',
    reducedTicketedAmount: '$84',
    source: 'Motor Vehicle Act',
    sectionText:
      'If a highway has been divided into 2 roadways by a physical barrier or clearly indicated dividing section constructed so that it impedes vehicular traffic, a driver must not',
    sectionSubsection: null,
    sectionParagraph: null,
    sectionSubparagraph: null,
  },
];

const CCDATA = [
  {
    index: 0,
    section: '1',
    sectionHeader: 'Short title',
    sectionText: 'This Act may be cited as the Criminal Code.',
    subsection: null,
    subsectionHeader: null,
    subsectionText: null,
    paragraph: null,
    paragraphText: null,
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 1,
    section: '2',
    sectionHeader: 'Definitions',
    sectionText: 'In this Act,',
    subsection: null,
    subsectionHeader: null,
    subsectionText: null,
    paragraph: null,
    paragraphText: null,
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 2,
    section: '2.1',
    sectionHeader: 'Further definitions — firearms',
    sectionText: 'In this Act, ',
    subsection: null,
    subsectionHeader: null,
    subsectionText: null,
    paragraph: null,
    paragraphText: null,
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 3,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'For the purposes of sections 606, 672.5, 715.37, 722, 737.1 and 745.63, any of the following individuals may act on the victim’s behalf if the victim is dead or incapable of acting on their own behalf:',
    paragraph: '(a)',
    paragraphText:
      'the victim’s spouse, or if the victim is dead, their spouse at the time of death;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 4,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'For the purposes of sections 606, 672.5, 715.37, 722, 737.1 and 745.63, any of the following individuals may act on the victim’s behalf if the victim is dead or incapable of acting on their own behalf:',
    paragraph: '(b)',
    paragraphText:
      'the victim’s common-law partner, or if the victim is dead, their common-law partner at the time of death;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 5,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'For the purposes of sections 606, 672.5, 715.37, 722, 737.1 and 745.63, any of the following individuals may act on the victim’s behalf if the victim is dead or incapable of acting on their own behalf:',
    paragraph: '(c)',
    paragraphText: 'a relative or dependant of the victim;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 6,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'For the purposes of sections 606, 672.5, 715.37, 722, 737.1 and 745.63, any of the following individuals may act on the victim’s behalf if the victim is dead or incapable of acting on their own behalf:',
    paragraph: '(d)',
    paragraphText:
      'an individual who has in law or fact custody, or is responsible for the care or support, of the victim; and',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 7,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'For the purposes of sections 606, 672.5, 715.37, 722, 737.1 and 745.63, any of the following individuals may act on the victim’s behalf if the victim is dead or incapable of acting on their own behalf:',
    paragraph: '(e)',
    paragraphText:
      'an individual who has in law or fact custody, or is responsible for the care or support, of a dependant of the victim.',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 8,
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'Exception',
    subsectionText:
      'An individual is not entitled to act on a victim’s behalf if the individual is an accused in relation to the offence or alleged offence that resulted in the victim suffering harm or loss or is an individual who is found guilty of that offence or who is found not criminally responsible on account of mental disorder or unfit to stand trial in respect of that offence.',
    paragraph: null,
    paragraphText: null,
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 9,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(a)',
    paragraphText:
      'proceedings in relation to an offence under subsection 7(2.01), (2.3) or (2.31) or section 57, 58, 83.12, 103, 104, 121.1, 380, 382, 382.1, 391, 400, 424.1, 431.1, 467.11 or 467.111 or in relation to any terrorism offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 10,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(b)',
    paragraphText:
      'proceedings in relation to an offence against a member of United Nations personnel or associated personnel under section 235, 236, 266 to 269, 269.1, 271 to 273, 279 or 279.1;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 11,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(c)',
    paragraphText:
      'proceedings in relation to an offence referred to in subsection 7(3.71) or in relation to an offence referred to in paragraph (a) of the definition ',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 12,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(d)',
    paragraphText:
      'proceedings in relation to an offence if the act or omission constituting the offence is a terrorist activity referred to in paragraph (b) of the definition ',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 13,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(e)',
    paragraphText:
      'a proceeding in relation to an offence under section 811 that arises out of a breach of a recognizance made under section 810.01 or 810.011, if he or she has given consent to the information referred to in those sections; and',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 14,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(f)',
    paragraphText:
      'proceedings under section 83.13, 83.14, 83.222, 83.223 or 83.3.',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 15,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(a)',
    paragraphText:
      'a proceeding for conspiring or attempting to commit such an offence or for being an accessory after the fact or counselling a person to be a party to such an offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 16,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(b)',
    paragraphText:
      'a proceeding in relation to a criminal organization offence that arises out of conduct that relates, in whole or in part, to any offence for which he or she has the power to commence and to conduct a proceeding;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 17,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(c)',
    paragraphText:
      'a proceeding in relation to an offence referred to in section 354, 355.2, 355.4 or 462.31 that arises out of conduct that relates, in whole or in part, to any offence for which he or she has the power to commence and to conduct a proceeding or out of any act or omission that, if it had occurred in Canada, would have constituted such an offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 18,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(d)',
    paragraphText:
      'a proceeding for the breach of any court order made in the course of a proceeding commenced or conducted by him or her;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 19,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(e)',
    paragraphText:
      'a proceeding for the failure to comply with any condition associated with the release of a person by a peace officer or other competent authority — including a condition to appear at a specified time and place — in relation to any offence for which he or she has the power to commence and to conduct a proceeding; and',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 20,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(1)',
    subsectionHeader: null,
    subsectionText:
      'The proceedings for the purposes of paragraph (a) of the definition ',
    paragraph: '(f)',
    paragraphText:
      'any ancillary proceedings in relation to any offence for which he or she has the power to commence and to conduct a proceeding.',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 21,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(a)',
    paragraphText:
      'proceedings in relation to an offence under subsection 7(2.01), (2.3) or (2.31) or section 57, 58, 83.12, 103, 104, 121.1, 380, 382, 382.1, 391, 400, 424.1, 431.1, 467.11 or 467.111 or in relation to any terrorism offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 22,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(b)',
    paragraphText:
      'proceedings in relation to an offence against a member of United Nations personnel or associated personnel under section 235, 236, 266 to 269, 269.1, 271 to 273, 279 or 279.1;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 23,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(c)',
    paragraphText:
      'proceedings in relation to an offence referred to in subsection 7(3.71) or in relation to an offence referred to in paragraph (a) of the definition ',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 24,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(d)',
    paragraphText:
      'proceedings in relation to an offence if the act or omission constituting the offence is a terrorist activity referred to in paragraph (b) of the definition ',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 25,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(e)',
    paragraphText:
      'a proceeding in relation to an offence under section 811 that arises out of a breach of a recognizance made under section 810.01 or 810.011, if he or she has given consent to the information referred to in those sections; and',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 26,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(f)',
    paragraphText:
      'proceedings under section 83.13, 83.14, 83.222, 83.223 or 83.3.',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 27,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(a)',
    paragraphText:
      'a proceeding for conspiring or attempting to commit such an offence or for being an accessory after the fact or counselling a person to be a party to such an offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 28,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(b)',
    paragraphText:
      'a proceeding in relation to a criminal organization offence that arises out of conduct that relates, in whole or in part, to any offence for which he or she has the power to commence and to conduct a proceeding;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 29,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(c)',
    paragraphText:
      'a proceeding in relation to an offence referred to in section 354, 355.2, 355.4 or 462.31 that arises out of conduct that relates, in whole or in part, to any offence for which he or she has the power to commence and to conduct a proceeding or out of any act or omission that, if it had occurred in Canada, would have constituted such an offence;',
    subparagraph: null,
    subparagraphText: null,
  },
  {
    index: 30,
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
    sectionText: null,
    subsection: '(2)',
    subsectionHeader: 'For greater certainty — Attorney General of Canada',
    subsectionText:
      'For greater certainty, the Attorney General of Canada or his or her lawful deputy may, in respect of an offence referred to in subsection (1) or an offence under any Act of Parliament — other than this Act or the Canada Elections Act — or any regulation made under such an Act, exercise all the powers and perform all the duties and functions assigned to the Attorney General by or under this Act, and those powers include the power to commence and to conduct',
    paragraph: '(d)',
    paragraphText:
      'a proceeding for the breach of any court order made in the course of a proceeding commenced or conducted by him or her;',
    subparagraph: null,
    subparagraphText: null,
  },
];

const CCDATAPARTS = [
  {
    index: 0,
    part: 'Part I',
    section: '1',
    sectionHeader: 'Short title',
  },
  {
    index: 1,
    part: 'Part I',
    section: '2',
    sectionHeader: 'Definitions',
  },
  {
    index: 2,
    part: 'Part I',
    section: '2.1',
    sectionHeader: 'Further definitions — firearms',
  },
  {
    index: 3,
    part: 'Part I',
    section: '2.2',
    sectionHeader: 'Acting on victim’s behalf',
  },
  {
    index: 4,
    part: 'Part I',
    section: '2.3',
    sectionHeader: 'Concurrent jurisdiction',
  },
  {
    index: 5,
    part: 'Part I',
    section: '3',
    sectionHeader: 'Descriptive cross-references',
  },
  {
    index: 6,
    part: 'Part I',
    section: '3.1',
    sectionHeader: 'Effect of judicial acts',
  },
  {
    index: 7,
    part: 'Part I',
    section: '4',
    sectionHeader: 'Postcard a chattel, value',
  },
  {
    index: 8,
    part: 'Part I',
    section: '5',
    sectionHeader: 'Canadian Forces not affected',
  },
  {
    index: 9,
    part: 'Part I',
    section: '6',
    sectionHeader: 'Presumption of innocence',
  },
  {
    index: 10,
    part: 'Part I',
    section: '7',
    sectionHeader: 'Offences committed on aircraft',
  },
  {
    index: 11,
    part: 'Part I',
    section: '8',
    sectionHeader: 'Application to territories',
  },
  {
    index: 12,
    part: 'Part I',
    section: '9',
    sectionHeader: 'Criminal offences to be under law of Canada',
  },
  {
    index: 13,
    part: 'Part I',
    section: '10',
    sectionHeader: 'Appeal',
  },
  {
    index: 14,
    part: 'Part I',
    section: '11',
    sectionHeader: 'Civil remedy not suspended',
  },
  {
    index: 15,
    part: 'Part I',
    section: '12',
    sectionHeader: 'Offence punishable under more than one Act',
  },
  {
    index: 16,
    part: 'Part I',
    section: '13',
    sectionHeader: 'Child under twelve',
  },
  {
    index: 17,
    part: 'Part I',
    section: '14',
    sectionHeader: 'Consent to death',
  },
  {
    index: 18,
    part: 'Part I',
    section: '15',
    sectionHeader: 'Obedience to ',
  },
  {
    index: 19,
    part: 'Part I',
    section: '16',
    sectionHeader: 'Defence of mental disorder',
  },
  {
    index: 20,
    part: 'Part I',
    section: '17',
    sectionHeader: 'Compulsion by threats',
  },
  {
    index: 21,
    part: 'Part I',
    section: '18',
    sectionHeader: 'Compulsion of spouse',
  },
];

const CCDATASECTION = [
  {
    part: 'Part I',
    data: [
      {index: 0, section: '1', sectionHeader: 'Short title'},
      {index: 1, section: '2', sectionHeader: 'Definitions'},
      {
        index: 2,
        section: '2.1',
        sectionHeader: 'Further definitions — firearms',
      },
      {index: 3, section: '2.2', sectionHeader: 'Acting on victim’s behalf'},
      {
        index: 4,
        section: '2.3',
        sectionHeader: 'Concurrent jurisdiction',
      },
      {
        index: 5,
        section: '3',
        sectionHeader: 'Descriptive cross-references',
      },
      {
        index: 6,
        section: '3.1',
        sectionHeader: 'Effect of judicial acts',
      },
      {
        index: 7,
        section: '4',
        sectionHeader: 'Postcard a chattel, value',
      },
      {
        index: 8,
        section: '5',
        sectionHeader: 'Canadian Forces not affected',
      },
      {
        index: 9,
        section: '6',
        sectionHeader: 'Presumption of innocence',
      },
      {
        index: 10,
        section: '7',
        sectionHeader: 'Offences committed on aircraft',
      },
      {
        index: 11,
        section: '8',
        sectionHeader: 'Application to territories',
      },
      {
        index: 12,
        section: '9',
        sectionHeader: 'Criminal offences to be under law of Canada',
      },
      {
        index: 13,
        section: '10',
        sectionHeader: 'Appeal',
      },
      {
        index: 14,
        section: '11',
        sectionHeader: 'Civil remedy not suspended',
      },
      {
        index: 15,
        section: '12',
        sectionHeader: 'Offence punishable under more than one Act',
      },
      {index: 16, section: '13', sectionHeader: 'Child under twelve'},
      {index: 17, section: '14', sectionHeader: 'Consent to death'},
      {index: 18, section: '15', sectionHeader: 'Obedience to '},
      {index: 19, section: '16', sectionHeader: 'Defence of mental disorder'},
      {index: 20, section: '17', sectionHeader: 'Compulsion by threats'},
      {index: 21, section: '18', sectionHeader: 'Compulsion of spouse'},
    ],
  },
];

export {DATA, MVAData, CCDATA, CCDATAPARTS, CCDATASECTION};
