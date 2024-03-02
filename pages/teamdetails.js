document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid'));
        
        const db = new Dexie("Team Tracking App");
        db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber" });

        const team = await db.teams.where('globalid').equals(globalid).first();
        if (team) {
            const teamNameElm = document.getElementById('teamname');
            teamNameElm.value = `${team.teamname}`;
            const teamNumElm = document.getElementById('teamnumber');
            teamNumElm.value = `${team.teamnumber}`;
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
});
// do we need to refresh the page in a similar way above in index.js? 
// if the teamname changes then it should be reflected in team list page

// no because we aren't adding anything to the page elsewhere.  We just add the number, it gets saved and that's it, it's already on the page although that doesn't seem to be working now.


// below is all broken code

async function submitTeamData(teamName, teamNumber, globalId) {
    try {
        const db = new Dexie("Team Tracking App");
        db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber" });

        // Check if the team with the given global ID exists
        const existingTeam = await db.teams.where('globalid').equals(globalId).first();

        // If the team exists, update its data
        if (existingTeam) {
            await db.teams.update(existingTeam.id, { teamname: teamName, teamnumber: teamNumber });
            console.log('Team data updated successfully:', existingTeam.id);
        } else {
            // If the team doesn't exist, add it as a new entry
            await db.teams.add({ teamname: teamName, teamnumber: teamNumber, globalid: globalId });
            console.log('New team added successfully:', teamName, teamNumber, globalId);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
}

// async function submitteamname(teamname, id) {
//     const db = await openDB('myIndexedDB', 1); 
//     // this is a completely new database object??
//     const tx = db.transaction('storeName', 'readwrite');
//     const store = tx.objectStore('storeName');

//     // If an ID exists, update existing data; otherwise, add new data
//     if (id) {
//       await store.put(teamname, id);
//     } else {
//       await store.add(teamname);
//     } // idk what this code does
  
//     await tx.done;
// }

document.getElementById("teaminfoform").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default form submission behavior
    const teamname = document.getElementById('teamname').value;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("globalid");

    submitTeamData(teamname, teamNumber, id); // I forgot how the database is set up, does id refer to a team object or does the teamname have an id???
    // I guessed id = globalid

    alert("Team name successfully submitted.");
});
    
    // why does it go to a new page (new query parameters) after pressing the submit button?
    //https://www.w3schools.com/tags/att_form_target.asp
    //https://www.w3schools.com/tags/att_form_action.asp

    //If you go to the index.js file, it is the line in the function that reads window.open(`pages/teamdetails.html?globalid=${globalid}`, "_blank");  you want to remove the ,"_blank" part
