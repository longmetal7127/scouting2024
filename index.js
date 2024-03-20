const db = new Dexie("Team Tracking App");
//trap was in there twice throwing errors so I removed the last one of them (2nd to last entry)

db.version(16).stores({ 
  teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
  matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, otherinfo"
});

// Assuming 'db' is your Dexie database instance
const dbName = db.name; // Get the name of the database you want to delete

// Version numbers must be changed whenever database objects (schema) are edited? See "Modify Schema" in https://dexie.org/docs/Tutorial/Understanding-the-basics

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

/* begin offline --------------------------------------------------------------------------- */

//options for the internet check (offline.js).  It looks to google for the internet and if it does not find it knows we have no internet (unless google goes down)
Offline.options = {
  checkOnLoad: true, // Whether to check the connection status immediately when the page loads
  reconnect: {
      initialDelay: 3, // Initial delay before attempting to reconnect (in seconds)
      delay: 10 // Delay between reconnection attempts (in seconds)
  },
  requests: false, // Whether to automatically intercept AJAX requests and retry them when the connection is back
  game: false, // Whether to simulate offline behavior for testing purposes
  checks: {
    google: {
        url: 'https://www.google.com/', // URL to check for internet connectivity
        timeout: 5000, // Timeout for the check (in milliseconds)
        type: 'GET' // HTTP method to use for the check
    }
  }
};

Offline.on('confirmed-up', function() {
  // Code to execute when the internet connection is detected
  // Fetch data from IndexedDB and sync it to Azure SQL Server
  console.log("internet confirmed-up")
  syncDataToAzureSQL();
});

Offline.on('up', function() {
  // Code to execute when the internet connection is detected
  // Fetch data from IndexedDB and sync it to Azure SQL Server
  console.log("internet up")
  syncDataToAzureSQL();
});

Offline.on('down', function() {
  // Code to execute when the internet connection is lost
  console.log("internet down")
});

/* End offline --------------------------------------------------------------------------- */

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const teamname = input.value;
  let DateObj = new Date();
  const globalid = parseInt(DateObj.getTime(),10);
  let clienttimestamp = moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
  await db.teams.add({ teamname , globalid, clienttimestamp });
  await getTeams();
  form.reset();
};

//display team
const getTeams = async () => {
  try {
    const allTeams = await db.teams.reverse().toArray();    
    // Check if allTeams is not empty
    if (allTeams && allTeams.length > 0) {
      list_el.innerHTML = allTeams
        .map(teams => `
          <div class="team">
            <div class="content">
              <input id="edit" class="text" readonly="readonly" type="text" value="${teams.teamname}">
            </div>  
            <div class="actions">
              <div>${teams.globalid}</div>
              <button class="edit" onclick="newMatch(${teams.globalid})">New Match</button>
              <button class="delete" onclick="deleteTeams(event, ${teams.id})">Delete</button>
              <button class="edit" onclick="editTeam(${teams.globalid})">Edit</button>
            </div>
          </div>
        `)
        .join("");
    } else {
      // Handle case when no teams are found
      list_el.innerHTML = "<p>No teams found.</p>";
    }
  } catch (error) {
    // Handle the error
    console.error("Failed to retrieve teams:", error);
    // Optionally, display an error message to the user
    list_el.innerHTML = "<p>Error loading teams. Please try again later.</p>";
  };
}

window.onload = getTeams;

const getTeamList = async () => {
  const teams = db.teams.reverse().toArray();
  const data = {
    teamname: '${teams.teamname',
    globalid: '${teams.globalid'
  };
}

//delete team
const deleteTeams = async (event, id) => {
  await db.teams.delete(id);
  await getTeams();
};

function editTeam(globalid) {
  window.open(`pages/teamdetails.html?globalid=${globalid}&match=1`, "_self");  //well, it defaults to new page so we will try _self
}

function newMatch(globalid) {
  window.open(`pages/matchInfo.html?globalid=${globalid}&match=1`, "_self");  //well, it defaults to new page so we will try _self
}

async function syncDataToAzureSQL(){
  var data = await getAllDataFromStore('Team Tracking App', 'teams');
  if(data && data.length > 0){
    console.log('Sending data to server:', data);
    // Using Fetch API to send data to PHP server-side script
    fetch('php/db.php', {
      method: 'POST', // or 'GET', depending on your preference
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Convert data to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the response as JSON
    })
    .then(jsonData => {
      console.log('Success:', jsonData);
      // Check if debug information is available and log it
      if (jsonData.debug) {
          console.log('Debug info:', jsonData.debug);
      }
      if (jsonData.data) {
        console.log('Data:', jsonData.data);
      }
    })
    .catch((error) => console.error('Error:', error));
  }
  else {
    console.log('No data to sync.');
  }
}

// Function to get all data from a specified store in IndexedDB
function getAllDataFromStore(dbName, storeName) {
  return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(dbName);

      openRequest.onupgradeneeded = () => {
          // This event is only implemented in recent browsers
          openRequest.result.createObjectStore(storeName, { autoIncrement: true });
      };

      openRequest.onerror = () => reject(openRequest.error);
      openRequest.onsuccess = () => {
          const db = openRequest.result;
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.getAll();

          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
              resolve(request.result);
              db.close();
          };
      };
  });
}