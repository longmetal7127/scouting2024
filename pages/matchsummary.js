// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(15).stores({ 
  teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active", 
  preferences: "++indexid, globalid, clienttimestamp, match, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
  matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, otherinfo"
});

const urlParams = new URLSearchParams(window.location.search);
const globalid = parseInt(urlParams.get('globalid'), 10);
const match_list = document.querySelector("#matches");
//const thismatch = urlParams.get('match'); NOT NEEDED

//document.getElementById("teamnameeditable").textContent = "hello world";

document.addEventListener('DOMContentLoaded', async () => {
    try {      
        const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
        if (team) {
            
            document.getElementById("teamnameeditable").innerHTML = team.teamname;
            document.getElementById("teamnumbereditable").innerHTML = team.teamnumber;
           
            
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

const getMatches = async () => {
    try {
        const allMatches = await db.matches.toArray();
        // check if allMatches is not empty
        if (allMatches && allMatches.length > 0) {
            /*match_list.innerHTML = allMatches
            .map(matches =>
                <div class="match">
                <div class="content">
                    <input id="edit" class="text" readonly="readonly" type="text" value="${matches.matchnumber}">
                </div>  
                    <div class="actions">
                        <div>${teams.globalid}</div>
                        <button class="edit" onclick="editMatch(${teams.globalid})">Edit</button>
                    </div>
                </div>
                
                //BROKEN CODE //////////
            )
            .join("");*/
        } else {
            //Handle case when no matches are found
            match_list.innerHTML = "<p> No matches found. </p>";
        }
    } catch (error) {
        // Handle the error
        console.error("Failed to retrieve matches:", error);
        // Optionally, display an error message to user
        match_list.innerHTML = "<p>Error loading matches. Please try again later.</p>";
    }
}

window.onload = getMatches;

/*const getMatchList = async () => {
    const matches = db.matches.toArray();
    const data = {
        matchnumber: '${matches.matchnumber',
        // ???????
    }
}*/

/*function editMatch(globalid) {
    window.open('')
}*/



