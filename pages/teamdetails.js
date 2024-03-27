// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(17).stores({ 
  teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
  matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap, otherinfo"
});

    //I CHANGED ID TO INDEXID AS ID WAS CONFLICTING WITH THE AUTO INCREMENTED ID IN THE TABLE ON THE SQL SERVER *********************** Scrub that, I made a ton of changes :-\

    // Version numbers must be changed whenever database objects (schema) are edited? See "Modify Schema" in https://dexie.org/docs/Tutorial/Understanding-the-basics
    
const urlParams = new URLSearchParams(window.location.search);
const globalid = parseInt(urlParams.get('globalid'), 10);
const thismatch = urlParams.get('match');
    

document.getElementById("viewmatchsummary").addEventListener('click', function(event){
    window.open(`matchsummary.html?globalid=${globalid}&match=1`, "_self"); 
});


document.addEventListener('DOMContentLoaded', async () => {
    try {       
         // Use the globally initialized db instance
         const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
         if (team) {
            //text values
            const teamNameElm = document.getElementById('teamname');
            teamNameElm.value = team.teamname  || '';
            const teamNumElm = document.getElementById('teamnumber');
            teamNumElm.value = team.teamnumber  || '';
            const teamSchoolElm = document.getElementById('teamschool');
            teamSchoolElm.value = team.teamschool  || '';
            const allianceScoreElm = document.getElementById('alliancescore');
            allianceScoreElm.value = team.alliancescore  || '';         


            const moreInfoElm = document.getElementById('moreinfo');
            moreInfoElm.value = team.moreinfo || '';
            const startingPosElm = document.getElementById('startingpos');
            startingPosElm.value = team.startingpos || '';
            
            //checkbox values - checked
            const LeavesZone = document.getElementById('Leaveszone');
            LeavesZone.checked = team.Leaveszone || false;
            const scores1Amp = document.getElementById('scores1amp');
            scores1Amp.checked = team.scores1amp || false;
            const scores1Speaker = document.getElementById('scores1speaker');
            scores1Speaker.checked = team.scores1speaker || false;

            const picksUp = document.getElementById('picksup');
            picksUp.checked = team.picksup || false;

            const scores2Amp = document.getElementById('scores2amp');
            scores2Amp.checked = team.scores2amp || false;
            const scores2SpeakerElm = document.getElementById('scores2speaker');
            scores2SpeakerElm.checked = team.scores2speaker || false;
            
            //radio elements - if set then true
            const scoreRadios = document.querySelectorAll('input[name="score"]');
            scoreRadios.forEach((radio) => {
                if (radio.value === team.preferredScoringMethod) {
                  radio.checked = true; // Set the matching radio button as checked
                }
              });
              
              //radio elements
              const intakeRadios = document.querySelectorAll('input[name="intake"]');
              intakeRadios.forEach((radio) => {
                if (radio.value === team.preferredIntakeMethod) {
                  radio.checked = true; // Set the matching radio button as checked
                }
              });

            const prefintake = document.getElementById('prefintake');
            prefintake.value = team.prefintake || '';

            const spotlight = document.getElementById('spotlight');
            spotlight.checked = team.spotlight || false;
            const trap = document.getElementById('trap');
            trap.checked = team.trap || false;
            const alone = document.getElementById('alone');
            alone.checked = team.alone || false;
            const hangsWithAnother = document.getElementById('hangsWithAnother');
            hangsWithAnother.checked = team.hangsWithAnother || false;

            const attemptsSpotlight = document.getElementById('attemptsSpotlight');
            attemptsSpotlight.checked = team.attemptsSpotlight || false;
            const coop = document.getElementById('coop');
            coop.checked = team.coop || false;
            
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }

     } catch (error) {
         console.error("Error accessing database:", error);
     }
});

