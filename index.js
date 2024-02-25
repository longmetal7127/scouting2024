const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo, globalid" });

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const todo = input.value;
  let DateObj = new Date();
  const globalid = DateObj.getTime();
  await db.todos.add({ todo, globalid });
  await getTodos();
  form.reset();
};

const newTodo = (todo) => {
  const container = document.createElement("div");
  container.classList.add("team");

  const content = document.createElement("div");
  content.classList.add("content");
  container.append(content);
  const input = Object.assign(document.createElement("input"), {className: "text", value: todo.todo});
  input.setAttribute("id", "edit");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("type", "text");

  content.append(input);

  const actions = Object.assign(document.createElement("div"), {className: "actions"});
  container.append(actions);

  const id = Object.assign(document.createElement("span"), {
    innerText: todo.globalid
  });
  actions.append(id);

  const deleteButton = Object.assign(document.createElement("button"), {className: "delete", innerText: "Delete"});
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e, todo.id);
  });
  const editButton = Object.assign(document.createElement("button"), {className: "edit", innerText: "Edit"});
  editButton.addEventListener("click", (e) => {
    editTeam(todo.globalid);
  });
  actions.append(deleteButton, editButton);
  return container;
};
//display team
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  
  list_el.replaceChildren(...allTodos.map((todo) => newTodo(todo)));
};
window.addEventListener("load", getTodos);

//delete todo
const deleteTodo = async (event, id) => {
  await db.todos.delete(id);
  await getTodos();
};

function editTeam(globalid) {
  window.open(`pages/teamdetails.html?globalid=${globalid}`, "_blank");
}
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
