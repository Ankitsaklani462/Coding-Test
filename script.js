// ==========================================
// FIREBASE LIVE DATABASE CONFIGURATION SETUP
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB2XbI5lvr_QS_Fy6U22PXnCmlk1BvS330",
    authDomain: "coding-test-cc943.firebaseapp.com",
    projectId: "coding-test-cc943",
    storageBucket: "coding-test-cc943.firebasestorage.app",
    messagingSenderId: "636572625071",
    appId: "1:636572625071:web:618d6cce1b1f6280d18c5a",
    measurementId: "G-942MP50C5Q",
    databaseURL: "https://coding-test-cc943-default-rtdb.firebaseio.com" 
};

// Initialize Instance
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// UTILITY HANDLER: Converts raw encoded entities back to authentic code text dynamically
function renderCleanCodeText(rawStr) {
    if (rawStr === null || rawStr === undefined) return "";
    let cleanStr = String(rawStr);
    // Replace standard html codes so they look normal on screen without drawing elements
    return cleanStr
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
}

// ==========================================
// CENTRAL GLOBAL QUESTION BANK REGISTER
// ==========================================
const questionBank = [
    // === HTML (Questions 1-25) ===
    { id: 1, category: "HTML", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "Hyperlink and Text Markup Language"], answer: 0 },
    { id: 2, category: "HTML", question: "Who is making the Web standards?", options: ["Mozilla", "Google", "The World Wide Web Consortium (W3C)", "Microsoft"], answer: 2 },
    { id: 3, category: "HTML", question: "Choose the correct HTML element for the largest heading:", options: ["&lt;heading&gt;", "&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;"], answer: 2 },
    { id: 4, category: "HTML", question: "What is the correct HTML element for inserting a line break?", options: ["&lt;br&gt;", "&lt;lb&gt;", "&lt;break&gt;", "&lt;next&gt;"], answer: 0 },
    { id: 5, category: "HTML", question: "What is the correct HTML for creating a hyperlink?", options: ["&lt;a&gt;http://google.com&lt;/a&gt;", "&lt;a href='http://google.com'&gt;Google&lt;/a&gt;", "&lt;a url='http://google.com'&gt;Google&lt;/a&gt;", "&lt;href='http://google.com'&gt;Google&lt;/href&gt;"], answer: 1 },
    { id: 6, category: "HTML", question: "Which character is used to indicate an end tag?", options: ["*", "&lt;", "/", "^"], answer: 2 },
    { id: 7, category: "HTML", question: "How can you open a link in a new tab/browser window?", options: ["&lt;a href='url' target='new'&gt;", "&lt;a href='url' target='_blank'&gt;", "&lt;a href='url' new&gt;", "&lt;a href='url' target='_window'&gt;"], answer: 1 },
    { id: 8, category: "HTML", question: "Which of these elements are all &lt;table&gt; elements?", options: ["&lt;table&gt;&lt;tr&gt;&lt;td&gt;", "&lt;table&gt;&lt;head&gt;&lt;body&gt;", "&lt;table&gt;&lt;tr&gt;&lt;tt&gt;", "&lt;thead&gt;&lt;body&gt;&lt;tr&gt;"], answer: 0 },
    { id: 9, category: "HTML", question: "Inline elements are normally displayed without starting a new line.", options: ["True", "False"], answer: 0 },
    { id: 10, category: "HTML", question: "How can you make a numbered list?", options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;dl&gt;", "&lt;list&gt;"], answer: 1 },
    { id: 11, category: "HTML", question: "How can you make a bulleted list?", options: ["&lt;ol&gt;", "&lt;list&gt;", "&lt;ul&gt;", "&lt;dl&gt;"], answer: 2 },
    { id: 12, category: "HTML", question: "What is the correct HTML for making a checkbox?", options: ["&lt;check&gt;", "&lt;input type='checkbox'&gt;", "&lt;checkbox&gt;", "&lt;input type='check'&gt;"], answer: 1 },
    { id: 13, category: "HTML", question: "What is the correct HTML for making a text input area?", options: ["&lt;input type='textfield'&gt;", "&lt;input type='text'&gt;", "&lt;textinput&gt;", "&lt;textarea&gt;"], answer: 1 },
    { id: 14, category: "HTML", question: "What is the correct HTML for inserting an image?", options: ["&lt;img alt='MyImage'&gt;image.gif&lt;/img&gt;", "&lt;image src='image.gif' alt='MyImage'&gt;", "&lt;img src='image.gif' alt='MyImage'&gt;", "&lt;img href='image.gif'&gt;"], answer: 2 },
    { id: 15, category: "HTML", question: "What is the correct HTML for making a drop-down list?", options: ["&lt;input type='list'&gt;", "&lt;list&gt;", "&lt;select&gt;", "&lt;input type='dropdown'&gt;"], answer: 2 },
    { id: 16, category: "HTML", question: "Which HTML element defines navigation links?", options: ["&lt;navigate&gt;", "&lt;nav&gt;", "&lt;bar&gt;", "&lt;links&gt;"], answer: 1 },
    { id: 17, category: "HTML", question: "What does the &lt;aside&gt; element define?", options: ["A navigation bar", "Content aside from the page content", "The footer area", "A section block"], answer: 1 },
    { id: 18, category: "HTML", question: "Which HTML element is used to display a scalar measurement within a known range?", options: ["&lt;gauge&gt;", "&lt;range&gt;", "&lt;measure&gt;", "&lt;meter&gt;"], answer: 3 },
    { id: 19, category: "HTML", question: "In HTML, which attribute is used to specify an alternate text for an image?", options: ["title", "src", "alt", "longdesc"], answer: 2 },
    { id: 20, category: "HTML", question: "Which doctype is correct for HTML5?", options: ["&lt;!DOCTYPE html&gt;", "", "&lt;!DOCTYPE HTML5&gt;", "&lt;doctype html&gt;"], answer: 0 },
    { id: 21, category: "HTML", question: "Which HTML element is used to specify a footer for a document or section?", options: ["&lt;bottom&gt;", "&lt;section&gt;", "&lt;foot&gt;", "&lt;footer&gt;"], answer: 3 },
    { id: 22, category: "HTML", question: "What is the correct HTML element for playing video files?", options: ["&lt;media&gt;", "&lt;video&gt;", "&lt;movie&gt;", "&lt;play&gt;"], answer: 1 },
    { id: 23, category: "HTML", question: "What is the correct HTML element for playing audio files?", options: ["&lt;audio&gt;", "&lt;sound&gt;", "&lt;music&gt;", "&lt;voice&gt;"], answer: 0 },
    { id: 24, category: "HTML", question: "Global attributes can be used on any HTML element.", options: ["True", "False"], answer: 0 },
    { id: 25, category: "HTML", question: "Which attribute specifies where to send the form-data when a form is submitted?", options: ["method", "action", "src", "name"], answer: 1 },

    // === CSS (Questions 26-50) ===
    { id: 26, category: "CSS", question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1 },
    { id: 27, category: "CSS", question: "What is the correct HTML for referring to an external style sheet?", options: ["&lt;style src='mystyle.css'&gt;", "&lt;link rel='stylesheet' type='text/css' href='mystyle.css'&gt;", "&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;", "&lt;link src='mystyle.css'&gt;"], answer: 1 },
    { id: 28, category: "CSS", question: "Which HTML tag is used to define an internal style sheet?", options: ["&lt;css&gt;", "&lt;script&gt;", "&lt;style&gt;", "&lt;inline&gt;"], answer: 2 },
    { id: 29, category: "CSS", question: "Which HTML attribute is used to define inline styles?", options: ["styles", "font", "style", "class"], answer: 2 },
    { id: 30, category: "CSS", question: "Which is the correct CSS syntax?", options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"], answer: 0 },
    { id: 31, category: "CSS", question: "How do you insert a comment in a CSS file?", options: ["// this is a comment", "' this is a comment", "/* this is a comment */", "// this is a comment //"], answer: 2 },
    { id: 32, category: "CSS", question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "background"], answer: 2 },
    { id: 33, category: "CSS", question: "How do you add a background color for all &lt;h1&gt; elements?", options: ["h1 {background-color:#FFFFFF;}", "h1.all {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "h1 {bg: #FFFFFF;}"], answer: 0 },
    { id: 34, category: "CSS", question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "fgcolor", "color", "font-color"], answer: 2 },
    { id: 35, category: "CSS", question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
    { id: 36, category: "CSS", question: "What is the correct CSS syntax for making all the &lt;p&gt; elements bold?", options: ["p {font-weight:bold;}", "p {text-size:bold;}", "&lt;p style='font-size:bold;'&gt;", "p {font:bold;}"], answer: 0 },
    { id: 37, category: "CSS", question: "How do you display hyperlinks without an underline?", options: ["a {text-decoration:none;}", "a {underline:none;}", "a {text-decoration:no-underline;}", "a {clear:underline;}"], answer: 0 },
    { id: 38, category: "CSS", question: "How do you make each word in a text start with a capital letter?", options: ["text-transform:capitalize", "text-transform:uppercase", "You cannot do that with CSS", "font-style:capitalize"], answer: 0 },
    { id: 39, category: "CSS", question: "Which font property defines a font family name?", options: ["font-type", "font-family", "font-name", "font-style"], answer: 1 },
    { id: 40, category: "CSS", question: "How do you make the text bold?", options: ["font:bold;", "font-weight:bold;", "style:bold;", "text-weight:bold;"], answer: 1 },
    { id: 41, category: "CSS", question: "How do you display a border like this: Top border=10px, Bottom=5px, Left=20px, Right=1px?", options: ["border-width:10px 1px 5px 20px;", "border-width:10px 20px 5px 1px;", "border-width:10px 5px 20px 1px;", "border-width:5px 20px 10px 1px;"], answer: 0 },
    { id: 42, category: "CSS", question: "Which property is used to change the left margin of an element?", options: ["margin-left", "padding-left", "indent", "left-margin"], answer: 0 },
    { id: 43, category: "CSS", question: "When using the padding property; are you allowed to use negative values?", options: ["Yes", "No"], answer: 1 },
    { id: 44, category: "CSS", question: "How do you make a list that lists its items with square bullets?", options: ["list-style-type: square;", "list-type: square;", "bullet-type: square;", "list: square;"], answer: 0 },
    { id: 45, category: "CSS", question: "How do you select an element with id 'demo'?", options: [".demo", "#demo", "*demo", "demo"], answer: 1 },
    { id: 46, category: "CSS", question: "How do you select elements with class name 'test'?", options: ["*test", "#test", "test", ".test"], answer: 3 },
    { id: 47, category: "CSS", question: "How do you select all p elements inside a div element?", options: ["div p", "div.p", "div + p", "div &gt; p"], answer: 0 },
    { id: 48, category: "CSS", question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], answer: 3 },
    { id: 49, category: "CSS", question: "Which property is used to overlay elements sequentially on top of each other?", options: ["z-index", "layers", "stack", "position"], answer: 0 },
    { id: 50, category: "CSS", question: "Which CSS property is used to make content responsive using grids?", options: ["display: flex", "display: grid", "display: block", "float: left"], answer: 1 },

    // === JavaScript (Questions 51-75) ===
    { id: 51, category: "JavaScript", question: "Inside which HTML element do we put the JavaScript?", options: ["&lt;js&gt;", "&lt;scripting&gt;", "&lt;script&gt;", "&lt;javascript&gt;"], answer: 2 },
    { id: 52, category: "JavaScript", question: "What is the correct syntax to target an element by ID?", options: ["document.getElement('p')", "document.getElementById('demo')", "#demo", "document.getElementsName('demo')"], answer: 1 },
    { id: 53, category: "JavaScript", question: "Where is the correct place to insert JavaScript?", options: ["Both the &lt;head&gt; and &lt;body&gt; sections", "The &lt;body&gt; section exclusively", "The &lt;head&gt; section exclusively", "None of these"], answer: 0 },
    { id: 54, category: "JavaScript", question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"], answer: 3 },
    { id: 55, category: "JavaScript", question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], answer: 0 },
    { id: 56, category: "JavaScript", question: "How do you call a function named 'myFunction'?", options: ["call function myFunction()", "myFunction()", "call myFunction()", "execute myFunction()"], answer: 1 },
    { id: 57, category: "JavaScript", question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], answer: 2 },
    { id: 58, category: "JavaScript", question: "How to write an IF statement for executing code if 'i' is NOT equal to 5?", options: ["if (i &lt;&gt; 5)", "if i != 5 then", "if (i != 5)", "if i &lt;&gt; 5 then"], answer: 2 },
    { id: 59, category: "JavaScript", question: "How does a WHILE loop start?", options: ["while (i &lt;= 10)", "while i = 1 to 10", "while (i &lt;= 10; i++)", "while i &lt;= 10"], answer: 0 },
    { id: 60, category: "JavaScript", question: "How does a FOR loop start?", options: ["for (i = 0; i &lt;= 5)", "for (i = 0; i &lt;= 5; i++)", "for i = 1 to 5", "for (i &lt;= 5; i++)"], answer: 1 },
    { id: 61, category: "JavaScript", question: "How can you add a single-line comment in JavaScript?", options: ["' This is a comment", "// This is a comment", "", "/* This is a comment"], answer: 1 },
    { id: 62, category: "JavaScript", question: "What is the correct way to write a JavaScript array?", options: ["var colors = (1:'red', 2:'green')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green')"], answer: 1 },
    { id: 63, category: "JavaScript", question: "How do you round the number 7.25, to the nearest integer?", options: ["Math.round(7.25)", "rnd(7.25)", "Math.rnd(7.25)", "round(7.25)"], answer: 0 },
    { id: 64, category: "JavaScript", question: "How do you find the highest number of x and y?", options: ["Math.max(x, y)", "ceil(x, y)", "Math.highest(x, y)", "top(x, y)"], answer: 0 },
    { id: 65, category: "JavaScript", question: "Which event occurs when the user clicks on an HTML element?", options: ["onmouseover", "onchange", "onclick", "onmouseclick"], answer: 2 },
    { id: 66, category: "JavaScript", question: "How do you declare a JavaScript variable?", options: ["v carName;", "var carName;", "variable carName;", "string carName;"], answer: 1 },
    { id: 67, category: "JavaScript", question: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], answer: 2 },
    { id: 68, category: "JavaScript", question: "What will the following code return: Boolean(10 &gt; 9)?", options: ["true", "false", "NaN", "undefined"], answer: 0 },
    { id: 69, category: "JavaScript", question: "Is JavaScript case-sensitive?", options: ["Yes", "No"], answer: 0 },
    { id: 70, category: "JavaScript", question: "Which built-in method returns the length of a string?", options: ["length()", "size()", "index", "length"], answer: 3 },
    { id: 71, category: "JavaScript", question: "Which keyword is used to declare a block-scoped local variable?", options: ["var", "let", "global", "set"], answer: 1 },
    { id: 72, category: "JavaScript", question: "What does NaN stand for?", options: ["New and Null", "Number and Null", "Not a Number", "Null and Negative"], answer: 2 },
    { id: 73, category: "JavaScript", question: "Which method adds a new element to the end of an array?", options: ["pop()", "push()", "shift()", "unshift()"], answer: 1 },
    { id: 74, category: "JavaScript", question: "How do you open a confirmation dialogue box?", options: ["alert()", "msg()", "confirm()", "prompt()"], answer: 2 },
    { id: 75, category: "JavaScript", question: "Which symbol is used for strict equality comparison?", options: ["==", "=", "===", "!="], answer: 2 },

    // === Python (Questions 76-100) ===
    { id: 76, category: "Python", question: "What is the correct syntax to output 'Hello World' in Python?", options: ["p('Hello World')", "print('Hello World')", "echo('Hello World')", "printf('Hello World')"], answer: 1 },
    { id: 77, category: "Python", question: "How do you insert COMMENTS in Python code?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", ""], answer: 2 },
    { id: 78, category: "Python", question: "Which data type is NOT built-in in Python?", options: ["List", "Dictionary", "Tuple", "Array"], answer: 3 },
    { id: 79, category: "Python", question: "How do you create a variable with the numeric value 5?", options: ["x = 5", "x = int(5)", "Both of the above methods", "None of the above"], answer: 2 },
    { id: 80, category: "Python", question: "What is the correct file extension for Python files?", options: [".pt", ".py", ".pyt", ".python"], answer: 1 },
    { id: 81, category: "Python", question: "Is Python case-sensitive when dealing with identifiers?", options: ["Yes", "No"], answer: 0 },
    { id: 82, category: "Python", question: "What is the correct syntax to output the type of a variable in Python?", options: ["print(typeof(x))", "print(type(x))", "print(id(x))", "print(class(x))"], answer: 1 },
    { id: 83, category: "Python", question: "How do you create a function in Python?", options: ["function myFunction():", "def myFunction():", "create myFunction():", "void myFunction():"], answer: 1 },
    { id: 84, category: "Python", question: "What is the correct way to start a conditional 'if' statement in Python?", options: ["if x &gt; y:", "if (x &gt; y)", "if x &gt; y then:", "if x &gt; y then"], answer: 0 },
    { id: 85, category: "Python", question: "Which statement is used to stop a loop?", options: ["exit", "stop", "break", "return"], answer: 2 },
    { id: 86, category: "Python", question: "Which collection is ordered, changeable, and allows duplicate members?", options: ["LIST", "TUPLE", "SET", "DICTIONARY"], answer: 0 },
    { id: 87, category: "Python", question: "Which collection is ordered and UNCHANGEABLE?", options: ["List", "Set", "Dictionary", "Tuple"], answer: 3 },
    { id: 88, category: "Python", question: "How do you call a function named 'my_func' in Python?", options: ["call my_func()", "my_func()", "def my_func()", "execute my_func()"], answer: 1 },
    { id: 89, category: "Python", question: "Which operator is used to calculate the remainder of a division?", options: ["/", "%", "//", "div"], answer: 1 },
    { id: 90, category: "Python", question: "How do you check if an item exists within a list?", options: ["using the 'in' keyword", "using the 'contains' method", "using the 'exist' function", "using find()"], answer: 0 },
    { id: 91, category: "Python", question: "What is the default index start position for list elements?", options: ["1", "-1", "0", "Any number"], answer: 2 },
    { id: 92, category: "Python", question: "Which keyword is used to handle exceptions in Python?", options: ["catch", "except", "try", "error"], answer: 1 },
    { id: 93, category: "Python", question: "How do you start a multi-line comment block in Python?", options: ["/* ... */", "''' ... '''", "### ... ###", "// ... //"], answer: 1 },
    { id: 94, category: "Python", question: "What does the len() function do?", options: ["Returns string in lowercase", "Returns memory allocation limit", "Returns the number of items in an object", "Generates a linear equation array"], answer: 2 },
    { id: 95, category: "Python", question: "Which operator is used for exponentiation (power calculation)?", options: ["^", "**", "pow", "xs"], answer: 1 },
    { id: 96, category: "Python", question: "How do you add an element to the end of a list?", options: ["add()", "insert()", "append()", "push()"], answer: 2 },
    { id: 97, category: "Python", question: "What is the output of print(2 * 3 ** 2)?", options: ["36", "18", "64", "12"], answer: 1 },
    { id: 98, category: "Python", question: "Which method removes all elements from a dictionary?", options: ["remove()", "clear()", "delete()", "flush()"], answer: 1 },
    { id: 99, category: "Python", question: "What is the output of 'hello'[1:4] string slicing?", options: ["ell", "hell", "ello", "el"], answer: 0 },
    { id: 100, category: "Python", question: "Which keyword is used to create a class in Python?", options: ["className", "struct", "object", "class"], answer: 3 }
];

