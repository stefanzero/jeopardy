"use strict";

class Square {
  constructor(question, answer, value) {
    this.question = question;
    this.answer = answer;
    this.value = value;
    this.team = null;
  }
}

class Category {
  constructor(topic, squares) {
    this.topic = topic;
    this.squares = squares;
  }
}

// const capitals = [
//   new Square("What is the capital of the US?", "Washington, DC", 200),
//   new Square("What is the capital of France?", "Paris", 400),
//   new Square("What is the capital of Italy?", "Rome", 600),
//   new Square("What is the capital of Japan?", "Tokyo", 800),
//   new Square("What is the capital of Germany?", "Berlin", 1000),
// ];

let categories = [];

if (window.jeopardyData && Array.isArray(window.jeopardyData.categories)) {
  categories = window.jeopardyData.categories.map(
    (category) => new Category(category.name, category.squares),
  );
}

class JeopardyModel {
  // constructor(categories, board, scoreboard) {
  constructor(categories, numTeams) {
    this.categories = categories;
    this.numTeams = numTeams;
    this.scores = {};
  }

  setWinner(team, square) {
    square.team = team;
  }

  calculateScores() {
    // reset the scores object
    for (const key in this.scores) {
      if (this.scores.hasOwnProperty(key)) {
        this.scores[key] = 0;
      }
    }

    this.categories.forEach((category) => {
      category.squares.forEach((square) => {
        if (square.team) {
          if (square.team in this.scores) {
            this.scores[square.team] += square.value;
          } else {
            this.scores[square.team] = square.value;
          }
        }
      });
    });
  }
}

class JeopardyView {
  constructor() {
    this.numTeams = document.getElementById("num-teams");
    this.categories = document.querySelectorAll(".category");
    this.scoreList = document.querySelector(".score-list");
    this.scoreValues = {};
    this.squares = document.querySelectorAll(".square");
    this.addCheckboxes();
    this.modal = document.getElementById("modal");
    this.modalAnswer = document.getElementById("modal-answer");
    this.modalQuestion = document.getElementById("modal-question");
    this.modalShowQuestionButton = this.modal.querySelector("#show-question");
    this.modalTeams = this.modal.querySelector(".modal-teams");
    this.modalWinnerButtonContainer =
      this.modal.querySelector(".winner-buttons");
    this.modalWinnerButtons = {};
    this.modalCountdown = this.modal.querySelector("#modal-countdown");
    this.countDownId = null;
    this.modalDoneButton = this.modal.querySelector("button.done");
    // Default to 3 until setup modal is implemented
    const defaultNumTeams = 3;
    this.createScoreListItems(defaultNumTeams);
    this.addWinnerButtons(defaultNumTeams);
  }

  setCategories(categories) {
    this.categories.forEach((category, index) => {
      category.textContent = categories[index].topic;
    }); 
  }

