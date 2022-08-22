//Data for Listing Legislation on the Landing Screen -

import LegislationItem from '../models/LegislationItem';

export const LEGISLATION = [
  new LegislationItem('l1', 'Criminal Code of Canada', 'BrowseCCScreen', 'CC'),
  new LegislationItem(
    'l2',
    'Motor Vehicle Acts + Regulations',
    'BrowseMVAScreen',
    'MVA',
  ),
];