let targetQuestions = questionBank;

// Application Variables
let currentQuestionIndex = 0;
let userAnswers = []; 
let timerInterval = null;
let totalTime = 30 * 60; // 30 Minutes

let candidateName = "";
let candidateEmpCode = "";
let candidateDept = "";

// DOM Elements
const loginForm = document.getElementById('login-form');
const adminLoginForm = document.getElementById('admin-login-form');
const loginContainer = document.getElementById('login-container');
const adminLoginContainer = document.getElementById('admin-login-container');
const examContainer = document.getElementById('exam-container');
const resultContainer = document.getElementById('result-container');
const adminDashboardContainer = document.getElementById('admin-dashboard-container');

document.getElementById('admin-switch-btn').addEventListener('click', () => {
    loginContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    adminLoginContainer.classList.remove('hidden');
});
document.getElementById('back-to-login').addEventListener('click', () => {
    adminLoginContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Candidate Submission Logic
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!targetQuestions || targetQuestions.length === 0) {
        alert("Error: Questions data file is missing or empty!");
        return;
    }

    if (userAnswers.length === 0) {
        userAnswers = new Array(targetQuestions.length).fill(null);
    }

    const inputEmpCode = document.getElementById('empcode').value.trim().toUpperCase();
    
    database.ref('submissions/' + inputEmpCode).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            alert(`Access Denied: Code [ ${inputEmpCode} ] has already submitted this test.`);
            return;
        }

        candidateName = document.getElementById('username').value.trim();
        candidateEmpCode = inputEmpCode;
        candidateDept = document.getElementById('department').value;
        
        loginContainer.classList.add('hidden');
        document.getElementById('admin-switch-btn').classList.add('hidden'); 
        examContainer.classList.remove('hidden');
        
        document.getElementById('display-user').innerText = candidateName;
        document.getElementById('display-empcode').innerText = candidateEmpCode;
        document.getElementById('display-dept').innerText = candidateDept;

        startClockCounter();
        refreshMatrixGridPalette();
        renderQuestionCard(0);
    });
});

