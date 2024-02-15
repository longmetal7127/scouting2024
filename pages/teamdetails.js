// Initialize IndexedDB database
const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo, globalid" });

// Function to extract query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch team details using globalid
async function fetchTeamDetails(globalid) {
    const team = await db.todos.where({ globalid: Number(globalid) }).first();
    return team;
}

// Fetch globalid from URL query parameter
const globalid = getQueryParam("globalid");

// Fetch and display team details
if (globalid) {
    fetchTeamDetails(globalid).then(team => {
        if (team) {
            const teamDetailsDiv = document.getElementById("team-details");
            teamDetailsDiv.innerHTML = `<p>Team Name: ${team.todo}</p>`;
        } else {
            console.error("Team not found");
        }
    }).catch(error => {
        console.error("Error fetching team details:", error);
    });
} else {
    console.error("Global ID not found in URL");
}