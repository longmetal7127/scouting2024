import sql from 'mssql';

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
  syncDataToAzureSQL();
});

Offline.on('down', function() {
  // Code to execute when the internet connection is lost
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

//delete team
const deleteTeams = async (event, id) => {
  await db.teams.delete(id);
  await getTeams();
};

function editTeam(globalid) {
  window.open(`pages/teamdetails.html?globalid=${globalid}`, "_self");  //well, it defaults to new page so we will try _self
}

const config = {
  user: 'admin@CityofSpringfield377.onmicrosoft.com',
  password: '3P&tLBL7Xc7L6R5p',
  server: 'scounting7127.database.windows.net',
  database: 'scouting7127',
  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
};

async function connectToDatabase() {
  try {
      await connect(config);
      console.log('Connected to Azure SQL Database');
  } catch (err) {
      console.error('Error connecting to Azure SQL Database:', err);
  }
}

// Call the function to connect
connectToDatabase();
//syncDataToAzureSQL();