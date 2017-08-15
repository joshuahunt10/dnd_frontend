# Final Project: Dungeons and Dragons Character and Table Manager
Currently under development

## Scope
This app is a full stack application using Node.js with Express and a postgreSQL server on the backend and React on the frontend.  The app has a registration and a login for users.  The user is able to see tables they are apart of.  If the user has "DM" privelages they can see all the character sheets for everyone at the table.  If the user is a "player" they will see their current character sheet for the table.  A user can be apart of many tables with their sheet saved to the individual table.  There is also a character creator section that pulls from the DnD API.

## To Do (v1 08/15)
* ~~Initial setup of Node.js environment~~
* ~~Initial ReactApp environment setup~~
* ~~Initial SQL database setup.~~
* ~~SQL database linked to Node.js to serve up a json~~
* ~~Initial setup of fetch from backend to client side and displaying~~
* Think through and white paper the initial schema for the DB
* Implement the migration for the proposed final DB schema
* Populate the DB with dummy data
* Create user registration
* Create user login with authentication
* Figure out how to set a session with the user.  Possibly using SQL for persistence
* Setup fetch to the DnD API using Node.js
* Create the character creation form using DnD API contents. This will be a dumb page, does not have logic for rules of the game.
* Get the character sheet to store
* Create tables for users
* Setup privelages for the tables.
* Work on the styling of everything
