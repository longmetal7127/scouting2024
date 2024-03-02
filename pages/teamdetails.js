// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(1).stores({ teams: "++id, teamname, teamnumber, teamschool, alliancescore, startingpos, leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, otherIntakeInfo, stageAbilities, favorsCoopertition" });

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid'));
        
         // Use the globally initialized db instance
         const team = await db.teams.where('globalid').equals(globalid).first();
         if (team) {
             const teamNameElm = document.getElementById('teamname');
             teamNameElm.value = team.teamname;
             const teamNumElm = document.getElementById('teamnumber');
             teamNumElm.value = team.teamnumber;
         } else {
             console.log(`Team with ID ${globalid} not found.`);
         }
     } catch (error) {
         console.error("Error accessing database:", error);
     }
});

async function submitTeamData(teamname, globalid, teamnumber, teamschool, alliancescore, startingpos, leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, otherIntakeInfo, stageAbilities, favorsCoopertition) {
    try {
        const parsedGlobalId = parseInt(globalId, 10);

        const teamData = { 
            teamname: teamName, 
            teamnumber: teamNumber, 
            teamschool: teamSchool,
            alliancescore: allianceScore,
            // Include other form data fields here, structured similarly
        };

        const existingTeam = await db.teams.where('globalid').equals(parsedGlobalId).first();

        if (existingTeam) {
            await db.teams.update(existingTeam.id, teamData);
            console.log('Team data updated successfully:', existingTeam.id);
        } else {
            await db.teams.add({...teamData, globalid: parsedGlobalId});
            console.log('New team added successfully:', teamName, teamNumber, parsedGlobalId);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
}

document.getElementById("teaminfoform").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    const teamname = document.getElementById('teamname').value;
    const teamnumber = document.getElementById('teamnumber').value;
    const teamschool = document.getElementById('teamschool').value;
    const alliancescore = document.getElementById('alliancescore').value;

    const startingpos = document.getElementById('startingpos').value;
    const picksup = document.getElementById('picksup').value;
    const scores2amp = document.getElementById('scores2amp').value;
    const scores2speaker = document.getElementById('scores2speaker').value;

    const preferredScoringMethod = document.getElementById('Preferred').value;

    const favorsCoopertition = document.getElementById('teamname').value;

    // Capture other form data similarly

    const urlParams = new URLSearchParams(window.location.search);
    const globalid = urlParams.get("globalid");

    // Pass the new data to submitTeamData
    submitTeamData(teamname, globalid, teamnumber, teamschool, alliancescore, startingpos, leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, otherIntakeInfo, stageAbilities, favorsCoopertition);
    
    alert("Team data successfully submitted.");
});
