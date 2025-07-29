"use strict";

const jeopardyData = {
  categories: [
    {
      name: "CSS",
      squares: [
        {
          question: "What is padding?",
          answer:
            "This property specifies the space between the content of an element and its border.",
          value: 200,
          team: null,
        },
        {
          question: "What is list-style-type?",
          answer:
            "This list property sets the marker such as a disc, character, or custom counter style of a list item element.",
          value: 400,
          team: null,
        },
        {
          question: "What is a selector?",
          answer:
            "The term for a text string used to match elements in a document for a specified hierarchy of ids, classes or tags.",
          value: 600,
          team: null,
        },
        {
          question: "What is overflow?",
          answer:
            "This CSS property controls what happens to content that is too big to fit into an area.",
          value: 800,
          team: null,
        },
        {
          question: "What is flex?",
          answer:
            "This value of display property allows child elements to space and wrap in a variety of formats.",
          value: 1000,
          team: null,
        },
      ],
    },
    {
      name: "HTML Tags",
      squares: [
        {
          question: "What is <nav>?",
          answer:
            "This HTML tag is used to create a menu of links at the top of a page.",
          value: 200,
          team: null,
        },
        {
          question: "What is <figure>?",
          answer:
            "This HTML tag is used to embed self-contained content, like illustrations, diagrams, photos, etc.",
          value: 400,
          team: null,
        },
        {
          question: "What is <input>?",
          answer:
            "This HTML tag is used to collect user input, such as text, checkboxes, and submit buttons.",
          value: 600,
          team: null,
        },
        {
          question: "What <video>?",
          answer:
            "This HTML tag is used to embed video content in a document, such as movies or other video streams.",
          value: 800,
          team: null,
        },
        {
          question: "What is <form>?",
          answer:
            "This HTML tag is used to create a collection of input elements and a submit button.",
          value: 1000,
          team: null,
        },
      ],
    },
    {
      name: "Control Statements",
      squares: [
        {
          question: "What is a for loop?",
          answer:
            "This type of loop runs a block of code a certain number of times.",
          value: 200,
          team: null,
        },
        {
          question: "What is a while loop?",
          answer:
            "This type of loop runs a block of code as long as a certain condition is true.",
          value: 400,
          team: null,
        },
        {
          question: "What is an if statement?",
          answer:
            "This statement controls whether a block of code will run when a certain condition is true.",
          value: 600,
          team: null,
        },
        {
          question: "What is a break statement?",
          answer:
            "When this statement is encountered in a loop, it causes the loop to stop and executes the next statement after the loop.",
          value: 800,
          team: null,
        },
        {
          question: "What is a switch statement?",
          answer:
            "A statement that controls which block of code will run based on different cases of a value.",
          value: 1000,
          team: null,
        },
      ],
    },
    {
      name: "Arrays",
      squares: [
        {
          question: "What is length?",
          answer: "This property returns the number of elements in an array.",
          value: 200,
          team: null,
        },
        {
          question: "What is push?",
          answer:
            "This method adds one or more elements to the end of an array and returns the new length.",
          value: 400,
          team: null,
        },
        {
          question: "What is pop?",
          answer:
            "This method removes the last element from an array and returns that element.",
          value: 600,
          team: null,
        },
        {
          question: "What is join?",
          answer:
            "This method creates and returns a new string by concatenating all the elements in an array, where each element is separated by the specified separator.",
          value: 800,
          team: null,
        },
        {
          question: "What is shift?",
          answer:
            "This method removes the first element from an array and returns that element.",
          value: 1000,
          team: null,
        },
      ],
    },
    {
      name: "Objects",
      squares: [
        {
          question: "What is a constructor?",
          answer:
            "This is a special method that is called when a new object is created.",
          value: 200,
          team: null,
        },
        {
          question: "What is new?",
          answer:
            "This keyword must be used before calling a class constructor to create a new instance of the class.",
          value: 400,
          team: null,
        },
        {
          question: "What is delete?",
          answer: "This keyword is used to remove a property from an object.",
          value: 600,
          team: null,
        },
        {
          question: "What is class?",
          answer:
            "This keyword is used to define a reusable template for an object and must include a constructor method.",
          value: 800,
          team: null,
        },
        {
          question: "What is keys() or Object.keys()?",
          answer:
            "This Object method returns an array of all the property names of the object specified in the parameters of this function.",
          value: 1000,
          team: null,
        },
      ],
    },
    {
      name: "DOM Events",
      squares: [
        {
          question: "What is a DOM Event?",
          answer:
            "This object is created by the browser when there are mouse or keyboard actions.",
          value: 200,
          team: null,
        },
        {
          question: "What is a Click Event?",
          answer:
            "This Event is created by the browser when a 'mousedown' and 'mouseup' occur on the same element.",
          value: 400,
          team: null,
        },
        {
          question: "What is a handler?",
          answer:
            "The term for a callback function that is called when an event occurs.",
          value: 600,
          team: null,
        },
        {
          question: "What is a addEventListener?",
          answer:
            "This key DOM Element method is used to register a handler for a specific event on the element.",
          value: 800,
          team: null,
        },
        {
          question: "What is draggable?",
          answer:
            "This HTML attribute allows an element to be dragged and dropped.",
          value: 1000,
          team: null,
        },
      ],
    },
  ],
};

window.jeopardyData = jeopardyData;
