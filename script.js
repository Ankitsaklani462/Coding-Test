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

// Application Variables
let currentQuestionIndex = 0;
let userAnswers = []; 
let timerInterval = null;
let totalTime = 30 * 60; // 30 Minutes

let candidateName = "";
let candidateEmpCode = "";
let candidateDept = "";

let targetQuestions = [];
if (typeof questionBank !== 'undefined') {
    targetQuestions = questionBank;
} else if (window.questions) {
    targetQuestions = window.questions;
}

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
    document.getElementById('question-text').innerText = `Q${index + 1}. ${qData.question}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((txt, indexKey) => {
        const elementBtn = document.createElement('button');
        elementBtn.classList.add('option-btn');
        elementBtn.innerText = txt;

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
        let rowStatusLabel = "";
        
        let isCorrect = false;
        if (typeof verifiedSystemChoice === 'number') {
            isCorrect = (activeUserChoice === verifiedSystemChoice);
        } else {
            isCorrect = (displayUserChoiceString === verifiedSystemChoice);
        }

        if (isCorrect) {
            correctlyAnsweredCount++;
            rowStatusLabel = `<span class="text-success">Correct</span>`;
        } else if (activeUserChoice === null) {
            rowStatusLabel = `<span class="text-warning">Skipped</span>`;
        } else {
            rowStatusLabel = `<span class="text-danger">Incorrect</span>`;
        }
        
        const markupRow = document.createElement('tr');
        markupRow.innerHTML = `<td><b>${loopIdx + 1}</b></td><td><span class="badge">${q.category}</span></td><td>${q.question}</td><td>${displayUserChoiceString}</td><td>${displaySystemCorrectString}</td><td>${rowStatusLabel}</td>`;
        tbody.appendChild(markupRow);
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

// Admin System
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
        row.innerHTML = `
            <td>${log.timestamp}</td>
            <td><b>${log.empCode}</b></td>
            <td>${log.name}</td>
            <td>${log.department}</td>
            <td><span style="color:#bf0a30; font-weight:bold;">${log.score}</span> / ${targetQuestions.length}</td>
            <td>${log.percentage}%</td>
            <td><button class="btn secondary sm" onclick="viewDetailedCandidateRecord(${index})">View Sheet</button></td>
        `;
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

        let rowBadge = isCorrect ? `<span class="text-success">Correct</span>` : (choiceIdx === null ? `<span class="text-warning">Skipped</span>` : `<span class="text-danger">Incorrect</span>`);

        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${loopIdx + 1}</td><td><span class="badge">${q.category}</span></td><td>${q.question}</td><td>${userChoiceStr}</td><td>${systemCorrectStr}</td><td>${rowBadge}</td>`;
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