"use strict";

/**
 * Represents a single square on the Jeopardy game board.
 * @class Square
 */
class Square {
  /**
   * Creates a new Square instance.
   * @param {string} question - The clue text for the square.
   * @param {string} answer - The correct response for the square.
   * @param {number} value - The point value of the square.
   */
  constructor(question, answer, value) {
    /**
     * The clue text for the square.
     * @type {string}
     */
    this.question = question;
    /**
     * The correct response for the square.
     * @type {string}
     */
    this.answer = answer;
    /**
     * The point value of the square.
     * @type {number}
     */
    this.value = value;
    /**
     * The team that has won the square, or null if no team has won it yet.
     * @type {number|null}
     */
    this.team = null;
  }
}

/**
 * Represents a category on the Jeopardy game board.
 * @class Category
 */
class Category {
  /**
   * Creates a new Category instance.
   * @param {string} topic - The topic name for the category.
   * @param {Square[]} squares - The array of squares for the category.
   */
  constructor(topic, squares) {
    /**
     * The topic name for the category.
     * @type {string}
     */
    this.topic = topic;
    /**
     * The array of squares for the category.
     * @type {Square[]}
     */
    this.squares = squares;
  }
}

// const exampleSquares = [
//   new Square("What is the capital of the US?", "Washington, DC", 200),
//   new Square("What is the capital of France?", "Paris", 400),
//   new Square("What is the capital of Italy?", "Rome", 600),
//   new Square("What is the capital of Japan?", "Tokyo", 800),
//   new Square("What is the capital of Germany?", "Berlin", 1000),
// ];

/*
Initialize the categories array using the jeopardyData object to create
Category objects.
*/
let categories = [];

if (window.jeopardyData && Array.isArray(window.jeopardyData.categories)) {
  categories = window.jeopardyData.categories.map(
    (category) => new Category(category.name, category.squares),
  );
}

/**
 * Represents the game data and logic for the Jeopardy game.
 * @class JeopardyModel
 */
class JeopardyModel {
  /**
   * Creates a new JeopardyModel instance.
   * @param {Category[]} categories - The categories for the game.
   * @param {number} numTeams - The number of teams playing the game.
   */
  constructor(categories, numTeams) {
    /**
     * The categories for the game.
     * @type {Category[]}
     */
    this.categories = categories;
    /**
     * The number of teams playing the game.
     * @type {number}
     */
    this.numTeams = numTeams;
    /**
     * The scores for each team.
     * @type {Object<number, number>}
     */
    this.scores = {};
  }

  /**
   * Sets the winner for a given square.
   * @param {number} team - The team number that won the square.
   * @param {Square} square - The square that was won.
   */
  setWinner(team, square) {
    square.team = team;
  }

  /**
   * Calculates the scores for each team based on the current state of the game.
   *
   * Resets the scores object, then iterates through each category and square to update the scores.
   */
  calculateScores() {
    // Reset the scores object to zero for each team
    for (const key in this.scores) {
      if (this.scores.hasOwnProperty(key)) {
        // Set the score for each team to zero
        this.scores[key] = 0;
      }
    }

    // Iterate through each category
    this.categories.forEach((category) => {
      // Iterate through each square in the category
      category.squares.forEach((square) => {
        // Check if the square has a team assigned
        if (square.team) {
          // Check if the team is already in the scores object
          if (square.team in this.scores) {
            // Add the square's value to the team's score
            this.scores[square.team] += square.value;
          } else {
            // Set the team's score to the square's value if it's not already in the scores object
            this.scores[square.team] = square.value;
          }
        }
      });
    });
  }
}

/**
 * Represents the view component of the Jeopardy game, responsible for rendering the game UI.
 * @class JeopardyView
 */
