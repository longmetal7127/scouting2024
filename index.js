const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo" });

const form = document.querySelector("#new-team-form");
const input = document.querySelector("#new-team-input");
const list_el = document.querySelector("#teams");

//add team
form.onsubmit = async (event) => {
  event.preventDefault();
  const todo = input.value;
  await db.todos.add({ todo });
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
	<div class="actions">
	<button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
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