function startClockCounter() {
    const clockView = document.getElementById('timer');
    timerInterval = setInterval(() => {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        clockView.innerText = `${minutes}:${seconds}`;
        
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Auto-submitting answers.");
            calculateFinalScoresReport();
        }
        totalTime--;
    }, 1000);
}

function refreshMatrixGridPalette() {
    const paletteGrid = document.getElementById('palette-grid');
    paletteGrid.innerHTML = '';
    targetQuestions.forEach((q, idx) => {
        const gridNode = document.createElement('div');
        gridNode.innerText = idx + 1;
        gridNode.classList.add('palette-no');
        
        if (userAnswers[idx] !== null) {
            gridNode.classList.add('attempted');
        } else {
            gridNode.classList.add('pending');
        }
        
        if (idx === currentQuestionIndex) {
            gridNode.classList.add('current');
        }
        
        gridNode.addEventListener('click', () => { renderQuestionCard(idx); });
        paletteGrid.appendChild(gridNode);
    });
}

function renderQuestionCard(index) {
    currentQuestionIndex = index;
    const qData = targetQuestions[index];
    
    document.getElementById('question-category').innerText = qData.category;
    // Uses textContent to show actual clean code symbols safely inside live quiz
    document.getElementById('question-text').textContent = `Q${index + 1}. ${renderCleanCodeText(qData.question)}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((txt, indexKey) => {
        const elementBtn = document.createElement('button');
        elementBtn.classList.add('option-btn');
        elementBtn.textContent = renderCleanCodeText(txt); 

        if (userAnswers[index] === indexKey) {
            elementBtn.classList.add('selected');
        }
        
        elementBtn.addEventListener('click', () => {
            userAnswers[index] = indexKey;
            refreshMatrixGridPalette();
            renderQuestionCard(index);
        });
        optionsContainer.appendChild(elementBtn);
    });

    document.getElementById('prev-btn').disabled = (index === 0);
    document.getElementById('next-btn').disabled = (index === targetQuestions.length - 1);
    refreshMatrixGridPalette();
}

document.getElementById('prev-btn').addEventListener('click', () => { if (currentQuestionIndex > 0) renderQuestionCard(currentQuestionIndex - 1); });
document.getElementById('next-btn').addEventListener('click', () => { if (currentQuestionIndex < targetQuestions.length - 1) renderQuestionCard(currentQuestionIndex + 1); });
document.getElementById('clear-btn').addEventListener('click', () => { userAnswers[currentQuestionIndex] = null; renderQuestionCard(currentQuestionIndex); });

document.getElementById('final-submit-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to submit your final test?")) calculateFinalScoresReport();
});

function calculateFinalScoresReport() {
    clearInterval(timerInterval); 
    let correctlyAnsweredCount = 0;
    const tbody = document.getElementById('result-tbody');
    tbody.innerHTML = '';
    
    targetQuestions.forEach((q, loopIdx) => {
        const activeUserChoice = userAnswers[loopIdx];
        const verifiedSystemChoice = q.options.indexOf(q.answer) !== -1 ? q.options.indexOf(q.answer) : q.answer;
        
        let displayUserChoiceString = (activeUserChoice !== null) ? q.options[activeUserChoice] : "Not Attempted";
        let displaySystemCorrectString = typeof verifiedSystemChoice === 'number' ? q.options[verifiedSystemChoice] : verifiedSystemChoice;
        
        let isCorrect = false;
        if (typeof verifiedSystemChoice === 'number') {
            isCorrect = (activeUserChoice === verifiedSystemChoice);
        } else {
            isCorrect = (displayUserChoiceString === verifiedSystemChoice);
        }

        const tr = document.createElement('tr');
        
        // 1. Sr No Cell
        const tdNo = document.createElement('td');
        const boldNo = document.createElement('b');
        boldNo.textContent = loopIdx + 1;
        tdNo.appendChild(boldNo);
        
        // 2. Category Badge Cell
        const tdCat = document.createElement('td');
        const spanBadge = document.createElement('span');
        spanBadge.className = 'badge';
        spanBadge.textContent = q.category;
        tdCat.appendChild(spanBadge);
        
        // 3. Question Text Cell (Transforms codes to genuine characters safely)
        const tdQuest = document.createElement('td');
        tdQuest.textContent = renderCleanCodeText(q.question); 
        
        // 4. User Answer Cell (Converts entities to raw readable formatting perfectly)
        const tdUserAns = document.createElement('td');
        tdUserAns.textContent = renderCleanCodeText(displayUserChoiceString); 
        
        // 5. Correct Answer Cell (Converts entities to raw readable formatting perfectly)
        const tdSysAns = document.createElement('td');
        tdSysAns.textContent = renderCleanCodeText(displaySystemCorrectString); 
        
        // 6. Verdict/Status Cell
        const tdStatus = document.createElement('td');
        const spanStatus = document.createElement('span');
        if (isCorrect) {
            correctlyAnsweredCount++;
            spanStatus.className = 'text-success';
            spanStatus.textContent = 'Correct';
        } else if (activeUserChoice === null) {
            spanStatus.className = 'text-warning';
            spanStatus.textContent = 'Skipped';
        } else {
            spanStatus.className = 'text-danger';
            spanStatus.textContent = 'Incorrect';
        }
        tdStatus.appendChild(spanStatus);
        
        tr.appendChild(tdNo);
        tr.appendChild(tdCat);
        tr.appendChild(tdQuest);
        tr.appendChild(tdUserAns);
        tr.appendChild(tdSysAns);
        tr.appendChild(tdStatus);
        
        tbody.appendChild(tr);
    });

    const percentResult = ((correctlyAnsweredCount / targetQuestions.length) * 100).toFixed(2);

    document.getElementById('res-name').innerText = candidateName;
    document.getElementById('res-code').innerText = candidateEmpCode;
    document.getElementById('res-dept').innerText = candidateDept;
    document.getElementById('res-score').innerText = `${correctlyAnsweredCount} / ${targetQuestions.length}`;
    document.getElementById('res-percent').innerText = percentResult;
    
    const cloudPayload = {
        timestamp: new Date().toLocaleString(),
        empCode: candidateEmpCode,
        name: candidateName,
        department: candidateDept,
        score: correctlyAnsweredCount,
        percentage: percentResult,
        savedAnswersPayload: [...userAnswers]
    };

    database.ref('submissions/' + candidateEmpCode).set(cloudPayload).then(() => {
        examContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        document.getElementById('admin-switch-btn').classList.remove('hidden');
    }).catch(err => {
        alert("Firebase Sync Failed: " + err.message);
    });
}

// Admin Dashboard Section
let globalCloudLogsCache = []; 

adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('admin-pass').value === 'admin123') {
        adminLoginContainer.classList.add('hidden');
        adminDashboardContainer.classList.remove('hidden');
        document.getElementById('admin-switch-btn').classList.add('hidden');
        
        database.ref('submissions').on('value', (snapshot) => {
            const cloudData = snapshot.val();
            globalCloudLogsCache = [];
            
            if (cloudData) {
                Object.keys(cloudData).forEach(key => {
                    globalCloudLogsCache.push(cloudData[key]);
                });
            }
            renderAdminDashboardLogs(globalCloudLogsCache);
        });
    } else {
        alert("Incorrect Admin Password!");
    }
});

function renderAdminDashboardLogs(logsList) {
    const adminTbody = document.getElementById('admin-tbody');
    adminTbody.innerHTML = '';
    let totalScoreSum = 0, maximumRecordScore = 0;

    if (logsList.length === 0) {
        adminTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8;">No records found.</td></tr>`;
    }

    logsList.forEach((log, index) => {
        let currentScore = parseFloat(log.score) || 0;
        totalScoreSum += currentScore;
        if(currentScore > maximumRecordScore) maximumRecordScore = currentScore;

        const row = document.createElement('tr');
        
        const tdTs = document.createElement('td');
        tdTs.textContent = log.timestamp;
        
        const tdCode = document.createElement('td');
        const boldCode = document.createElement('b');
        boldCode.textContent = log.empCode;
        tdCode.appendChild(boldCode);
        
        const tdName = document.createElement('td');
        tdName.textContent = log.name;
        
        const tdDept = document.createElement('td');
        tdDept.textContent = log.department;
        
        const tdScore = document.createElement('td');
        tdScore.innerHTML = `<span style="color:#bf0a30; font-weight:bold;">${log.score}</span> / ${targetQuestions.length}`;
        
        const tdPct = document.createElement('td');
        tdPct.textContent = `${log.percentage}%`;
        
        const tdAction = document.createElement('td');
        tdAction.innerHTML = `<button class="btn secondary sm" onclick="viewDetailedCandidateRecord(${index})">View Sheet</button>`;
        
        row.appendChild(tdTs);
        row.appendChild(tdCode);
        row.appendChild(tdName);
        row.appendChild(tdDept);
        row.appendChild(tdScore);
        row.appendChild(tdPct);
        row.appendChild(tdAction);
        
        adminTbody.appendChild(row);
    });

    document.getElementById('metric-total-tests').innerText = logsList.length;
    document.getElementById('metric-high-score').innerText = `${maximumRecordScore} / ${targetQuestions.length}`;
    
    let totalPossibleScore = logsList.length * targetQuestions.length;
    document.getElementById('metric-avg-percent').innerText = totalPossibleScore > 0 ? ((totalScoreSum / totalPossibleScore) * 100).toFixed(2) + '%' : '0%';
}

