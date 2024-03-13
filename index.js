const db = new Dexie("Team Tracking App");
db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop" });

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

//options for the internet check (offline.js).  It looks to google for the internet and if it does not find it knows we have no internet (unless google goes down)
Offline.options = {
  checkOnLoad: true, // Whether to check the connection status immediately when the page loads
  reconnect: {
      initialDelay: 3, // Initial delay before attempting to reconnect (in seconds)
      delay: 20 // Delay between reconnection attempts (in seconds)
  },
  requests: false, // Whether to automatically intercept AJAX requests and retry them when the connection is back
  game: false, // Whether to simulate offline behavior for testing purposes
  checks: {
    google: {
        url: 'http://www.google.com/', // URL to check for internet connectivity
        timeout: 5000, // Timeout for the check (in milliseconds)
        type: 'GET' // HTTP method to use for the check
    }
  }
};

Offline.on('up', function() {
  // Code to execute when the internet connection is detected
  // Fetch data from IndexedDB and sync it to Azure SQL Server
  console.log("syncDataToAzureSQL")
  syncDataToAzureSQL();
});

Offline.on('down', function() {
  // Code to execute when the internet connection is lost
  console.log("internet down")
});

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const teamname = input.value;
  let DateObj = new Date();
  const globalid = parseInt(DateObj.getTime(),10);
  await db.teams.add({ teamname , globalid });
  await getTeams();
  form.reset();
};

//display team
const getTeams = async () => {
  const allTeams = await db.teams.reverse().toArray();
  list_el.innerHTML = allTeams
    .map(
      (teams) => `
	
	<div class="team">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${teams.teamname}>
  </div>  
	<div class="actions">
  <div>${teams.globalid}</div>
	<button class="delete" onclick="deleteTeams(event, ${teams.id})">Delete</button>
  <button class="edit" onclick="editTeam(${teams.globalid})">Edit</button>
	</div>
	</div>
	`
    )
    .join("");
};
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
  window.open(`pages/teamdetails.html?globalid=${globalid}`, "_self");  //well, it defaults to new page so we will try _self
}

function syncDataToAzureSQL(teamarray){
  // Using Fetch API to send data to PHP server-side script
  fetch('php/dbconnect.php', {
    method: 'POST', // or 'GET', depending on your preference
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convert data to JSON string
  })
  .then(response => response.json()) // Parsing the JSON response
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}

// Call the function to connect
function syncDataToAzureSQL(){
  var data = getAllDataFromStore('Team Tracking App', 'teams');
  console.log(data);
  commitToAzureSQL(data);

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

// Example function to convert an array of objects into a specific key-value structure
function formatDataForPhp(dataArray) {
  const formattedData = {};
  dataArray.forEach((item, index) => {
      formattedData[`key${index + 1}`] = item.value; // Assuming each object has a 'value' key
  });
  return formattedData;
}

async function commitToAzureSQL(data) {
  // Assume 'dbName' and 'storeName' are defined
  getAllDataFromStore('Team Tracking App', 'teams').then(dataArray => {
    // Format the data
    const dataToPhp = formatDataForPhp(dataArray);

    // Sending the formatted data to PHP
    fetch('php/db.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPhp),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  });
}
  
//   getAllDataFromStore('Team Tracking App', 'teams').then(dataArray => {
//   // Format the data
//   const dataToPhp = formatDataForPhp(dataArray);
//   // Using Fetch API to send data to PHP server-side script
//   fetch('php/db.php', {
//     method: 'POST', // or 'GET', depending on your preference
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // Convert data to JSON string
//   })
//   .then(response => response.json()) // Parsing the JSON response
//   .then(data => console.log('Success:', data))
//   .catch((error) => console.error('Error:', error));

// }