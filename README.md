# Jeopardy Game

================

A web-based Jeopardy game implemented using the Model-View-Controller (MVC) pattern,
written by [Stefan Musarra](https://github.com/stefanzero).

## Overview

This Jeopardy game is built using HTML, CSS, and JavaScript. The game is designed to demonstrate the MVC pattern, where the game logic is separated into three interconnected components:

- **Model**: Represents the game data and current score.
- **View**: Handles updating the game display and user interface.
- **Controller**: Acts as an intermediary between the Model and View, by responding to user input and then updating the model and calling view methods to update the display.

## How to Play

---

Jeopardy! is a popular American game show where contestants are presented with clues in the form of answers and must respond in the form of a question. The game board consists of 5 columns (categories) and 5 rows with the dollar amount of each clue.

An MC (Master of Ceremonies) will control the game. Players will be assigned to teams 1, 2 or 3.

The first clue (category and value) will be selected by the MC. The MC will click the checkbox for the selected clue to start the game, which triggers displaying the Modal dialog that contains the clue. Then the MC will read the clue.

The first player to raise a hand will respond to the clue by stating a question which is answered by the clue. The MC will determine if the proposed question is correct or incorrect.

If the question is correct, the MC will click the "Set Winner" button for the team with the correct answer, and that team will receive the value of the clue. If the question is incorrect, another team can raise their hand to respond to the clue.

If the time runs out, the MC will click the "Show Question" button to reveal the correct answer.

The team that had the last correct answer will choose the next clue and repeat the process.

## Game Components

---

### Model

The Model is responsible for storing and managing the game data, including:

- An array of Category objects.
- Each Category has a name and an array of Square objects.
- Each Square has a property for the clue (answer), question, value (dollar amount), and team number (after the MC sets the winner).
- The number of teams, currently fixed to 3.
- Team scores.

### View

The View is responsible for holding references to DOM Elements and methods for updating
the display including:

- Game board with categories and checkboxes
- Team scores display
- Display and animation of the Modal dialog with the clue, answer, and buttons to set the winner for that clue

### Controller

The Controller is responsible for managing the game flow and updating the game state. It acts as an intermediary between the Model and View, handling user input and updating the game display accordingly.

The Controller first calls the view method to populate the game board with categories and checkboxes. It then adds event listeners to respond to user interactions, such as selecting a clue by clicking a checkbox and setting the winner of a clue.

### Initial Data

A separate JavaScript file, `jeopardy.js`, contains an object called `jeopardyData`
with one property called `categories` which is an array of category objects. Each category object has a name and an array of square objects. Each square object has a question, answer, value, and team property.

The `jeopardyData` object is used to populate the game board with categories and questions, and to keep track of the team scores. The `jeopardyData` object is added to the global `window` object so it is available to the `script.js` file.

## Features

---

- MVC pattern implementation
- Dynamic game board with categories and questions
- Team scores display and updating
- Modal dialog for displaying the clue, answer, and buttons to set the winner

## Future Development

---

- Create additional files with more initial game data
- Implement additional game features, such as Daily Double and Final Jeopardy
- Add penalty buttons for incorrect answers
- Improve game UI and user experience

## License

---

This project is licensed under the MIT License. See `LICENSE` for details.
