
// BUTTONS ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
const countElement1 = document.getElementById('count1');
const minusBtn1 = document.getElementById('minusBtn1');
const plusBtn1 = document.getElementById('plusBtn1');
let count1 = 0;

function updateCounter1(value) {
    count1 += value;
    countElement1.textContent = count1;
}

minusBtn1.addEventListener('click', function() {
    if (count1 > 0) {
        updateCounter1(-1);
    } // can't be negative
});

plusBtn1.addEventListener('click', function() {
    updateCounter1(1);
});


const countElement2 = document.getElementById('count2');
const minusBtn2 = document.getElementById('minusBtn2');
const plusBtn2 = document.getElementById('plusBtn2');
let count2 = 0;

function updateCounter2(value) {
    count2 += value;
    countElement2.textContent = count2;
}

minusBtn2.addEventListener('click', function() {
    if (count2 > 0) {
        updateCounter2(-1);
    }
    
});

plusBtn2.addEventListener('click', function() {
    updateCounter2(1);
});

const countElement3 = document.getElementById('count3');
const minusBtn3 = document.getElementById('minusBtn3');
const plusBtn3 = document.getElementById('plusBtn3');
let count3 = 0;
function updateCounter3(value) {
    count3 += value;
    countElement3.textContent = count3;
}

minusBtn3.addEventListener('click', function() {
    if (count3 > 0) {
        updateCounter3(-1);
    }
});

plusBtn3.addEventListener('click', function() {
    updateCounter3(1);
});

const countElement4 = document.getElementById('count4');
const minusBtn4 = document.getElementById('minusBtn4');
const plusBtn4 = document.getElementById('plusBtn4');
let count4 = 0;
function updateCounter4(value) {
    count4 += value;
    countElement4.textContent = count4;
}

minusBtn4.addEventListener('click', function() {
    if (count4 > 0) {
        updateCounter4(-1);
    }
});

plusBtn4.addEventListener('click', function() {
    updateCounter4(1);
});

const countElement5 = document.getElementById('count5');
const minusBtn5 = document.getElementById('minusBtn5');
const plusBtn5 = document.getElementById('plusBtn5');
let count5 = 0;
function updateCounter5(value) {
    count5 += value;
    countElement5.textContent = count5;
}

minusBtn5.addEventListener('click', function() {
    if (count5 > 0) {
        updateCounter5(-1);
    }
});

plusBtn5.addEventListener('click', function() {
    updateCounter5(1);
});

const countElement6 = document.getElementById('count6');
const minusBtn6 = document.getElementById('minusBtn6');
const plusBtn6 = document.getElementById('plusBtn6');
let count6 = 0;
function updateCounter6(value) {
    count6 += value;
    countElement6.textContent = count6;
}

minusBtn6.addEventListener('click', function() {
    if (count6 > 0) {
        updateCounter6(-1);
    }
});

plusBtn6.addEventListener('click', function() {
    updateCounter6(1);
});
const countElement7 = document.getElementById('count7');
const minusBtn7 = document.getElementById('minusBtn7');
const plusBtn7 = document.getElementById('plusBtn7');
let count7 = 0;
function updateCounter7(value) {
    count7 += value;
    countElement7.textContent = count7;
}

minusBtn7.addEventListener('click', function() {
    if (count7 > 0) {
        updateCounter7(-1);
    }
});

plusBtn7.addEventListener('click', function() {
    updateCounter7(1);
});
});


// DATABASE ---------------------------------------------------------------

const db = new Dexie("Team Tracking App");

db.version(17).stores({ 
    teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
    matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap, otherinfo"
  });

    // Version numbers must be changed whenever database objects (schema) are edited? See "Modify Schema" in https://dexie.org/docs/Tutorial/Understanding-the-basics
    // db = database
    // teams = table in database db


const urlParams = new URLSearchParams(window.location.search);
const globalid = parseInt(urlParams.get('globalid'), 10);
const thismatch = urlParams.get('matchnumber');

