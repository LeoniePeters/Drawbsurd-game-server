# :pencil2: Drawbsurd :art:
Sharing laughs and ridicule with your friends, even when you are far apart has never been this fun and creative!
This is not just a one-on-one game, but a real multi-player game.
Enter a new game, the first player's turn is to make a drawing that gives expression to the proposed frase*.
The other players can guess what is being drawn. These guesses are displayed to the first player.
Open your mind, be silly!

*Frases include insider jokes for coders and Codaisseur - the educational program we made this app for.

## [See the deployed version](https://drawbsurd.netlify.com)

### Check out the front-end repo [here](https://github.com/LeoniePeters/Drawbsurd-game-client)

## How it looks:  
![game view](https://github.com/LeoniePeters/Drawbsurd-game-client/blob/master/Drawbsurd-game-view.gif)

## Jump to:  
**[Used Technologies](#used-technologies)  
[Goals for this project](#goals-for-this-project)  
[User Stories](#user-stories)  
[Git workflow](#git-workflow)  
[Agile workflow and trello board](#agile-workflow-and-trello-board)**

## Used Technologies:

- **TypeScript**  
- **Koa**  
- **TypeORM**
- **Socket.IO**

## Goals for this project
This app was build for a Codaisseur Code Academy group project

- To practice websockets - in this case Socket.io
- To create something fun
- To practice working on a project in a team
- **[To showcase disciplined git usage](#my-git-workflow)**

## User Stories
- Users can sign up and login
- The Game can be played by more than one player on different devices and internet connections.
- The instrucional phrase for every game is picked randomly for every game.
- The player who draws gets a clean canvas and can pick different colors and sizes to draw with and can undo changes.
- The drawing can be seen by the other players as live as possible (every time a line is drawn it gets send to the other players).
- Guessing players can type in their guesses and send them to the drawing player.
- When a player guesses correctly the game ends and the display for all players is the final drawing, the submitted guess and the winner's name
- Finished games stay saved for the memory of the fun times spend.

## Git workflow
In this project I try to use:

- Good commit messages
- Well named branches
- Pull requests with summaries

If you have feedback to improve my git usage: **[please drop me a line!](https://www.linkedin.com/in/leonie-e-peters/)** 

## Agile workflow and trello board
We held daily stand-up meetings.
We created a Trello board with the lists:
- User stories
- Today's goals
- To do
- Done

## Drawbsurd Server

It has these endpoints:

* `POST /users`: sign up as new user
* `POST /logins`: log in and receive a JWT
* `POST /games`: create a new game
* `POST /games/:id/players`: join an existing game
* `PATCH /games/:id`: update an existing game
* `GET /games`: list all games
* `GET /users`: list all users