window.viewDetailedCandidateRecord = function(index) {
    const selectedRecord = globalCloudLogsCache[index];
    const modalTbody = document.getElementById('modal-tbody');
    modalTbody.innerHTML = '';
    document.getElementById('modal-title').innerText = `Review: ${selectedRecord.name} [${selectedRecord.empCode}]`;

    targetQuestions.forEach((q, loopIdx) => {
        const choiceIdx = selectedRecord.savedAnswersPayload[loopIdx];
        const verifiedSystemChoice = q.options.indexOf(q.answer) !== -1 ? q.options.indexOf(q.answer) : q.answer;
        
        let userChoiceStr = (choiceIdx !== null) ? q.options[choiceIdx] : "Not Attempted";
        let systemCorrectStr = typeof verifiedSystemChoice === 'number' ? q.options[verifiedSystemChoice] : verifiedSystemChoice;
        
        let isCorrect = false;
        if (typeof verifiedSystemChoice === 'number') {
            isCorrect = (choiceIdx === verifiedSystemChoice);
        } else {
            isCorrect = (userChoiceStr === verifiedSystemChoice);
        }

        const tr = document.createElement('tr');
        
        const tdNo = document.createElement('td');
        tdNo.textContent = loopIdx + 1;
        
        const tdCat = document.createElement('td');
        const spanBadge = document.createElement('span');
        spanBadge.className = 'badge';
        spanBadge.textContent = q.category;
        tdCat.appendChild(spanBadge);
        
        const tdQuest = document.createElement('td');
        tdQuest.textContent = renderCleanCodeText(q.question);
        
        const tdUser = document.createElement('td');
        tdUser.textContent = renderCleanCodeText(userChoiceStr);
        
        const tdSys = document.createElement('td');
        tdSys.textContent = renderCleanCodeText(systemCorrectStr);
        
        const tdVerdict = document.createElement('td');
        const spanVerdict = document.createElement('span');
        if (isCorrect) {
            spanVerdict.className = 'text-success';
            spanVerdict.textContent = 'Correct';
        } else if (choiceIdx === null) {
            spanVerdict.className = 'text-warning';
            spanVerdict.textContent = 'Skipped';
        } else {
            spanVerdict.className = 'text-danger';
            spanVerdict.textContent = 'Incorrect';
        }
        tdVerdict.appendChild(spanVerdict);
        
        tr.appendChild(tdNo);
        tr.appendChild(tdCat);
        tr.appendChild(tdQuest);
        tr.appendChild(tdUser);
        tr.appendChild(tdSys);
        tr.appendChild(tdVerdict);
        
        modalTbody.appendChild(tr);
    });
    document.getElementById('modal-overlay').classList.remove('hidden');
};

document.getElementById('close-modal-btn').addEventListener('click', () => { document.getElementById('modal-overlay').classList.add('hidden'); });

document.getElementById('clear-logs-btn').addEventListener('click', () => {
    if(confirm("Are you sure you want to delete all cloud data logs?")) {
        database.ref('submissions').remove().then(() => { alert("All data logs cleared successfully!"); });
    }
});

document.getElementById('admin-logout-btn').addEventListener('click', () => {
    database.ref('submissions').off(); 
    document.getElementById('admin-pass').value = '';
    adminDashboardContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    document.getElementById('admin-switch-btn').classList.remove('hidden');
});