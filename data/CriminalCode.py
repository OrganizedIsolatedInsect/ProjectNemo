# -*- coding: utf-8 -*-
"""
Created on Thu Aug 11 12:32:28 2022

@author: 000276194
"""

from lxml import etree
import pandas as pd
import os 

# Get XML
file = os.path.expanduser('~\\Documents\\Working Codes\MVA\C-46.xml')

# Read from URL in the future
#url = 'https://laws-lois.justice.gc.ca/eng/XML/C-46.xml'

# Get File's ElementTree
doc = etree.parse(file)

# Strip 'XRefExternal' tag but keep content
etree.strip_tags(doc,'XRefExternal')

# Write stripped ElementTree back to desktop
newfile = os.path.expanduser('~\\Documents\\Working Codes\MVA\C-46Stripped.xml')
doc.write(newfile)

# =============================================================================
# Parse XML
#
# =============================================================================
# Rewrite this as function(s) and mitigate repititions
label = []
marginalnote = []
sectiontext = []

subsectionsection = []
subsectionlabel = []
subsectionnote = []
subsectiontext = []

paragraphsection = []
paragraphsubsection = []
paragraphlabel = []
paragraphtext = []

subparasection = []
subparasubsection = []
subparaparagraph = []
subparalabel = []
subparatext = []

for _, topelement in etree.iterparse(newfile, tag='Body'):
    for element in topelement.findall('Section'):
        # Retrieve Label (Section #)
        label.append(element.findtext('Label'))
        
        # Retrieve Marginal Note (Category)
        marginalnote.append(element.findtext('MarginalNote'))
        
        #### Section Text ####
        # Retrieve section text
        sectext = element.findtext('Text')
        
        #sectiontext.append(sectext)
        #If section text is empty, check if it's repealed
        if sectext is not None:
            sectiontext.append(sectext)
        else:
            # sectiontext.append(element.findtext('Repealed'))
            textelem = element.find('Text')
            
            # If it's repealed add Repealed as Section Text
            if textelem is not None:
                sectiontext.append(textelem.findtext('Repealed'))
            else: #Add NoneType as Section Text (e.g., there isn't a text to the section)
                sectiontext.append(None)
        
        #### Subsection ####
        #### Create a subsection dataframe ####
        # Check if subsection exists
        subtext = element.find('Subsection')
        
        if subtext is not None:
            for subelement in element.iter('Subsection'):
                subsectionsection.append(element.findtext('Label')) # This is to get back the relationship
                subsectionlabel.append(subelement.findtext('Label'))
                subsectionnote.append(subelement.findtext('MarginalNote'))
                subsectiontext.append(subelement.findtext('Text'))
            
                # Check if there are Paragraphs in Subsections
                paratext = subelement.find('Paragraph')
                if paratext is not None:
                    for subparaelement in element.iter('Paragraph'):
                        paragraphsection.append(element.findtext('Label'))
                        paragraphsubsection.append(subelement.findtext('Label'))
                        paragraphlabel.append(subparaelement.findtext('Label'))
                        paragraphtext.append(subparaelement.findtext('Text'))
                        
                        # Check if there's subparagraphs
                        if subparaelement.find('Subparagraph') is not None:
                            for subpara in subelement.iter('Subparagraph'):
                                subparasection.append(element.findtext('Label'))
                                subparasubsection.append(subelement.findtext('Label'))
                                subparaparagraph.append(subparaelement.findtext('Label'))
                                subparalabel.append(subpara.findtext('Label'))
                                subparatext.append(subpara.findtext('Text'))
        
        #### Paragraph ####
        #### Create a paragraph dataframe ####
        # Check if paragraph exists within Section
        paratext = element.find('Paragraph')
        
        if paratext is not None:
            for subelement in element.iter('Paragraph'):
                paragraphsection.append(element.findtext('Label'))
                paragraphsubsection.append(None)
                paragraphlabel.append(subelement.findtext('Label'))
                paragraphtext.append(subelement.findtext('Text'))
                
                # Check if there's subparagraphs
                if subelement.find('Subparagraph') is not None:
                    for subpara in subelement.iter('Subparagraph'):
                        subparasection.append(element.findtext('Label'))
                        subparasubsection.append(None)
                        subparaparagraph.append(subelement.findtext('Label'))
                        subparalabel.append(subpara.findtext('Label'))
                        subparatext.append(subpara.findtext('Text'))
    
# =============================================================================
# Create dataframes - this should be part of the function
# Rewrite above function to include this
# This should be just the full merge
# =============================================================================

df_section = pd.DataFrame({'section':label,
                   'sectionHeader': marginalnote,
                   'sectionText': sectiontext})

df_subsection = pd.DataFrame({'section':subsectionsection,
                             'subsection': subsectionlabel,
                             'subsectionHeader':subsectionnote,
                             'subsectionText':subsectiontext})           

df_paragraph = pd.DataFrame({'section':paragraphsection,
                           'subsection': paragraphsubsection,
                           'paragraph': paragraphlabel,
                           'paragraphText':paragraphtext})

df_subparagraph = pd.DataFrame({'section':subparasection,
                                'subsection':subparasubsection,
                                'paragraph':subparaparagraph,
                                'subparagraph':subparalabel,
                                'subparagraphText':subparatext})

# Merge dataframes into one


df_fullcc = (df_section
             .merge(df_subsection, how = 'left', on = 'section')
             .merge(df_paragraph, how = 'left', on = ['section', 'subsection'])
             .merge(df_subparagraph, how = 'left', on = ['section', 'subsection', 'paragraph'])
             )

# Add index
df_fullcc = df_fullcc.reset_index()

# Export to JSON
# Should export to SQLite in the future?
ccjson = os.path.expanduser('~\\Documents\\Working Codes\MVA\C-46.json')
df_fullcc.to_json(ccjson, orient='records')

# =============================================================================
# TODO: Definitions
# =============================================================================
term = []
definitiontext = []
definitionparalabel = []
definitionparatext = []
definitionsubparalabel = []
definitionsubparatext = []

for _, element in etree.iterparse(file, tag='Definition'):
    
    
    d = element.findall('Paragraph')
    for i in d:
        print(element.findtext('Label'), i.tag, i.findtext('Text'))
    print(d)
    for i in d: print(i.tag)
    print(d.tag)
    for subelement in element.iter('Subsection'):
        print(subelement.tag, subelement.findtext('MarginalNote'), subelement.findtext('Label'))







# Test code chunks

root = doc.getroot()

elements = []

for event, element in etree.iterparse(file, tag='MarginalNote'):
    elements.append((event, element.tag, element.text))

iterparser = []


