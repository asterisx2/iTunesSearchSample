# iTunes Search API Sample

You can use this readme to find information on how to use basic functions, how to go about understanding the code, some assumptions and performance considerations I made.

# Considerations

## Important Considerations

 - The application does not use **Redux**. Adding redux would have unecessarily added complexity to the project.
 -  All data is stored in memory and exposed via an API. This API is attached to the **window** object and is directly called by **parent** components.

## Performance Considerations

 - O(NlogN) search. All albums are stored in a dictionary and each new album before adding is searched inside that dictionary to prevent overwriting.
 - O(N) space. All albums returned by the iTunes API on a search are cached. 

## Search Considerations

 - Search is limited to a **maximum of 200 results**. This limit is enforced by iTunes API. 
 - There is no **'load-more'** functionality. Upto 200 results are returned for each search what iTunes API and displayed.

## Data Considerations

 - Data is stored in memory. **Closing the browser will lead to loosing all data including any added favorites**. 
 
# Dependencies

 - **React** 
 - **React-Router** - To provide navigation
 - **Font-Awesome** - For icons
 -  **Node JS**
 -  **NPM**
 -  **Babel**
 
# Getting Started

## Install Dependencies

Navigate to the **app** folder and type **npm install** to install all dependencies.

## Start the application

To start the application, navigate to the **app** folder and type the command **npm start** in the command line.

# Basic Functions

The app stores all the data in your browser, which means all data is automatically deleted upon exiting browser.

## Search for Albums

When you start the application, you will land at the home page. You will find a search box at the center of the page. To search, start typing a artist's name and **press enter to search**. On the top right corner of the page you will find a **Search** button, you can press it to reach the search page. 

## Add a favorite

To add a favorite, click on the **heart** icon of a album 'card'. You can find all your favorites on the favorite page.

## View your favorites

All your favorites can be found on the favorites page. To view them click on the **Favorites** button. 

## Filter your favorites

To filter your favorites on the favorite page, start typing in the **filter box** on the top. Filtering is case-insensitive. Results are filtered **as you type.**

# Architecture

## API
Data is exposed through an API, the API is in  **~/public/js/main.js.**
 
## UI
The main UI componenets are under **~/src** folder.

### React Components

#### App [dot] js 
Containes a broswer router and hosts **search** and **favorite** components.

#### search [dot] js
Stateful react component for searching.

#### favorite [dot] js
Stateful react component for viewing favorites.

#### album [dot] js
Used by **search** and **favorite** components to display each album as a card.

### searchBar.js
Used by **search** component to search for albums and **favorite** component to filter favorites.


```
