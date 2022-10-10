# Project The First by nintaydo

Welcome to my news API, a one stop shop for all your news needs!

Please follow the simple instructions below to get started.

## Cloning the repository

cloning the repository from GitHub will be your first step.

copy the url https://github.com/nintaydo/project_the_first

Open a terminal in the location you wish to clone the repo to, then type this command and hit the return key.

```sh
git clone https://github.com/nintaydo/project_the_first
```
You will want to then enter your new repo by entering this command and pressing the return key.

```sh
cd project_the_first
```

Once inside you can enter this command and the return key to install the necessary packages.

```sh
npm install
```

You did it, Well done!

## Creating .env files

You will need to create two .env files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these .env files are .gitignored.

