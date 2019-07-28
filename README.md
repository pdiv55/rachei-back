# Rachei

**Rachei is a projet proudly designed by Ironhack SP students. Rachei is the sleekest and most practical way to split bills with your friends. Create your groups to share and follow your crew's expenses in real-time. Get insight, at any given moment, on how to balance all the group's expenses. Create your personal wallet and manage your pocket-money easily by paying your debts and reminding your friends of theirs.** 
  **To discover the platform just follow** <a href="www.rachei.herokuapp.com"><strong>this link</strong></a>


**_Attention: this is the repo for the back part of the app, please make sure you also visit the repo with the front-end code_** <a href="https://github.com/pdiv55/rachei-front">**_here_**</a>


## Contribute
Rachei is the product of a lot of teamwork from a group of junior coders, all pull requests are welcome !

To start :
- Fork this repo
- Clone this repo

When you're done, enter on your console:
- git add .
- git commit -m "[ comment your code ]"
- git push origin master

Then create a Pull Request to suggest any optimizations to the team.
Thanks!


## Setup
Rachei's _back_ engine is built with NodeJS, Mongoose and ExpressJS.
The website was deployed with Heroku.

The following dependencies must be installed :
- bcrypt (v. 3.0.6),
- body-parser (v. 1.19.0),
- connect-mongo (v. 3.0.0),
- cookie-parser (v. 1.4.4),
- cookie-session (v. 1.3.3),
- cors (v. 2.8.5),
- debug (v. 2.6.9),
- dotenv (v. 8.0.0),
- express (v. 4.16.1),
- express-session (v. 1.16.2),
- http-errors (v. 1.6.3),
- mongoose (v. 5.6.2),
- morgan (v. 1.9.1),
- passport (v. 0.4.0),
- passport-local (v. 1.0.0)


## Route-Tree

_Auth ("/auth/....")_ <br>
"/signup"  ---> to create a new user <br>
"/login"  ---> for passport user authentication <br>
"/refresh"  ---> to keep the user loggedin <br>
"/logout" <br>

_Users ("/users/....")_ <br>
"/" ---> read all users <br>
"/group/:id" ---> read all users from a group <br>
"/:id" ---> read a specific user with its id <br>
"/update/:id" ---> update an user with its id <br>

_Expenses ("/expenses/....")_  <br>
"/create" ---> create an expense <br>
"/group/:id" ---> read all expenses of a group with its id <br>
"/user/" ---> read all expenses of the loggedin user <br>
"/:id" --->  read a specific expense with its id <br>
"/update/:id" ---> update an expense with its id <br>
"/delete/:id" ---> delete an expense with its id <br>

_Groups ("/groups/....")_ <br>
"/create" ---> create a group <br>
"/user/" ---> read all groups of the loggedin user <br>
"/:id" --->  read a specific group with its id <br>
"/update/:id" ---> update a group with its id <br>
"/delete/:id" ---> delete a group with its id <br>

_Files ("/files/....")_ <br>
"/upload/user/:id" ---> upload and attach file to a user with its id <br>
"/upload/expense/:id" ---> upload and attach file to an expense with its id <br>

_Passwords_ <br>
"/forgot/:email" ---> to send a recovery email for a lost password <br>
"/reset/:token" ---> to reset password <br>


## Authors
Marcelo Oliveira - @marbmo <br>
Paul Divet - @pdiv55 <br>
Fred Conti - @fredericonti <br>
José Luiz Coe - @joseluizcoe <br>
Gabriel Sicuto - @gsicuto
