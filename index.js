const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo, globalid" });

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const todo = input.value;
  const globalid = Date.UTC();
  await db.todos.add({ todo , globalid });
  await getTodos();
  form.reset();
};

//display team
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  list_el.innerHTML = allTodos
    .map(
      (todo) => `
	
	<div class="team">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${todo.todo}>
  </div>
  <div>
  ${todo.globalid}
	</div>
	<div class="actions">
	<button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
  <button class="edit" onclick="window.open(pages/teamdetails.html, "_blank");">Edit</button>
	</div>
	</div>
	`
    )
    .join("");
};
window.onload = getTodos;

//delete todo
const deleteTodo = async (event, id) => {
  await db.todos.delete(id);
  await getTodos();
};

// CHATGPT CODE TO CONNECT TO MYSQL SERVER

// function saveTeam(teamName) {
//   db.teams.add({ name: teamName }).then(() => {
//       syncTeamWithServer(teamName);
//   });
// }

// function syncTeamWithServer(teamName) {
//   fetch('/sync', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ teamName: teamName })
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Failed to sync data');
//       }
//       return response.json();
//   })
//   .catch(error => {
//       console.error(error);
//   });
// }
