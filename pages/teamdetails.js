document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Dexie database
  const db = new Dexie("Team Tracking App");
  db.version(1).stores({
     teams: "++id, teamname, globalid" 
  });

  // Retrieve data from IndexedDB and fill the textbox if it exists
  const existingData = await db.teams.get(1); // Assuming you have only one record
  if (existingData && existingData.todo) {
      document.getElementById('teamname').value = existingData.teamname;
  }

  // Event listener for submit button
  document.getElementById('submitButton').addEventListener('click', async () => { 
      const newData = document.getElementById('teamname').value;

      // Save or update data in IndexedDB
      if (existingData) {
          await db.teams.update(1, { teamname: newData });
      } else {
          await db.teams.add({ teamname: newData });
      }

      alert('Data saved successfully!');
  });
});