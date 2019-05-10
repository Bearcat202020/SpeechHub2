# WELCOME TO SPEECH HUB

## Dependencies:
1. MongoDB - https://docs.mongodb.com/manual/administration/install-community/
2. Express - https://expressjs.com/en/starter/installing.html
3. npm - https://docs.npmjs.com/cli/install

## How to run the program:
1. Download the code off of the repo
2. In a command prompt, go to the directory and type
`mongod --dbpath ~/data/db`
3. Then in a separate command prompt, go the directory and type
`npm start `
YOU SHOULD SEE THIS
![alt text](https://github.com/Bearcat202020/SpeechHub2/blob/master/Speech%20Website/Screenshot_1.jpg)

## Files and their descriptions
### since there are like 1000 files from Auth0/express I'm only doing important ones
1. app.js - main page for the website, contains all the requires, authentication, and the create/read functions
2. users.js - manages the log in, handles the post that writes user emails into JSON
3. auth.js - manages authentication for users as they log in, keeps information secure and communicates with Auth0
4. index.js - redirects links to the correct pug pages using get requests
5. navbar.pug - the pug page for the default navbar and style extended into each page
6. feedback.pug - this is the pug page that allows you to input all the information for the create
7. ballots.pug - this is the pug page that allows you to view all the ballots once the page is rendered
8. error, faulure, index practices, profile, user - these are just the rest of the pug pages, there's nothing really special about these b/c they're mostly html just converted to pug
