\# Student Management REST API



A RESTful Student Management API built using Node.js, Express.js, PostgreSQL, and Prisma ORM.



\## Features



\- Create a student

\- Get all students

\- Get a student by ID

\- Update student details

\- Delete a student

\- Email uniqueness validation

\- Input validation

\- Proper HTTP status codes

\- PostgreSQL database integration

\- Prisma ORM for database operations

\- Centralized error handling



\## Technologies Used



\- Node.js

\- Express.js

\- PostgreSQL

\- Prisma ORM

\- JavaScript

\- REST API



\## Project Structure



```text

student-api/

│

├── prisma/

│   ├── migrations/

│   └── schema.prisma

│

├── src/

│   ├── controllers/

│   │   └── studentController.js

│   ├── middleware/

│   │   └── errorHandler.js

│   ├── routes/

│   │   └── studentRoutes.js

│   ├── prisma.js

│   └── server.js

│

├── .env

├── .gitignore

├── package.json

├── package-lock.json

└── prisma7.config.ts

