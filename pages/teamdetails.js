document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Dexie database
    const db = new Dexie("Todo App");
    db.version(1).stores({
        todos: '++id, todo, globalid'
    });

    // Retrieve data from IndexedDB and fill the textbox if it exists
    const existingData = await db.todos.get(1); // Assuming you have only one record
    if (existingData && existingData.todo) {
        document.getElementById('teamname').value = existingData.todo;
    }

    // Event listener for submit button
    document.getElementById('submitButton').addEventListener('click', async () => {
        const newData = document.getElementById('teamname').value;

        // Save or update data in IndexedDB
        if (existingData) {
            await db.todos.update(1, { todo: newData });
        } else {
            await db.todos.add({ todo: newData });
        }

        alert('Data saved successfully!');
    });
});