document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid','teamnumber'));
        
        const db = new Dexie("Team Tracking App");
        db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber" });

        const team = await db.teams.where('globalid').equals(globalid).first();
        if (team) {
            const teamNameElm = document.getElementById('teamname');
            teamNameElm.value = `${team.teamname}`;
            const teamNumElm = document.getElementById('teamnumber');
            teamNumElm.value = `${team.teamname}`;
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
});