  addCheckboxes() {
    this.squares.forEach((square) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      square.appendChild(checkbox);
    });
  }

  createScoreListItems(numTeams) {
    this.scoreList.innerHTML = "";
    this.scoreValues = {};
    for (let i = 0; i < numTeams; i++) {
      const scoreItem = document.createElement("li");
      const scoreTeam = document.createElement("span");
      scoreTeam.textContent = `Team ${i + 1}:`;
      scoreItem.appendChild(scoreTeam);
      const scoreValue = document.createElement("span");
      this.scoreValues[i + 1] = scoreValue;
      scoreValue.classList.add("score-value");
      scoreValue.dataset.team = i + 1;
      scoreValue.textContent = "0";
      scoreItem.appendChild(scoreValue);
      this.scoreList.appendChild(scoreItem);
    }
  }

  updateScoreList(scores) {
    for (let teamNumber in scores) {
      const score = scores[teamNumber];
      this.scoreValues[teamNumber].textContent = score;
    }
  }

  addWinnerButtons(numTeams) {
    for (let i = 0; i < numTeams; i++) {
      const button = document.createElement("button");
      button.textContent = `Team ${i + 1}`;
      button.dataset.team = i + 1;
      this.modalWinnerButtonContainer.appendChild(button);
      this.modalWinnerButtons[i + 1] = button;
    }
  }

  toggleSquareBorder(square) {
    const hasBorder = square.classList.contains("square-border");
    this.squares.forEach((square) => {
      square.classList.remove("square-border");
    });
    if (hasBorder){
      square.classList.remove("square-border");
    } else {
      square.classList.add("square-border");
    }
  }

  fadeOutSquareSpan(square) {
    const span = square.querySelector("span");
    span.classList.add("fade");
  }
  fadeInSquareSpan(square) {
    const span = square.querySelector("span");
    span.classList.remove("fade");
  }

  displayModal(square) {
    this.modalAnswer.textContent = square.answer;
    this.modalQuestion.textContent = square.question;
    // Show the modal
    modal.classList.add("show");

    // Expand the modal
    setTimeout(() => {
      modal.classList.add("expand");
    }, 500);
    // Display the Set Winner section
    setTimeout(() => {
      // this.modalWinnerButtons.classList.remove("hidden");
      // this.modalWinnerButtons.classList.add("show");
    }, 1000);
  }

  hideModal() {
    this.modal.visibility = "hidden";
    this.modal.classList.remove("show");
    this.modal.classList.remove("expand");
  }

  showQuestion() {
    this.modalShowQuestionButton.classList.add("hidden");
    this.modalQuestion.classList.remove("hidden");
  }
  hideQuestion() {
    this.modalShowQuestionButton.classList.remove("hidden");
    this.modalQuestion.classList.add("hidden");
  }
  highlightQuestionWinner(team) {
    for (let teamNumber in this.modalWinnerButtons) {
      if (teamNumber == team) {
        this.modalWinnerButtons[teamNumber].classList.add("selected");
      } else {
        this.modalWinnerButtons[teamNumber].classList.remove("selected");
      }
    }
  }

  resetQuestionWinners() {
    for (let teamNumber in this.modalWinnerButtons) {
      this.modalWinnerButtons[teamNumber].classList.remove("selected");
    }
  }

  startCountdown() {
    this.modalCountdown.textContent = 30;
    this.modalCountdown.classList.remove("hidden");
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }

    this.countDownId = setInterval(() => {
      this.modalCountdown.textContent--;
      if (this.modalCountdown.textContent <= 0) {
        clearInterval(this.countDownId);
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.countDownId);
    this.modalCountdown.classList.add("hidden");
    this.modalCountdown.textContent = 30;
    this.countDownId = null;
  }

  resetCountdown() {
    this.modalCountdown.textContent = 30;
  }
}

class JeopardyController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.setCategories(this.model.categories);
    this.currentSquare = null;
    this.addCheckboxHandlers();
    this.addModalHandlers();
    this.view.numTeams.addEventListener(
      "change",
      this.handleNumTeamsChange.bind(this),
    );
  }

  handleNumTeamsChange() {
    const numTeams = Number(this.view.numTeams.value);
    this.view.createScoreListItems(numTeams);
  }

  addCheckboxHandlers() {
    this.view.squares.forEach((square) => {
      const checkbox = square.querySelector("input");
      checkbox.addEventListener("change", this.handleCheckboxClick.bind(this));
    });
  }
  handleCheckboxClick(event) {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode;
    const pos = checkbox.parentNode.dataset.pos.split("-");
    this.currentSquare = this.model.categories[pos[0]].squares[pos[1]];
    this.view.toggleSquareBorder(listItem);
    if (checked) {
      this.view.fadeOutSquareSpan(listItem);
      this.view.displayModal(this.currentSquare);
      this.view.startCountdown();
    } else {
      this.currentSquare.team = null;
      this.view.stopCountdown();
      this.model.calculateScores();
      this.view.updateScoreList(this.model.scores);
      this.view.fadeInSquareSpan(listItem);
    }
  }

  addModalHandlers() {
    this.view.modalDoneButton.addEventListener(
      "click",
      this.handleModalDone.bind(this),
    );
    this.view.modalShowQuestionButton.addEventListener(
      "click",
      this.handleModalShowQuestion.bind(this),
    );
    for (let teamNumber in this.view.modalWinnerButtons) {
      this.view.modalWinnerButtons[teamNumber].addEventListener(
        "click",
        this.handleWinnerButtonClick.bind(this),
      );
    }
  }
  handleModalDone() {
    this.view.hideQuestion();
    this.view.resetQuestionWinners();
    this.view.hideModal();
  }
  handleModalShowQuestion() {
    this.view.showQuestion();
  }

  handleWinnerButtonClick(event) {
    const button = event.target;
    const team = Number(button.dataset.team);
    this.view.highlightQuestionWinner(team);
    this.currentSquare.team = team;
    this.model.calculateScores();
    this.view.updateScoreList(this.model.scores);
  }
  calculateScores() {
    this.model.calculateScores();
  }
}

const jeopardyModel = new JeopardyModel(categories);
const jeopardyView = new JeopardyView();
const jeopardyController = new JeopardyController(jeopardyModel, jeopardyView);
