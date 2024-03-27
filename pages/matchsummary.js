
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
                <h1 style="float:left; margin-left:50px; margin-top:20px;margin-bottom:15px;">${team.teamname}</h1>   
                
                <br><br><br><br>

                <!-- <p> Team Number: ${db.teams.teamnumber}</p><br> --> 
              
                <p> Average Autonomous Accuracy: ${Math.round(parseFloat(await sumColumnForGlobalId(team.globalid, 'count2')/await sumColumnForGlobalId(team.globalid, 'count1'))*100)}% </p>
                <p> Average Teleop Speaker Accuracy: ${Math.round(parseFloat(await sumColumnForGlobalId(team.globalid, 'count4')/await sumColumnForGlobalId(team.globalid, 'count3'))*100)}%</p>
                <p> Average Teleop Amp Accuracy: ${Math.round(parseFloat(await sumColumnForGlobalId(team.globalid, 'count6')/await sumColumnForGlobalId(team.globalid, 'count5'))*100)}%</p>

                <br>
                <table class="datatables" id="largedatatable">                    
                    
                    <tr>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Autonomous Shots Attempted</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Autonomous Shots Made</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Speaker Shots Attempted</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Speaker Shots Made</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Amp Shots Attempted</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Amp Shots Made</td>
                    </tr>   
                    <tr>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count1')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count2')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count3')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count4')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count5')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count6')}</td>
                    </tr>      
                </table>

                <table class="datatables"> 
                    <tr>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Stage</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Hangs</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Harmony Hangs</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Scores in Trap</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px">Died/froze</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await countTrueValuesForGlobalId(team.globalid, 'stage')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await countTrueValuesForGlobalId(team.globalid, 'hangs')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await countTrueValuesForGlobalId(team.globalid, 'harmony')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await countTrueValuesForGlobalId(team.globalid, 'trap')}</td>
                        <td style="border: 1px solid black; border-radius: 10px;border-collapse: collapse;padding:5px;text-align: center;">${await sumColumnForGlobalId(team.globalid, 'count7')}</td>
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
  
  const sumColumnForGlobalId = async (globalId, columnName) => {
    try {
      // Fetch rows from the database based on the provided globalId
      const rows = await db.matches.where('globalid').equals(globalId).toArray();
      
      // Calculate the sum of the specified column
      const sum = rows.reduce((accumulator, currentRow) => accumulator + parseInt(currentRow[columnName], 10), 0);
      
      return sum;
    } catch (error) {
      console.error("Failed to sum column for globalId:", error);
      return null;
    }
  }

  const countTrueValuesForGlobalId = async (globalId, columnName) => {
    try {
      // Fetch rows from the database based on the provided globalId
      const rows = await db.matches.where('globalid').equals(globalId).toArray();
      
      // Initialize counter for true values
      let trueCount = 0;
      
      // Loop through rows and count true values
      rows.forEach(row => {
        if (row[columnName] === true) {
          trueCount++;
        }
      });
      
      return trueCount;
    } catch (error) {
      console.error("Failed to count true values for globalId:", error);
      return null;
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