class JeopardyView {
  /**
   * Creates a new JeopardyView instance.
   */
  constructor() {
    /**
     * The HTML element for the number of teams input field.
     * @type {HTMLInputElement}
     */
    this.numTeams = document.getElementById("num-teams");
    /**
     * The HTML elements for the categories.
     * @type {HTMLElement[]}
     */
    this.categories = document.querySelectorAll(".category");
    /**
     * The HTML element for the score list.
     * @type {HTMLElement}
     */
    this.scoreList = document.querySelector(".score-list");
    /**
     * The HTML elements for the score values.
     * @type {Object<string, HTMLElement>}
     */
    this.scoreValues = {};
    /**
     * The HTML elements for the squares.
     * @type {HTMLElement[]}
     */
    this.squares = document.querySelectorAll(".square");
    /**
     * The HTML element for the modal dialog.
     * @type {HTMLElement}
     */
    this.modal = document.getElementById("modal");
    /**
     * The HTML element for the modal answer text.
     * @type {HTMLElement}
     */
    this.modalAnswer = document.getElementById("modal-answer");
    /**
     * The HTML element for the modal question text.
     * @type {HTMLElement}
     */
    this.modalQuestion = document.getElementById("modal-question");
    /**
     * The HTML element for the modal show question button.
     * @type {HTMLElement}
     */
    this.modalShowQuestionButton = this.modal.querySelector("#show-question");
    /**
     * The HTML element for the modal teams container.
     * @type {HTMLElement}
     */
    this.modalTeams = this.modal.querySelector(".modal-teams");
    /**
     * The HTML element for the modal winner buttons container.
     * @type {HTMLElement}
     */
    this.modalWinnerButtonContainer = this.modal.querySelector(".winner-buttons");
    /**
     * The HTML elements for the modal winner buttons.
     * @type {Object<string, HTMLElement>}
     */
    this.modalWinnerButtons = {};
    /**
     * The HTML element for the modal countdown timer.
     * @type {HTMLElement}
     */
    this.modalCountdown = this.modal.querySelector("#modal-countdown");
    /**
     * The ID of the countdown timer interval.
     * @type {number|null}
     */
    this.countDownId = null;
    /**
     * The HTML element for the modal done button.
     * @type {HTMLElement}
     */
    this.modalDoneButton = this.modal.querySelector("button.done");
    // Default to 3 until setup modal is implemented
    const defaultNumTeams = 3;
    this.createScoreListItems(defaultNumTeams);
    this.addWinnerButtons(defaultNumTeams);
    this.addCheckboxes();
  }

  /**
   * Sets the categories.
   * @param {Category[]} categories - The categories.
   */
  setCategories(categories) {
    /**
     * Loops through each category and updates the category text.
     */
    this.categories.forEach((category, index) => {
      category.textContent = categories[index].topic;
    });
  }

  /**
   * Adds checkboxes to the squares on the game board.
   * @description Creates a checkbox input element for each square and appends it to the square element.
   */
  addCheckboxes() {
    // Loop through each square in the game board
    this.squares.forEach((square) => {
      // Create a new checkbox input element
      const checkbox = document.createElement("input");

      // Set the type of the input element to "checkbox"
      checkbox.type = "checkbox";

      // Append the checkbox to the square element
      square.appendChild(checkbox);
    });
  }

  /**
   * Creates the score list items for the specified number of teams.
   *
   * This function clears the current score list, then creates a new list item for each team.
   * Each list item contains the team number and an initial score of 0.
   *
   * @param {number} numTeams - The number of teams playing the game.
   */
  createScoreListItems(numTeams) {
    // Clear the current score list
    this.scoreList.innerHTML = "";

    // Reset the score values object
    this.scoreValues = {};

    // Loop through each team and create a score list item
    for (let i = 0; i < numTeams; i++) {
      // Create a new list item
      const scoreItem = document.createElement("li");

      // Create a span for the team number
      const scoreTeam = document.createElement("span");
      scoreTeam.textContent = `Team ${i + 1}:`;

      // Add the team number to the list item
      scoreItem.appendChild(scoreTeam);

      // Create a span for the score value
      const scoreValue = document.createElement("span");
      this.scoreValues[i + 1] = scoreValue;
      scoreValue.classList.add("score-value");
      scoreValue.dataset.team = i + 1;
      scoreValue.textContent = "0";

      // Add the score value to the list item
      scoreItem.appendChild(scoreValue);

      // Add the list item to the score list
      this.scoreList.appendChild(scoreItem);
    }
  }

  updateScoreList(scores) {
    for (let teamNumber in scores) {
      const score = scores[teamNumber];
      this.scoreValues[teamNumber].textContent = score;
    }
  }

