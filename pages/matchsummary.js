
// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(17).stores({ 
    teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
    matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap, otherinfo"
  });

//Get the teams
const list_el = document.querySelector("#teams");

const getTeams = async () => {
    try {
      const allTeams = await db.teams.reverse().toArray();
      
      if (allTeams && allTeams.length > 0) {
        // Loop through each team
        for (const team of allTeams) {
          // Fetch matches for the current team using the global id
          const matchesForTeam = await db.matches.where('globalid').equals(team.globalid).toArray();
          
          // Generate HTML for team and matches
          const teamHTML = `
            <div class="teams">
              <div class="content\s">
                <h1 style="float:left; margin-left:50px; margin-top:20px;">${team.teamname}</h1>   
                <table style="clear:both; margin-left:55px;border: 1px solid black; border-radius: 10px;border-collapse: collapse;margin-bottom:15px;">
                    <tr>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Autonomous Shots Attempted</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Autonomous Shots Made</td>
                    </tr>      
                </table>
          `;
          
          let matchesHTML = "";
          if (matchesForTeam && matchesForTeam.length > 0) {
            matchesHTML = matchesForTeam.map(match => `
              <div class="matches" style="clear:both; margin-left:30px;>
                <div class="contents">
                  <p>Match: <a href='matchinfo.html?globalid=${match.globalid}&matchnumber=${match.matchnumber}'>${match.matchnumber}</a></p>
                  <!-- Add other match information here as needed -->
                </div>
              </div> 
            `).join("");
          } else {
            matchesHTML = "<p>No matches found for this team.</p>";
          }
          
          // Append team and matches HTML to list_el
          list_el.innerHTML += teamHTML + matchesHTML;
        }
      } else {
        list_el.innerHTML = "<p>No teams found.</p>";
      }
    } catch (error) {
      console.error("Failed to retrieve teams:", error);
      list_el.innerHTML = "<p>Error loading teams. Please try again later.</p>";
    }
  }

  window.onload = getTeams;

  const getTeamList = async () => {
    const teams = db.teams.reverse().toArray();
    const data = {
      teamname: '${teams.teamname',
      globalid: '${teams.globalid'
    };
  }

  sumColumnForGlobalId(globalId, columnName)
  .then(sum => {
    if (sum !== null) {
      console.log(`Sum of ${columnName} for globalId ${globalId}: ${sum}`);
    } else {
      console.log("Failed to calculate the sum.");
    }
  });

// const urlParams = new URLSearchParams(window.location.search);
// const globalid = parseInt(urlParams.get('globalid'), 10);
// const match_list = document.querySelector("#matches");
//const thismatch = urlParams.get('match'); NOT NEEDED

//document.getElementById("teamnameeditable").textContent = "hello world";

// document.addEventListener('DOMContentLoaded', async () => {
//     try {      
//         const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
//         if (team) {
            
//             document.getElementById("teamnameeditable").innerHTML = team.teamname;
//             document.getElementById("teamnumbereditable").innerHTML = team.teamnumber;
           
            
//         } else {
//             console.log(`Team with ID ${globalid} not found.`);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// });

// const getMatches = async () => {
//     try {
//         const allMatches = await db.matches.toArray();
//         // check if allMatches is not empty
//         if (allMatches && allMatches.length > 0) {
//             match_list.innerHTML = allMatches
//             .map(matches =>
//                 <div class="match">
//                 <div class="content">
//                     <input id="edit" class="text" readonly="readonly" type="text" value="${matches.matchnumber}">
//                 </div>  
//                     <div class="actions">
//                         <div>${teams.globalid}</div>
//                         <button class="edit" onclick="editMatch(${teams.globalid})">Edit</button>
//                     </div>
//                 </div>               
//             )
//             .join("");
//         } else {
//             //Handle case when no matches are found
//             match_list.innerHTML = "<p> No matches found. </p>";
//         }
//     } catch (error) {
//         // Handle the error
//         console.error("Failed to retrieve matches:", error);
//         // Optionally, display an error message to user
//         match_list.innerHTML = "<p>Error loading matches. Please try again later.</p>";
//     }
// }

// window.onload = getMatches;

// /*const getMatchList = async () => {
//     const matches = db.matches.toArray();
//     const data = {
//         matchnumber: '${matches.matchnumber',
//         // ???????
//     }
// }*/

// /*function editMatch(globalid) {
//     window.open('')
// }*/

// // does this need to be synced to Azure SQL? if so, add function syncDataToAzureSQL


// // Function to get all data from a specified store in IndexedDB
// function getAllDataFromStore(dbName, storeName) {
//     return new Promise((resolve, reject) => {
//         const openRequest = indexedDB.open(dbName);

//         openRequest.onupgradeneeded = () => {
//             // This event is only implemented in recent browsers
//             openRequest.result.createObjectStore(storeName, { autoIncrement: true });
//         };
  
//         openRequest.onerror = () => reject(openRequest.error);
//         openRequest.onsuccess = () => {
//             const db = openRequest.result;
//             const transaction = db.transaction(storeName, 'readonly');
//             const store = transaction.objectStore(storeName);
//             const request = store.getAll();
  
//             request.onerror = () => reject(request.error);
//             request.onsuccess = () => {
//                 resolve(request.result);
//                 db.close();
//             };
//         };
//     })
// }