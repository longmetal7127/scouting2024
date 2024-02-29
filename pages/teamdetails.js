document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Dexie and retrieve data based on the team ID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = parseInt(urlParams.get('globalid'));
    console.log(`${teamId}`);

    const db = new Dexie("Team Tracking App");
    db.version(1).stores({
        teams: "++id, teamname, globalid"
    });

    // Retrieve data for the specified team ID
    const team = await db.teams.get(teamId);
    if (team) {
        // Display the team details on the page
        const teamDetailsDiv = document.getElementById('test');
        teamDetailsDiv.innerHTML = `${team.teamname}`;
    } else {
        console.log(`Team with ID ${teamId} not found.`);
    }
});

