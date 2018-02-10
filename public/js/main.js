//IIFE for exposing API
(function anonAPI(global)
{
    var API = {
        getFavorites: getFavorites,
        toggleFavorite: toggleFavorite,
        searchAlbums: searchAlbums
    };
    global.API = API;
    
    
    //Caches all the albums searched
    //Each album also stores if it was a favorite or Not
    var albums = {};

    function getFavorites(artistName)
    {

        if(artistName === undefined)
            artistName = "";
        else
            artistName = artistName.toLowerCase();
        var values = [];
        for(var key in albums)
        {
            if(albums[key].isFavorite)
            {
                if(albums[key].artistName.toLowerCase().indexOf(artistName)!=-1)
                    values.push(albums[key]);
            }
        }
        return values;
    }
    function toggleFavorite(albumId)
    {
        albums[albumId].isFavorite = !albums[albumId].isFavorite;
    }
    function searchAlbums(artistName, resolve, reject)
    {
        //iTunes API Endpoint to search albums for a particular artist
        var searchUrl = "https://itunes.apple.com/search?entity=album&limit=200&term="+artistName;
            
             var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() { 
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                        try{
                        var retData = [];
                        var data = JSON.parse(xmlHttp.responseText).results;
                        //Loop over all data
                        for(var key in data)
                        {
                            //Check if album is cached
                            //CollectionId is unique identifier
                            if(albums[data[key].collectionId] === undefined)
                            {
                                //An album has not been searched before
                                //Set a new searched album to a non favorite
                                data[key].isFavorite = false;
                                //Save it to saved albums
                                albums[data[key].collectionId] = data[key];
                                
                            }
                            //If it was a new album, it would be a non-favorite
                            //Else it would be a favorite, if favorited by user in past.
                            retData.push(albums[data[key].collectionId]);
                           
                        }
                        resolve(retData);
                        }
                        catch(e)
                        {
                            reject("There was some error");
                        }
                    }  
                    
            };
        xmlHttp.open("GET", searchUrl, true); // true for asynchronous 
                xmlHttp.send(null);
    }
})(window);
