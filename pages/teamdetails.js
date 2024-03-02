document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const globalid = parseInt(urlParams.get('globalid'));
        
        const db = new Dexie("Team Tracking App");
        db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber" });

        const team = await db.teams.where('globalid').equals(globalid).first();
        if (team) {
            const teamNameElm = document.getElementById('teamname');
            teamNameElm.value = `${team.teamname}`;
            const teamNumElm = document.getElementById('teamnumber');
            teamNumElm.value = `${team.teamnumber}`;
        } else {
            console.log(`Team with ID ${globalid} not found.`);
        }
    } catch (error) {
        console.error("Error accessing database:", error);
    }
});

document.getElementById("teaminfoform").onsubmit = () => {    

    alert("Form information successfully submitted.");
    // why does it go to a new page (new query parameters) after pressing the submit button?
    //https://www.w3schools.com/tags/att_form_target.asp
    //https://www.w3schools.com/tags/att_form_action.asp

    //If you go to the index.js file, it is the line in the function that reads window.open(`pages/teamdetails.html?globalid=${globalid}`, "_blank");  you want to remove the ,"_blank" part
}