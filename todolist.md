things that need to be completed asap (in no particular order)

1. making sure the match info page can actually communicate with the database and submit info
    a. should we make team number a required field to fill out in the team details page? if so:
    b. the form element for team number should already be filled out on the match info page (but if not then no biggie, scouts can fill that in...???)

2. remove that weird submit button that is on the navigation bar on main page (team list) 

3. connect a team from its unique team details page to its unique match summary page
    a. use globalid & accessing database to fill out the team name (textcontent = "string" ???) h2 element 
    b. figure out how to calculate averages (a MUCH later task) and display it 
    c. display matches, almost exactly how teams are displayed 
        - match summary is analogous to team list
        - each match is analogous to a team on the list
        - clicking on a match (opening match info page??) is like opening up team details for a team
        - therefore isn't the code very similar? (except, teams page adds teams such that the newest team is on top; matchs should be ordered the other way, so bigger match number = lower down on list)
    d. search function: not necessary? how many matches does a team do??

4. sync across multiple devices
    a. how will connecting to the internet at competitions work? cellular?

5. clean up appearances (css), neaten code if possible/necessary, resolve any errors/bugs

6. (maybe very last thing we consider) review code, season-specific variable names (i.e. speaker, amp scoring) and add appropriate notes to reskinning-instructions.md about how to change the code next year to adapt

7. hopefully done :D ?
    