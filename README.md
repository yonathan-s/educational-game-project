# Educational-Game-Project

## Focuses 
### Problem statement 
The management team of the Hive group of secondary schools has noticed a lack of engagement in non-STEM subjects over the last two years. They would like to try and reverse this trend and have asked an external team to come up with a solution that places student enjoyment at the heart of the learning experience.

### Solution 
A Historical Escape game that incorporates the learning of non-STEM subjects (Specifically History) by placing students within a period of history and having them answer questions around that time period to ESCAPE.  

## Concept 
### A Historical Escape Game 
 - Which incorporates different times within history. 
 - A bank of questions which will be gamified for the students learning 
 - A history game where the users will answer questions to escape certain parts of historical events would be the main MVP fr the project. 
 - The other subjects may be apart of the other future features

### Features
  - A points system that would allow students to escape that period of history by answering crucial questions according to the curriculum.
  - A table for each level and content within it. A student must cross a threshold of points within each table to escape. 
  - A script for each level that would engage students - in case of failure the character dies or something. 

### MVP 
  - Our MVP will be a short story based game that allows students to travel through history by answering related questions before the timer runs out 
   - Instead of a standard answer questions to get points we want it to be answer questions to escape history.

#### Spanish Armada  
  - Stage 1: The Castle Courtyard
   - Answer core history questions to map out Norman vulnerabilities.
  - Stage 2: The Great Hall (The Investigation) 
   - Use your knowledge to solve a tactical challenge. 
  - Stage 3: The Keep (Escape) 
   - Reach the required score by explaining how the Harrying of the North crushed Anglo-Saxon resistance, using the distraction to slip past the gatehouse
This would be enough for our MVP A small piece of history for students to navigate. 


## Stakeholder Analysis

<img src="img/image.png" alt="Stakeholder analysis" width="500">

Hive/CEO: They commissioned the project and want to improve engagement in non-STEM subjects, so they have a strong interest in the outcome and influence over whether the solution meets the schools' needs.

Teachers: Teachers are directly affected by low student engagement and knowledge retention. They would also play an important role in encouraging students to use the game and determining whether it is educationally useful.

Students: Students are the main users of the game, so their enjoyment and experience are extremely important. However, they have less influence over decisions about which educational tools the school adopts.

Parents: Parents are interested because they want their children to enjoy learning and not feel overwhelmed, but they have less direct influence over the design or implementation of the game within school.


## Solution Analysis



## Risk analysis

<img src="img/risk.png" alt="Risk analysis diagram" width="900">



### User Stories


### Wireframes

Wireframes were created before development to plan the layout and user journey of the application.

<img src="img/wireframe.png" alt="Wireframes" width="900">



## High-Level Solution

Our application consists of a frontend, backend API and SQL database.

The frontend allows the user to interact with the game and communicates with the backend through HTTP requests.

The backend was created using Node.js and Express and is responsible for handling application logic, authentication and communication with the database.


<img src="img/solution-diagram.png" alt="High level solution diagram" width="900">


## Database Design

We used a relational SQL database to store the data required by the application, including users, game content and user progress.


<img src="img/schema-diagram.png" alt="Schema diagram" width="900">



## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- SQL

### Authentication

- bcrypt
- JSON Web Tokens (JWT)

### Testing

- Jest
- Supertest

### Collaboration and Project Management

- Git
- GitHub


## Project Structure

educational-game-project/
│
├── api/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routers/
│   ├── __tests__/
│   ├── api.js
│   ├── index.js
│   └── package.json
│
├── client/
│   ├── assets/
│   ├── css/
│   ├── html/
│   └── js/
│
├── .gitignore
├── README.md
└── user-stories.md  

