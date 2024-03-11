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
db.version(1).stores({ teams: "++id, globalid, teamnumber, rank, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, trap"});
// what is "teams" referring to????

var submitmatchinfo = document.getElementById("submitmatchinfo");

// we don't need to load any info upon opening the page
/*document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid'), 10);

         // Use the globally initialized db instance
         const team = await db.teams.where('globalid').equals(parseInt(globalid,10)).first();
         if (team) {
         }
            
    } catch (error) {
        console.error("Error: ", error);
    }
}*/

submitmatchinfo.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // not sure if you can .value a span html element

    const matchnumber = document.getElementById("matchnumber").value;
    const rank = document.getElementById("rank").value;
    const teamnumber = document.getElementById("teamnumber").value;

    const count1 = document.getElementById("count1").value;
    const count2 = document.getElementById("count2").value;
    const count3 = document.getElementById("count3").value;
    const count4 = document.getElementById("count4").value;
    const count5 = document.getElementById("count5").value;
    const count6 = document.getElementById("count6").value;
    const count7 = document.getElementById("count7").value;

    const stage = document.getElementById("stage").checked;
    const hangs = document.getElementById("hangs").checked;
    const harmony = document.getElementById("harmony").checked;
    const trap = document.getElementById("trap").checked;

    try { // ????
        const teammatchdata = {
            teamnumber: teamnumber,
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
            trap: trap
        };
    }

    

}
