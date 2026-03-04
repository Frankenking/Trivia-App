Title: Quiz App
Problem Statement: People often enjoy testing their knowledge through quizzes on various topics. A simple quiz app can provide an engaging way to learn and have fun.

Project Idea: Create a quiz application using HTML, CSS, and JavaScript. The application will present multiple-choice questions to users with a timer and display their scores at the end.

Project Components:
Quiz Questions:
Load questions from a predefined question bank stored as a JSON file.
Ensure questions are structured with attributes such as question text, options, and correct answers.
Format the JSON file to include a variety of question types (e.g., multiple-choice, true/false) for diversity.
User Interaction:
 Display multiple-choice questions with four options each.
 Allow users to select an answer for each question using radio buttons or checkboxes.
 Provide immediate feedback on whether the selected answer is correct or incorrect.
Score Calculation:
 Calculate and display the user’s score at the end of the quiz based on correct answers.
 Show the correct answers for each question after the quiz is completed to provide learning feedback.
 Random Selection from the Question Bank:
 Implement a method to randomly select questions from the question bank for each quiz session.
 Present questions in a random order to ensure fairness and engagement.
 Avoid repeating questions within the same quiz session unless specified otherwise to enhance quiz variety.
Timer:
 Include a timer feature to limit the duration of the quiz session.
 Display the remaining time prominently to keep users informed of their progress.
 Implement automatic submission of answers when the timer expires to manage quiz completion efficiently and fairly.
NOTE:

The project team should curate the JSON file, or reference any valid JSON files available on GitHub.
Utilize the browser's local storage for storing and retrieving the latest quiz scores, ensuring persistence across page reloads. Develop functions to save the latest quiz scores, retrieve the best score stored in local storage, and load this data when the application initializes.
