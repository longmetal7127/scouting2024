// Define your Dexie database
const db = new Dexie("Team Tracking App");
db.version(16).stores({ 
    teams: "++indexid, globalid, clienttimestamp, teamname, teamnumber, teamschool, alliancescore, active, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
    matches: "++indexid, globalid, clienttimestamp, match, remoteid, active, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, otherinfo"
  });

async function dumpDB() {
    await db.open();
    const dbContentDiv = document.getElementById('dbContent');

    // Get table names from the Dexie db instance
    const tableNames = db.tables.map(table => table.name);

    for (const tableName of tableNames) {
        const table = db.table(tableName);
        const entries = await table.toArray();

        // Create a section for each table
        const tableSection = document.createElement('section');
        const tableHeader = document.createElement('h3');
        tableHeader.textContent = `Table: ${tableName}`;
        tableSection.appendChild(tableHeader);

        // Check if there are entries in the table
        if (entries.length > 0) {
            // Dynamically create a list based on entries
            const list = document.createElement('ul');
            entries.forEach(entry => {
                const item = document.createElement('li');
                const content = Object.keys(entry)
                    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                    .map(key => `${key}: ${entry[key]}`).join('<br>');
                //item.textContent = content;
                item.innerHTML = content; // Use innerHTML to interpret the <br> tags
                list.appendChild(item);
            });
            tableSection.appendChild(list);
        } else {
            const noDataMsg = document.createElement('p');
            noDataMsg.textContent = 'No data in this table.';
            tableSection.appendChild(noDataMsg);
        }

        dbContentDiv.appendChild(tableSection);
    }
}

document.addEventListener('DOMContentLoaded', dumpDB);

