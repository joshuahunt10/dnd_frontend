# Final Project: Dungeons and Dragons Character and Table Manager
Currently under development

## Scope
This app is a full stack application using Node.js with Express and a postgreSQL server on the backend and React on the frontend.  The app has a registration and a login for users.  The user is able to see tables they are apart of.  If the user has "DM" privelages they can see all the character sheets for everyone at the table.  If the user is a "player" they will see their current character sheet for the table.  A user can be apart of many tables with their sheet saved to the individual table.  There is also a character creator section that pulls from the DnD API.

## Technical Achievements
* Created a fully supported backend for the application with a PostgreSQL database.
* Created a dynamic character creation sheet that is then saved in the database
* Added the ability to require rolls from specific players, this was achieved by polling the database for changes and updating the state with it.  The updates triggered UI changes for the user.
* Created admin views for specific games depending on the players role in that game
* Pulled in data from a public API and displayed it to the user based on user selections