  /**
   * Adds winner buttons to the modal winner button container.
   *
   * This function creates a button for each team and appends it to the container.
   * The button's text content is set to the team number, and its dataset attribute is set to the team number.
   *
   * @param {number} numTeams - The number of teams playing the game.
   */
  addWinnerButtons(numTeams) {
    // Loop through each team and create a winner button
    for (let i = 0; i < numTeams; i++) {
      // Create a new button element
      const button = document.createElement("button");

      // Set the button's text content to the team number
      button.textContent = `Team ${i + 1}`;

      // Set the button's dataset attribute to the team number
      button.dataset.team = i + 1;

      // Append the button to the modal winner button container
      this.modalWinnerButtonContainer.appendChild(button);

      // Store the button in the modal winner buttons object
      this.modalWinnerButtons[i + 1] = button;
    }
  }

  /**
   * Toggles the border style of a square element.
   *
   * This function takes a square element and toggles its border style by adding or removing the "square-border" class.
   * If the square already has the border, it is removed; otherwise, it is added.
   * Additionally, this function removes the border from all other squares.
   *
   * @param {HTMLElement} square - The square element to toggle the border for.
   */
  toggleSquareBorder(square) {
    // Check if the square currently has the border
    const hasBorder = square.classList.contains("square-border");

    // Remove the border from all squares
    this.squares.forEach((square) => {
      square.classList.remove("square-border");
    });

    // Toggle the border on the specified square
    if (hasBorder) {
      // If the square already had the border, remove it (this is actually redundant, but left for consistency)
      square.classList.remove("square-border");
    } else {
      // If the square didn't have the border, add it
      square.classList.add("square-border");
    }
  }

  /**
   * Fades out the span element within a square element.
   *
   * This function takes a square element and adds the "fade" class to its child span element,
   * causing it to fade out.
   *
   * @param {HTMLElement} square - The square element containing the span element to fade out.
   */
  fadeOutSquareSpan(square) {
    // Get the span element within the square element
    const span = square.querySelector("span");

    // Add the "fade" class to the span element to fade it out
    span.classList.add("fade");
  }

  /**
   * Fades in the span element within a square element.
   *
   * This function takes a square element and removes the "fade" class from its child span element,
   * causing it to fade in.
   *
   * @param {HTMLElement} square - The square element containing the span element to fade in.
   */
  fadeInSquareSpan(square) {
    // Get the span element within the square element
    const span = square.querySelector("span");

    // Remove the "fade" class from the span element to fade it in
    span.classList.remove("fade");
  }

  /**
   * Displays the modal window with the answer and question for a given square.
   *
   * This function updates the modal window's answer and question text content with the values from the given square,
   * and then shows and expands the modal window.
   *
   * @param {HTMLElement} square - The square element containing the answer and question to display in the modal.
   */
  displayModal(square) {
    // Update the modal window's answer text content with the answer from the square
    this.modalAnswer.textContent = square.answer;

    // Update the modal window's question text content with the question from the square
    this.modalQuestion.textContent = square.question;

    // Get the modal window element
    const modal = this.modal;

    // Show the modal window
    modal.classList.add("show");

    // Expand the modal window after a short delay
    setTimeout(() => {
      // Add the "expand" class to the modal window to expand it
      modal.classList.add("expand");
    }, 500); // delay in milliseconds
  }

  /**
   * Hides the modal window.
   *
   * This function removes the "show" and "expand" classes from the modal window,
   * causing it to be hidden from view.
   */
  hideModal() {
    // Get the modal window element
    const modal = this.modal;

    // Remove the "show" class from the modal window to hide it
    modal.classList.remove("show");

    // Remove the "expand" class from the modal window to collapse it
    modal.classList.remove("expand");
  }

  /**
   * Shows the question in the modal window.
   *
   * This function hides the "Show Question" button and reveals the question text in the modal window.
   */
  showQuestion() {
    // Hide the "Show Question" button
    this.modalShowQuestionButton.classList.add("hidden");

    // Show the question text
    this.modalQuestion.classList.remove("hidden");
  }

  /**
   * Hides the question in the modal window.
   *
   * This function shows the "Show Question" button and hides the question text in the modal window.
   */
  hideQuestion() {
    // Show the "Show Question" button
    this.modalShowQuestionButton.classList.remove("hidden");

    // Hide the question text
    this.modalQuestion.classList.add("hidden");
  }

