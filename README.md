# Student-performance-tracking

Student Performance Tracking Application is a web application that allows teachers and students to track their performance

The Application allow the users to login to the application and the users are the teachers and the students. Teachers can see the marks and information about students and Post marks for their class Students. Students are not allowed to post Marks.
The passwords are encrypted using brcypt and the application is using the JWT for the authentication of the users.
The application has the data visualization of the student performance using the chart.js library particularly the Radar and the doughnut chart.

## Examples
All the examples are in the `/screenshots` directory in the root directory of the project

## The application has the following features:
1. Login
2. Register
3. Student Dashboard
4. Teacher Dashboard
7. Student Performance Analysis
8. Role Based Authentication (using JWT)

## The Application using the following technologies:
1. NextJS 13 App (react 18.2.0)
2. TailwindCSS 3.2.7
3. MySQL 8.0.26
4. Chart.js 4.2.1
5. typescript 4.9.5
6. react-chartjs-2 3.1.0

## Getting Started

To Run the application locally, you need to have the following installed on your machine:

1. NodeJS
2. npm or yarn
3. MySQL

## NodeJS
you can download the latest version of NodeJS from [here](https://nodejs.org/en/download/)

## MySQL
you can download the latest version of MySQL from [here](https://dev.mysql.com/downloads/mysql/)


## Installation

1. Clone the repository

```bash
git clone https://github.com/lakshmanshankarc/student-performance-tracking.git
```

2. Install the dependencies

```bash
cd student-performance-tracking
npm install
```

3. Create a database in MySQL

All the SQL queries are in the `/sql/college.sql` file in the root directory of the project To successfully run the application, you need to create a database in MySQL and run the queries in the `/sql/college.sql` file in the root directory of the project

```bash
mysql -u root -p
```

```bash
#$ mysql>  in the sql shell you need to source the sql file
source /path/to/sql/college.sql

#example
#source /home/user/project/student-performance-tracking/sql/college.sql
```

4. Create a `.env` file in the root directory of the project and add the following

```bash
touch .env
```

You can refer to the `.env.example` file in the root directory of the project

For JWT_SECRET, you can run the below code in node repl

```sh 
node
```

```bash
crypto.randomBytes(64).toString('hex')
```
Dont Add the `"Quotes"` in the .env JWT_SECRET

5. Run the application

```bash
npm run dev
```

This will start the application in development mode and you can access the application in the browser at `http://localhost:3000`

## Author

- [@lakshmanshankarc](https://www.github.com/lakshmanshankarc)


