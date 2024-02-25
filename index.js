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
  const input = document.createElement("input");
  input.setAttribute("id", "edit");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("type", "text");

  input.classList.add("text");
  input.value = todo.todo;
  content.append(input);
  const actions = document.createElement("div");
  actions.classList.add("actions");
  container.append(actions);
  const id = document.createElement("span");
  id.innerText = todo.globalid;
  actions.append(id);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e, todo.id);
  });
  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerText = "Edit";
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
