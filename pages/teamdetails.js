// Global Dexie database initialization
const db = new Dexie("Team Tracking App");
db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop" });

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid'), 10);
        
         // Use the globally initialized db instance
         const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
         if (team) {
             const teamNameElm = document.getElementById('teamname');
             teamNameElm.value = team.teamname;
             const teamNumElm = document.getElementById('teamnumber');
             teamNumElm.value = team.teamnumber;
             const teamSchoolElm = document.getElementById('teamschool');
             teamSchoolElm.value = team.teamschool;
             const allianceScoreElm = document.getElementById('alliancescore');
             allianceScoreElm.value = team.alliancescore;
             const moreInfoElm = document.getElementById('moreinfo');
             moreInfoElm.value = team.moreinfo;
             const startingPosElm = document.getElementById('startingpos');
             startingPosElm.value = team.startingpos;
             
             const LeavesZone = document.getElementById('Leaveszone');
             LeavesZone.checked = team.Leaveszone;
             const scores1Amp = document.getElementById('scores1amp');
             scores1Amp.checked = team.scores1amp;
             const scores1Speaker = document.getElementById('scores1speaker');
             scores1Speaker.checked = team.scores1speaker;

             const picksUp = document.getElementById('picksup');
             picksUp.checked = team.picksup;

             const scores2Amp = document.getElementById('scores2amp');
             scores2Amp.checked = team.scores2amp;
             const scores2SpeakerElm = document.getElementById('scores2speaker');
             scores2SpeakerElm.checked = team.scores2speaker;

             const amp = document.getElementById('Leaveszone');
             amp.checked = team.amp;
             const speaker = document.getElementById('scores1amp');
             speaker.checked = team.speaker;
             const scoreEither = document.getElementById('scores1speaker');
             scores1SpeascoreEitherker.checked = team.scoreEither;

             const ground = document.getElementById('ground');
             ground.checked = team.ground;
             const human = document.getElementById('human');
             human.checked = team.human;
             const either = document.getElementById('either');
             either.checked = team.either;

             const prefintake = document.getElementById('prefintake');
             prefintake.value = team.prefintake;

             const spotlight = document.getElementById('spotlight');
             spotlight.checked = team.spotlight;
             const trap = document.getElementById('trap');
             trap.checked = team.trap;
             const alone = document.getElementById('alone');
             alone.checked = team.alone;
             const hangsWithAnother = document.getElementById('hangsWithAnother');
             hangsWithAnother.checked = team.hangsWithAnother;

             const attemptsSpotlight = document.getElementById('attemptsSpotlight');
             attemptsSpotlight.checked = team.attemptsSpotlight;
             const coop = document.getElementById('coop');
             coop.checked = team.coop;
             
         } else {
             console.log(`Team with ID ${globalid} not found.`);
         }
     } catch (error) {
         console.error("Error accessing database:", error);
     }
});

async function submitTeamData( teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop ) {
    try {
        const teamData = { 
            teamname: teamname, 
            globalid: globalid,
            teamnumber: teamnumber, 
            teamschool: teamschool,
            alliancescore: alliancescore,

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
            coop: coop
        };

        const existingTeam = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();

        if (existingTeam) {
            await db.teams.update(existingTeam.id, teamData);
            console.log('Team data updated successfully:', existingTeam.id);
            alert('Team data updated successfully:', existingTeam.id);
        } else {
            let DateObj = new Date();
            const globalid = DateObj.getTime();
            await db.teams.add({...teamData, globalid: parseInt(globalid,10)});
            console.log('New team added successfully:', teamname, teamnumber, globalid);
            alert('New team added successfully:', teamname, teamnumber, globalid);
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
    const preferredIntakeMethodElement = document.querySelector('input[name="score"]:checked');
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
    
});

// Function to print all teams to the console
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
printTeams();