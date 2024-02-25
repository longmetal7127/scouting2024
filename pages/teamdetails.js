// Initialize IndexedDB database

//NOTE: we need to rename all of the variables in here from the "To-Do List" template to our "Teams"

//NOTE: I added ChatGPT-based explanations to break down this code because otherwise it's unintelligible lol

// QUESTION: Are teams that are deleted from the site also deleted from the local DB?

const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo, globalid" });

// the database sets up an object "todos" (need to rename) that consists of:
// ++id - auto-incrementing primary key/field named "id"
// todo - a field called "todo"
// globalid - a field called "globalid," used to identify teams

// Function to extract query parameter from URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// URLs look like ... /scouting2024/pages/teamdetails.html?globalid=____
// the ? denotes the start of URL/query parameters (which are used to pass data to web page thru URL)
// and globalid has a value (unique UTC time) that identifies the team (i.e. 1708014161661)

// Function to fetch team details using globalid
async function fetchTeamDetails(globalid) {
  const team = await db.todos.where({ globalid: Number(globalid) }).first();
  return team;
}

// fetchTeamDetails is where info is pulled from local database

// Fetch globalid from URL query parameter
const globalid = getQueryParam("globalid");

// searches the URL parameters for a key called globalid and saved value in constant

/*document.getElementById("submit").addEventListener("submit", function(event){
    print("hello world")
})*/

// Fetch and display team details
if (globalid) {
  // if globalid isn't null, undef, empty, etc.
  fetchTeamDetails(globalid)
    .then((team) => {
      if (team) {
        // if team details successfully fetched
        const teamDetailsDiv = document.getElementById("team-details"); // there is a div with id "team-details" on team details page
        teamDetailsDiv.innerHTML = `<p>Team Name: ${team.todo}</p>`;
      } else {
        // team details not fetched
        console.error("Team not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching team details:", error);
    });
} else {
  console.error("Global ID not found in URL");
}
