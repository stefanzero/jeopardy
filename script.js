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

const javascriptControlStructures = [
  new Square(
    "What is a for loop?",
    "This type of loop runs a block of code a certain number of times",
    200,
  ),
  new Square(
    "What is a while loop?",
    "This type of loop runs a block of code as long as a certain condition is true",
    400,
  ),
  new Square(
    "What is an if statement?",
    "This statement controls whether a block of code will run when a certain condition is true",
    600,
  ),
  new Square(
    "What is a break statement?",
    "When this statement is encountered in a loop, it causes the loop to stop and executes the next statement after the loop",
    800,
  ),
  new Square(
    "What is a switch statement?",
    "A statement that controls which block of code will run based on different cases of a value",
    1000,
  ),
];

const htmlTags = [
  new Square(
    "What is <nav>?",
    "This HTML tag is used to create a menu of links at the top of a page",
    200,
  ),
  // new Square("What is a <ul>?", "an unordered list of items", 400),
  new Square(
    "What is <figure>?",
    "This HTML tag is used to embed self-contained content, like illustrations, diagrams, photos, etc",
    400,
  ),
  // new Square("What is an <a>?", "a link to another page", 600),
  // new Square("What is a <link>?", "a link to a stylesheet", 800),
  new Square(
    "What is <input>?",
    "This HTML tag are used to collect user input, such as text, checkboxes, and submit buttons",
    600,
  ),
  // new Square(
  //   "What is <audio>?",
  //   "tag is used to embed sound content in a document, such as music or other audio streams",
  //   800,
  // ),
  new Square(
    "What <video>?",
    "This HTML tag is used to embed video content in a document, such as movies or other video streams",
    800,
  ),
  new Square(
    "What is <form>?",
    "This HTML tag is used to create a collection of input elements and a submit button",
    1000,
  ),
];

const css = [
  new Square(
    "What is padding?",
    "This property specifies the space between the content of an element and its border",
    200,
  ),
  // new Square(
  //   "What is margin?",
  //   "the space between the content of an element and its border",
  //   600,
  // ),
  new Square(
    "What is list-style-type?",
    "This list property sets the marker such as a disc, character, or custom counter style of a list item element",
    400,
  ),
  new Square(
    "What is a selector?",
    "The term for a text string used to match elements in a document for a specified hierarchy of ids, classes or tags",
    600,
  ),
  // new Square("What is border?", "the space between the content of an element and its border", 800),
  new Square(
    "What is overflow?",
    "This property property controls what happens to content that is too big to fit into an area",
    800,
  ),
  // new Square(
  //   "What is block?",
  //   "This type of display property formats an element that ALWAYS starts on a new line and takes up the full width available (stretches out to the left and right as far as it can)",
  //   1000,
  // ),
  new Square(
    "What is flex?",
    "This type of display property allows child elements to space and wrap in a variety of formats",
    1000,
  ),
];

const javascriptArrays = [
  new Square(
    "What is length?",
    "This property returns the number of elements in an array",
    200,
  ),
  new Square(
    "What is push?",
    "This method adds one or more elements to the end of an array and returns the new length",
    400,
  ),
  new Square(
    "Wbat is pop?",
    "This method removes the last element from an array and returns that element",
    600,
  ),
  new Square(
    "What is join?",
    "This method creates and returns a new string by concatenating all the elements in an array, where each element is separated by the specified separator",
    800,
  ),
  new Square(
    "What is shift?",
    "This method removes the first element from an array and returns that element",
    1000,
  ),
];

const javascriptObjects = [
  new Square(
    "What is a constructor?",
    "This type of function is used to create objects",
    200,
  ),
  new Square(
    "What is new?",
    "This keyword must be used before calling a class constructor to create a new instance of the class",
    400,
  ),
  new Square(
    "What is delete?",
    "This keyword is used to remove a property from an object",
    600,
  ),
  new Square(
    "What is class?",
    "This keyword is used to define a reusable template for an object and must include a constructor method",
    800,
  ),
  new Square(
    "What is keys() or Object.keys()?",
    "This Object method returns an array of all the property names of the object specified in the parameters of this function",
    1000,
  ),
];

const domEvents = [
  new Square(
    // "What is an event?",
    // "an event is a signal that something has happened, such as a mouse click or a key press",
    "What is a DOM Event?",
    "This object is created by the browser when there are mouse or keyboard actions.",
    200,
  ),
  // new Square(
  //   "What is a listener?",
  //   "the object that manages the event handling mechanism",
  //   400,
  // ),
  new Square(
    "What is a Click Event?",
    'This Event is created by the browser when a "mousedown" and "mouseup" occur on the same element',
    400,
  ),
  new Square(
    "What is a handler?",
    "The term for a callback function that is called when an event occurs",
    600,
  ),
  new Square(
    "What is a addEventListener?",
    "This key DOM Element method is used to register a handler for a specific event on the element",
    800,
  ),
  // new Square(
  //   "What is a Mouse Event?",
  //   "These actions \"click\", \"mousemove\", and \"mouseover\" are examples of this type of event",
  //   800,
  // ),
  // new Square(
  //   "What is a Drag Event?",
  //   // "These actions \"dragstart\", \"dragend\", and \"drop\" are examples of this type of event",
  //   "This Event is created by the browser every few hundred milliseconds as an element or text selection is being dragged by the user",
  //   1000,
  // ),
  new Square(
    "What is a draggable?",
    "This HTML attribute allows an element to be dragged and dropped",
    1000,
  ),
];
// const javascriptFunctions = [
//   new Square(
//     "What is a function?",
//     "a function is a block of code that can be executed when it is called",
//     200,
//   ),
//   new Square(
//     "What is a parameter?",
//     "a parameter is a variable that is passed to a function",
//     400,
//   ),
//   new Square(
//     "What is a return?",
//     "a return is a value that is returned from a function",
//   )