  /**
   * Highlights the winner of a question in the modal window.
   *
   * This function takes a team number and adds the "selected" class to the corresponding winner button in the modal window,
   * while removing the "selected" class from all other winner buttons.
   *
   * @param {number} team - The team number of the winner.
   */
  highlightQuestionWinner(team) {
    // Loop through each team's winner button
    for (let teamNumber in this.modalWinnerButtons) {
      // Check if the current team is the winner
      if (teamNumber == team) {
        // Highlight the winner button
        this.modalWinnerButtons[teamNumber].classList.add("selected");
      } else {
        // Unhighlight the non-winner button
        this.modalWinnerButtons[teamNumber].classList.remove("selected");
      }
    }
  }

  /**
   * Resets the question winners in the modal window.
   *
   * This function removes the "selected" class from all winner buttons in the modal window,
   * effectively resetting the question winners.
   */
  resetQuestionWinners() {
    // Loop through each team's winner button
    for (let teamNumber in this.modalWinnerButtons) {
      // Remove the "selected" class from the button
      this.modalWinnerButtons[teamNumber].classList.remove("selected");
    }
  }

  /**
   * Starts the countdown timer in the modal window.
   *
   * This function initializes the countdown timer with a value of 30 seconds,
   * displays the countdown timer in the modal window, and starts the countdown interval.
   * If a countdown interval is already running, it is cleared before starting a new one.
   */
  startCountdown() {
    // Set the initial countdown value to 30 seconds
    this.modalCountdown.textContent = 30;

    // Show the countdown timer in the modal window
    this.modalCountdown.classList.remove("hidden");

    // Clear any existing countdown interval
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }

    // Start the countdown interval
    this.countDownId = setInterval(() => {
      // Decrement the countdown value by 1 second
      this.modalCountdown.textContent--;

      // If the countdown value reaches 0, clear the interval
      if (this.modalCountdown.textContent <= 0) {
        clearInterval(this.countDownId);
      }
    }, 1000); // interval duration in milliseconds (1 second)
  }

  /**
   * Stops the countdown timer in the modal window.
   *
   * This function clears the countdown interval, hides the countdown timer in the modal window,
   * resets the countdown value to 30 seconds, and sets the countdown ID to null.
   */
  stopCountdown() {
    // Clear the countdown interval
    clearInterval(this.countDownId);

    // Hide the countdown timer in the modal window
    this.modalCountdown.classList.add("hidden");

    // Reset the countdown value to 30 seconds
    this.modalCountdown.textContent = 30;

    // Set the countdown ID to null to indicate that no interval is running
    this.countDownId = null;
  }

  /**
   * Resets the countdown timer value in the modal window.
   *
   * This function sets the countdown timer value back to its initial value of 30 seconds.
   */
  resetCountdown() {
    // Reset the countdown value to 30 seconds
    this.modalCountdown.textContent = 30;
  }
}

/**
 * The JeopardyController class manages the game logic and interactions between the model and view.
 */
class JeopardyController {
  /**
   * Initializes the controller with the model and view.
   *
   * @param {JeopardyModel} model - The game model.
   * @param {JeopardyView} view - The game view.
   */
  constructor(model, view) {
    // Store the model and view instances in the controller
    this.model = model;
    this.view = view;

    // Set the categories in the view based on the model's categories
    this.view.setCategories(this.model.categories);

    // Initialize the current square to null
    this.currentSquare = null;

    // Add event listeners to the checkboxes in the squares
    this.addCheckboxHandlers();

    // Add event listeners to the modal window elements
    this.addModalHandlers();

    // Add an event listener to the number of teams input field
    // to update the score list when the number of teams changes
    this.view.numTeams.addEventListener(
      "change",
      this.handleNumTeamsChange.bind(this),
    );
  }

  /**
   * Handles the change event for the number of teams input.
   *
   * Updates the score list to reflect the new number of teams.
   */
  handleNumTeamsChange() {
    // Get the new number of teams from the input field
    const numTeams = Number(this.view.numTeams.value);

    // Create new score list items based on the new number of teams
    this.view.createScoreListItems(numTeams);
  }

