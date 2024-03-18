# scouting2024

We need a whiteboard


scouting app for competitions written with xcode/vscode
// 
current HTML page references the link below for experimental purposes
https://blog.openreplay.com/building-a-mobile-app-using-html-css-and-js/#:~:text=Cheap%20and%20Fast%20Development%3A%20PWAs,are%20required%20for%20a%20PWA.

https://scouting7127.azurewebsites.net/

https://scouting7127.azurewebsites.net/phpmyadmin/

https://stackoverflow.com/questions/22342836/syncing-indexeddb-with-sql-server 

I created a few new pages
    /testing/dexie.html - displays dexie database contents
	
    /testing/deletedexie.html - deletes the local dexie db to avoid those can't upgrade issues
	
    /php/php/dbtest.php - if you set up a local environment on your computer this will test the connection to your local sql server (makes development alot faster)
	
    a few template files to the php folder - since we don't want to upload credentials to github we put those in file that we can put in our gitignore file and if someone wants to download the app they have something to work off of but not the credentials themselves
	
        since in order to need those credentials you have to be connected to the internet, we don't need those files to be on our local machine for offline use
		

TODO: 

FOR THE PUSH FUNCTION

    Add check to see if team globalid exists and update instead of insert
	
    Add check that the team data being updated is more recent then the data in the database
	
    
FOR THE SYNC FUNCTION

    Add check to make sure we are not syncing duplicate data (timestamps everywhere) back to the ipads or whatever
	
    Add check to make sure we are not syncing old data back to the . . .    
	

BOTH

    How to handle deletes
	

OTHER

    add timestamp field defaults
	
    split out submits according to new tables
	
    what fields are accoring to match and applied to team overall - which values are constant from match to match and which change over time
	
    initialize the match number and track it so a duplicate cannot be entered when inserting new match
	
    add new match to the homescreen for each team that links to tyhe match summary page for that team and creates a new match
	
    if you see any undefined in the db get rid of them (give a default value) undefined or NULL is bad news in databases
	