//insert/update team data
async function submitTeamData( teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, 
    Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake,
      spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop ) {
    try {
      let clienttimestamp = moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
      //has to have a comma even after the last element
        const teamData = { 
            teamname: teamname, 
            globalid: globalid,
            teamnumber: teamnumber, 
            teamschool: teamschool,
            alliancescore: alliancescore,
            clienttimestamp: clienttimestamp,
            moreinfo: moreinfo,
            startingpos: startingpos,
            Leaveszone: Leaveszone,
            scores1amp: scores1amp,
            scores1speaker: scores1speaker,
            picksup: picksup,
            scores2amp: scores2amp,
            scores2speaker: scores2speaker,            
            preferredScoringMethod: preferredScoringMethod,
            preferredIntakeMethod: preferredIntakeMethod,
            prefintake: prefintake,
            spotlight: spotlight,
            trap: trap,
            alone: alone,
            hangsWithAnother: hangsWithAnother,
            attemptsSpotlight: attemptsSpotlight,
            coop: coop,
        };

        const existingTeam = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();

        //if a team already exists in teams table then update it
        if (existingTeam) {
            // console.log(`Type of existingTeam.id: ${typeof existingTeam.indexid}`);
            await db.teams.update(existingTeam.indexid, teamData);
            //console.log('Team data updated successfully:', existingTeam.indexid);
            // alert('Team data updated successfully:', existingTeam.indexid);
        } else { //else create a new globalid for a new team and store
            let DateObj = new Date();
            const newglobalid = DateObj.getTime();
            await db.teams.add({...teamData, globalid: parseInt(newglobalid,10)});
            // console.log('New team added successfully:', teamname, teamnumber, newglobalid);
            // alert('New team added successfully:', teamname, teamnumber, newglobalid);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
}


//when the submit button is pressed get all the values on the page and submit them to the database
document.getElementById("teaminfoform").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const teamname = document.getElementById('teamname').value;
    const teamnumber = document.getElementById('teamnumber').value;
    const teamschool = document.getElementById('teamschool').value;
    const alliancescore = document.getElementById('alliancescore').value;
    const startingpos = document.getElementById('startingpos').value;
	  const moreinfo = document.getElementById('moreinfo').value;

    const Leaveszone = document.getElementById('Leaveszone').checked;
    const scores1amp = document.getElementById('scores1amp').checked;
    const scores1speaker = document.getElementById('scores1speaker').checked;

    const picksup = document.getElementById('picksup').checked;

    const scores2amp = document.getElementById('scores2amp').checked;
    const scores2speaker = document.getElementById('scores2speaker').checked;

    //need to handle if no radio button is selected
    const preferredScoringMethodElement = document.querySelector('input[name="score"]:checked');
    const preferredScoringMethod = preferredScoringMethodElement ? preferredScoringMethodElement.value : undefined;

    //need to handle if no radio button is selected
    const preferredIntakeMethodElement = document.querySelector('input[name="intake"]:checked');
    const preferredIntakeMethod = preferredIntakeMethodElement ? preferredIntakeMethodElement.value : undefined;

    const prefintake = document.getElementById('prefintake').value;
    
    const spotlight = document.getElementById('spotlight').checked;
    const trap = document.getElementById('trap').checked;
    const alone = document.getElementById('alone').checked;
    const hangsWithAnother = document.getElementById('hangsWithAnother').checked;
    const attemptsSpotlight = document.getElementById('attemptsSpotlight').checked;
    const coop = document.getElementById('coop').checked;

    const urlParams = new URLSearchParams(window.location.search);
    const globalid = parseInt(urlParams.get("globalid"),10);

    submitTeamData( teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop);    
    window.open("../index.HTML", "_self");
});

// Function to print all db teams to the console for debugging
async function printTeams() {
  try {
    // Use Dexie's toArray() to get all records from the teams table
    const allTeams = await db.teams.toArray();
    console.log("Teams:", allTeams);
  } catch (error) {
    console.error("Failed to print teams:", error);
  }
}

// Call the function to print teams
// printTeams();


/*  Description: ------------------------------------------------------------------------------------------------------ */

// This JavaScript code snippet is designed for a web application that utilizes Dexie.js, a wrapper for IndexedDB, to manage team data within a "Team Tracking App". The script initializes the database, defines its schema, and provides functionality to retrieve, display, and update team information based on user interaction through a web form. Below is a detailed breakdown of its functionality:
// Database Initialization and Schema Definition

//     Initializes a Dexie database named "Team Tracking App".
//     Defines a version (1) for the database with a single table named teams. This table includes fields for storing team details such as name, global ID, team number, school, alliance score, and various boolean flags and values representing team attributes and actions.

// Page Load Handling

//     Once the DOM content is fully loaded, the script attempts to retrieve team information based on a globalid obtained from the URL parameters.
//     If a matching team is found, their details are populated into corresponding form fields on the page, including text inputs and checkboxes.
//     For boolean attributes (e.g., Leaveszone, scores1amp), checkboxes are checked or unchecked based on the stored values.

// Team Data Submission

//     Defines an async function submitTeamData that constructs an object with the team's data from form inputs and checkbox states.
//     Attempts to find an existing team by globalid. If found, updates the existing record; if not, adds a new team record to the database.
//     Upon form submission, it prevents the default form submission behavior, collects data from the form, and calls submitTeamData with this data.

// Utility Functions

//     Implements a function to print all team records to the console, useful for debugging or administrative purposes.

// Event Listeners and Dynamic UI Updates

//     Attaches an event listener to the team information form to handle the submit event, collecting input values and checkbox states to update the database accordingly.
//     Correctly handles the scenario where no radio button may be selected for preferredScoringMethod and preferredIntakeMethod by checking if the element exists before trying to access its value.

// Error Handling

//     Throughout the database operations, try...catch blocks are used to catch and log any errors that may occur, ensuring robust error handling and feedback in the console.

// Notable Features and Considerations

//     The script dynamically interacts with IndexedDB through Dexie.js, showcasing how to perform CRUD operations in a structured and asynchronous manner.
//     It demonstrates handling of both scalar values (e.g., strings and numbers) and boolean states (e.g., from checkboxes) within a web form context, reflecting a real-world scenario of form-based data entry and persistence.
//     Includes careful handling of potentially undefined values for radio buttons, showcasing thoughtful error checking and dynamic content handling.

// This script exemplifies modern web development practices for working with client-side databases in a progressive web application, emphasizing asynchronous JavaScript, event-driven programming, and robust error handling.