const db = new Dexie("Team Tracking App");
//trap was in there twice throwing errors so I removed the last one of them (2nd to last entry)

db.version(15).stores({ 
  teams: "++indexid, localtimestamp, remotetimestamp, teamname, globalid, teamnumber, teamschool, alliancescore, active", 
  preferences: "++indexid, globalid, match, moreinfo, startingpos, Leaveszone, scores1amp, scores1speaker, picksup, scores2amp, scores2speaker, preferredScoringMethod, preferredIntakeMethod, prefintake, spotlight, trap, alone, hangsWithAnother, attemptsSpotlight, coop",
  matches: "++indexid, globalid, match, remoteid, active,localtimestamp, remotetimestamp, rank, matchnumber, count1, count2, count3, count4, count5, count6, count7, stage, hangs, harmony, otherinfo"
});

// Assuming 'db' is your Dexie database instance
const dbName = db.name; // Get the name of the database you want to delete

Dexie.delete(dbName).then(() => {
  console.log('Database deleted successfully');
}).catch((err) => {
  console.error('Could not delete database:', err);
});