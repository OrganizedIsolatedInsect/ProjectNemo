# :chart_with_upwards_trend: Data Sources
## MVP
- **Criminal Code**. Parsed from [XML file](https://laws-lois.justice.gc.ca/eng/XML/C-46.xml) on Justice Laws website.
- **Motor Vehicle Act**.

## Future Development
- **Youth Criminal Justice Act**. [XML file](https://www.laws-lois.justice.gc.ca/eng/XML/Y-1.5.xml) of official content on Justice Laws website.
- **Cannabis Act**. [XML file](https://laws-lois.justice.gc.ca/eng/acts/C-24.5/) of official content on Justice Laws website. [CanLII](https://www.canlii.org/en/ca/laws/stat/sc-2018-c-16/latest/sc-2018-c-16.html) has Cannabis Act on their webpage - could check to see if it's available via CanLII's API?
- **Controlled Drugs and Substances Act**. [XML file](https://laws-lois.justice.gc.ca/eng/XML/C-38.8.xml) of official content on Justice Laws website. Also explore CanLII's API?
- **Trespass Act**. 
- **Liquor Control and Licensing Act**.
- **Mental Health Act**. 
- **Case Law**. Data source not yet confirmed - possibilities for Canadian case law include LexisNexis' Developer API or Compass.Law's case law API.
- **Internal RCMP policies**. Data source not yet confirmed - exploring internal API (link only works for application development team) or HTML webscraping.
- **Bylaws**. Not yet sourced - would need to identify bylaw content for every jurisdiction (approximately 189) in British Columbia. [Here](https://www.ubcm.ca/about-ubcm/member-directory) is a list of all B.C. jurisdictions.

*Notes: When implementing proper data pipeline, switch to drawing XML from [Justice Laws GitHub repo](https://github.com/justicecanada/laws-lois-xml). Consider using [XSLT](https://github.com/justicecanada/laws-lois-xml/issues/7) to parse XML to HTML?*