const categories = [
  new Category("CSS", css),
  new Category("HTML Tags", htmlTags),
  new Category("Control Statements", javascriptControlStructures),
  new Category("Objects", javascriptObjects),
  new Category("Arrays", javascriptArrays),
  new Category("DOM Events", domEvents),
];

const board = document.getElementById("board");
const scoreboard = document.querySelector(".scoreboard");

// const jeopardy = new Jeopardy(categories, board, scoreboard);

class JeopardyModel {
  constructor(categories, board, scoreboard) {
    this.categories = categories;
    this.board = board;
    this.scoreboard = scoreboard;
  }

  render() {}
}

class JeopardyView {
  constructor() {
    this.numTeams = document.getElementById("num-teams");
    this.teamList = document.querySelector(".team-list");
    this.teams = {};
    this.squares = document.querySelectorAll(".square");
    this.addCheckboxes();
    this.modal = document.getElementById("modal");
    this.modalAnswer = document.getElementById("modal-answer");
    this.modalQuestion = document.getElementById("modal-question");
    this.modalShowQuestionButton = this.modal.querySelector("#show-question");
    this.modalTeams = this.modal.querySelector(".modal-teams");
    this.modalTeamButtons = this.modal.querySelector(".team-buttons");
    this.modalDoneButton = this.modal.querySelector(".done");
    // Default to 3 until setup modal is implemented
    const defaultNumTeams = 3;
    this.updateNumTeams(defaultNumTeams);
    this.addTeamButtons(defaultNumTeams);
  }

  addCheckboxes() {
    this.squares.forEach((square) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      square.appendChild(checkbox);
    });
  }

  updateNumTeams(numTeams) {
    this.teamList.innerHTML = "";
    for (let i = 0; i < numTeams; i++) {
      const team = document.createElement("li");
      const teamName = document.createElement("span");
      teamName.textContent = `Team ${i + 1}:`;
      team.appendChild(teamName);
      this.teamList.appendChild(team);
      const teamScore = document.createElement("span");
      teamScore.classList.add("team-score");
      teamScore.dataset.team = i + 1;
      teamScore.textContent = "0";
      team.appendChild(teamScore);
      this.teamList.appendChild(team);
    }
  }

  addTeamButtons(numTeams) {
    for (let i = 0; i < numTeams; i++) {
      const button = document.createElement("button");
      button.textContent = `Team ${i + 1}`;
      this.modalTeamButtons.appendChild(button);
    }
  }

  toggleBorder(square) {
    this.squares.forEach((square) => {
      square.classList.remove("square-border");
    });
    if (square.classList.contains("square-border")) {
      square.classList.remove("square-border");
    } else {
      square.classList.add("square-border");
    }
  }

  fadeOutSpan(square) {
    const span = square.querySelector("span");
    span.classList.add("fade");
  }
  fadeInSpan(square) {
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
      // this.modalTeamButtons.classList.remove("hidden");
      // this.modalTeamButtons.classList.add("show");
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
}

class JeopardyController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.addCheckboxHandlers();
    this.addModalHandlers();
    this.view.numTeams.addEventListener(
      "change",
      this.handleNumTeamsChange.bind(this),
    );
  }

  handleNumTeamsChange() {
    const numTeams = Number(this.view.numTeams.value);
    this.view.updateNumTeams(numTeams);
  }

  addCheckboxHandlers() {
    this.view.squares.forEach((square) => {
      // square.addEventListener("click", this.handleCheckboxClick.bind(this));
      const checkbox = square.querySelector("input");
      checkbox.addEventListener("change", this.handleCheckboxClick.bind(this));
    });
  }
  handleCheckboxClick(event) {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode;
    const pos = checkbox.parentNode.dataset.pos.split("-");
    const square = this.model.categories[pos[0]].squares[pos[1]];
    this.view.toggleBorder(listItem);
    if (checked) {
      this.view.fadeOutSpan(listItem);
      this.view.displayModal(square);
    } else {
      this.view.fadeInSpan(listItem);
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
  }
  handleModalDone() {
    this.view.hideQuestion();
    this.view.hideModal();
  }
  handleModalShowQuestion() {
    this.view.showQuestion();
  }
}

const jeopardyModel = new JeopardyModel(categories, board, scoreboard);
const jeopardyView = new JeopardyView();
const jeopardyController = new JeopardyController(jeopardyModel, jeopardyView);
