// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(15).stores({ 
  teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active", 
  preferences: "++indexid, globalid, clienttimestamp, match, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
  matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, otherinfo"
});

const urlParams = new URLSearchParams(window.location.search);
const globalid = parseInt(urlParams.get('globalid'), 10);
//const thismatch = urlParams.get('match'); NOT NEEDED

//document.getElementById("teamnameeditable").textContent = "hello world";

document.addEventListener('DOMContentLoaded', async () => {
    try {      
        const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
        if (team) {
            
            document.getElementById("teamnameeditable").innerHTML = team.teamname;
            document.getElementById("teamnumbereditable").innerHTML = team.teamnumber;
            // FIX BROKEN TEAM NUMBER UPDATE ^^^ 
            
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
