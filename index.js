const db = new Dexie("Team Tracking App");
db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber, teamschool, alliancescore, startingpos, leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, otherIntakeInfo, stageAbilities, favorsCoopertition" });

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const teamname = input.value;
  let DateObj = new Date();
  const globalid = DateObj.getTime();
  await db.teams.add({ teamname , globalid });
  await getTeams();
  form.reset();
};

//display team
const getTeams = async () => {
  const allTeams = await db.teams.reverse().toArray();
  list_el.innerHTML = allTeams
    .map(
      (teams) => `
	
	<div class="team">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${teams.teamname}>
  </div>  
	<div class="actions">
  <div>${teams.globalid}</div>
	<button class="delete" onclick="deleteTeams(event, ${teams.id})">Delete</button>
  <button class="edit" onclick="editTeam(${teams.globalid})">Edit</button>
	</div>
	</div>
	`
    )
    .join("");
};
window.onload = getTeams;

//delete team
const deleteTeams = async (event, id) => {
  await db.teams.delete(id);
  await getTeams();
};

function editTeam(globalid) {
  window.open(`pages/teamdetails.html?globalid=${globalid}`, "_self");  //well, it defaults to new page so we will try _self
}