document.addEventListener('DOMContentLoaded', async () => {
    
    //Use the globally initialized db instance
    const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();

    const teamnameElm = document.getElementById("teamname");
    teamnameElm.innerHTML = team.teamname || '';
    const teamnumberElm = document.getElementById("teamnumber");
    teamnumberElm.innerHTML = team.teamnumber || '';

    if (urlParams.has('globalid') && urlParams.has('matchnumber')) {
        try {      
            
            const match = await db.matches.where('matchnumber').equals(thismatch).and(match => match.globalid === parseInt(globalid, 10)).first();

            if(match) { // if match exists, AKA accessing it from match summary page after creation of match
                //text values
                const matchnumberElm = document.getElementById("matchnumber");
                matchnumberElm.value = match.matchnumber || '';
                const rankElm = document.getElementById("rank");
                rankElm.value = match.rank || '';


                const count1Elm = document.getElementById("count1");
                count1Elm.innerHTML = match.count1 || ''; // since the counts are span elements, use innerHTML?
                const count2Elm = document.getElementById("count2");
                count2Elm.innerHTML = match.count2 || '';
                const count3Elm = document.getElementById("count3");
                count3Elm.innerHTML = match.count3 || '';
                const count4Elm = document.getElementById("count4");
                count4Elm.innerHTML = match.count4 || '';
                const count5Elm = document.getElementById("count5");
                count5Elm.innerHTML = match.count5 || '';
                const count6Elm = document.getElementById("count6");
                count6Elm.innerHTML = match.count6 || '';
                const count7Elm = document.getElementById("count7");
                count7Elm.innerHTML = match.count7 || '';
            
                //checkbox values - checked
                const stageElm = document.getElementById("stage");
                stageElm.checked = match.stage || false;
                const hangsElm = document.getElementById("hangs");
                hangsElm.checked = match.hangs || false;
                const harmonyElm = document.getElementById("harmony");
                harmonyElm.checked = match.harmony || false;
                const trapElm = document.getElementById("trap");
                trapElm.checked = match.trap || false;

                //also text value
                const otherinfoElm = document.getElementById("otherinfo");
                otherinfoElm.value = match.otherinfo || '';
            } else {
                console.log(`Match ${matchnumber} not found`);
            }
            
        } catch (error) {
            console.error("Error accessing database:", error);
        }
    }
});

//insert/update match data
async function submitMatchData(rank, teamnumber, globalid, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap, otherinfo ) {

    try {
        let clienttimestamp = moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
        //has to have a comma even after the last element
        const teammatchdata = {
            rank: rank,            
            globalid: globalid,
            matchnumber: matchnumber,

            count1: count1,
            count2: count2,
            count3: count3,
            count4: count4,
            count5: count5,
            count6: count6,
            count7: count7,

            stage: stage,
            hangs: hangs,
            harmony: harmony,
            trap: trap,
            otherinfo: otherinfo,
        };

        //Joy - you were on the right track here - but there can be multiple teams in the same match?  Or do they each get their own match number?
        // Yep, I had about the same realization earlier today (that there are duplicate match numbers granted that there are 6 teams per match) but wasn't sure how to implement it. Thank you so much for correcting it!!
        const existingMatch = await db.matches.where('matchnumber').equals(matchnumber).and(match => match.globalid === parseInt(globalid, 10)).first();

        //if the team already exists then add match information
        if (existingMatch) {
            existingMatch.rank = rank;
            existingMatch.teamnumber = teamnumber;
            existingMatch.count1 = count1;
            existingMatch.count2 = count2;
            existingMatch.count3 = count3;
            existingMatch.count4 = count4;
            existingMatch.count5 = count5;
            existingMatch.count6 = count6;
            existingMatch.count7 = count7;
            existingMatch.stage = stage;
            existingMatch.hangs = hangs;
            existingMatch.harmony = harmony;
            existingMatch.trap = trap;
            existingMatch.otherinfo = otherinfo;
        
            await db.matches
                .where('matchnumber')
                .equals(matchnumber)
                .and(match => match.globalid === parseInt(globalid, 10))
                .modify(existingMatch);
            
            console.log('Team data updated successfully:', existingMatch.teamnumber);
            alert('Team data updated successfully:', existingMatch.teamnumber);
        } else { //else create new match for the team and store????
            console.log("Match does not exist for this team: creating it");
            await db.matches.add({...teammatchdata, globalid: parseInt(globalid,10)});
            console.log('Match info added successfully:', teamnumber, globalid);
            alert('Match info added successfully:', teamnumber, globalid);            
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
}

document.getElementById("submitmatchinfo").addEventListener('click', function(event){
    // Make sure not to initialize the script before the button, or else there will be no communication

    event.preventDefault();     
    // not sure if you can .value a span html element

    // match data:
    const matchnumber = document.getElementById("matchnumber").value;
    const rank = document.getElementById("rank").value;
    const teamnumber = document.getElementById("teamnumber").value;

    const count1 = document.getElementById("count1").innerHTML;
    const count2 = document.getElementById("count2").innerHTML;
    const count3 = document.getElementById("count3").innerHTML;
    const count4 = document.getElementById("count4").innerHTML;
    const count5 = document.getElementById("count5").innerHTML;
    const count6 = document.getElementById("count6").innerHTML;
    const count7 = document.getElementById("count7").innerHTML;

    const stage = document.getElementById("stage").checked;
    const hangs = document.getElementById("hangs").checked;
    const harmony = document.getElementById("harmony").checked;
    const trap = document.getElementById("trap").checked;
    const otherinfo = document.getElementById("otherinfo").value;

    // submitting data:

    submitMatchData(rank, teamnumber, globalid, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap, otherinfo);
    //alert("Match info submitted!");
});

// Function to print all db matches to the console for debugging, BROKEN
/*async function printMatches() {
    try {
        // Use Dexie's toArray() to get all records from the teams table
        const allMatches = await db.teams.toArray();
        console.log("Matches", allMatches);
    } catch (error) {
        console.error("Failed to print matches:", error);
    }
}*/