  /**
   * Adds event listeners to the checkboxes in the squares.
   *
   * Listens for changes to the checkboxes and calls handleCheckboxClick when a checkbox is checked or unchecked.
   */
  addCheckboxHandlers() {
    // Loop through each square and add an event listener to its checkbox
    this.view.squares.forEach((square) => {
      const checkbox = square.querySelector("input");
      checkbox.addEventListener("change", this.handleCheckboxClick.bind(this));
    });
  }

  /**
   * Handles the click event for a checkbox in a square.
   *
   * Toggles the square's border, displays or hides the modal window, and starts or stops the countdown.
   *
   * @param {Event} event - The click event.
   */
  handleCheckboxClick(event) {
    // Get the checkbox that was clicked
    const checkbox = event.target;

    // Get the checked state of the checkbox
    const checked = checkbox.checked;

    // Get the list item containing the checkbox
    const listItem = checkbox.parentNode;

    // Get the position of the square from the list item's dataset
    const pos = checkbox.parentNode.dataset.pos.split("-");

    // Get the current square from the model
    this.currentSquare = this.model.categories[pos[0]].squares[pos[1]];

    // Toggle the square's border
    this.view.toggleSquareBorder(listItem);

    // If the checkbox is checked, display the modal window and start the countdown
    if (checked) {
      // Fade out the square's span element
      this.view.fadeOutSquareSpan(listItem);

      // Display the modal window with the current square's data
      this.view.displayModal(this.currentSquare);

      // Start the countdown
      this.view.startCountdown();
    } else {
      // If the checkbox is unchecked, hide the modal window and stop the countdown
      // Reset the current square's team to null
      this.currentSquare.team = null;

      // Stop the countdown
      this.view.stopCountdown();

      // Calculate the scores
      this.model.calculateScores();

      // Update the score list
      this.view.updateScoreList(this.model.scores);

      // Fade in the square's span element
      this.view.fadeInSquareSpan(listItem);
    }
  }

  /**
   * Adds event listeners to the modal window elements.
   *
   * Listens for clicks on the "Done" button, "Show Question" button, and winner buttons.
   */
  addModalHandlers() {
    // Add an event listener to the "Done" button to handle the click event
    this.view.modalDoneButton.addEventListener(
      "click",
      this.handleModalDone.bind(this),
    );

    // Add an event listener to the "Show Question" button to handle the click event
    this.view.modalShowQuestionButton.addEventListener(
      "click",
      this.handleModalShowQuestion.bind(this),
    );

    // Loop through each winner button and add an event listener to handle the click event
    for (let teamNumber in this.view.modalWinnerButtons) {
      // Add an event listener to the winner button to handle the click event
      this.view.modalWinnerButtons[teamNumber].addEventListener(
        "click",
        this.handleWinnerButtonClick.bind(this),
      );
    }
  }

  /**
   * Handles the click event for the "Done" button in the modal window.
   *
   * Hides the question, resets the question winners, and hides the modal window.
   */
  handleModalDone() {
    // Hide the question
    this.view.hideQuestion();

    // Reset the question winners
    this.view.resetQuestionWinners();

    // Hide the modal window
    this.view.hideModal();
  }

  /**
   * Handles the click event for the "Show Question" button in the modal window.
   *
   * Shows the question.
   */
  handleModalShowQuestion() {
    // Show the question
    this.view.showQuestion();
  }

  /**
   * Handles the click event for a winner button in the modal window.
   *
   * Highlights the winner, updates the current square's team, calculates the scores, and updates the score list.
   *
   * @param {Event} event - The click event.
   */
  handleWinnerButtonClick(event) {
    // Get the button that was clicked
    const button = event.target;

    // Get the team number from the button's dataset
    const team = Number(button.dataset.team);

    // Highlight the winner
    this.view.highlightQuestionWinner(team);

    // Update the current square's team
    this.currentSquare.team = team;

    // Calculate the scores
    this.model.calculateScores();

    // Update the score list with the new scores
    this.view.updateScoreList(this.model.scores);
  }
}

const jeopardyModel = new JeopardyModel(categories);
const jeopardyView = new JeopardyView();
const jeopardyController = new JeopardyController(jeopardyModel, jeopardyView);
