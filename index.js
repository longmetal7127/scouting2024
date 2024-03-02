// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//       caches.match(event.request)
//           .then(function(response) {
//               // Cache hit - return response
//               if (response) {
//                   return response;
//               }

//               // IMPORTANT: Clone the request. A request is a stream and
//               // can only be consumed once. Since we are consuming this
//               // once by cache and once by the browser for fetch, we need
//               // to clone the response.
//               var fetchRequest = event.request.clone();

//               return fetch(fetchRequest).then(
//                   function(response) {
//                       // Check if we received a valid response
//                       if(!response || response.status !== 200 || response.type !== 'basic') {
//                           return response;
//                       }

//                       // IMPORTANT: Clone the response. A response is a stream
//                       // and because we want the browser to consume the response
//                       // as well as the cache consuming the response, we need
//                       // to clone it so we have two streams.
//                       var responseToCache = response.clone();

//                       caches.open(CACHE_NAME)
//                           .then(function(cache) {
//                               cache.put(event.request, responseToCache);
//                           });

//                       return response;
//                   }
//               );
//           })
//           .catch(function() {
//               // If both the network and cache fail, show a generic fallback:
//               return caches.match('/fallback.html');
//               // Alternatively, you could return a custom error response here
//           })
//   );
// });

const db = new Dexie("Team Tracking App");
db.version(1).stores({ teams: "++id, teamname, globalid, teamnumber, teamschool, alliancescore, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop" });

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

