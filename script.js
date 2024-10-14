let questions = [];
const adminPassword = "admin123"; // Set your admin password here

// Admin functionality
document.getElementById('loginButton').onclick = function() {
    const password = document.getElementById('adminPassword').value;
    if (password === adminPassword) {
        document.getElementById('adminArea').classList.remove('hidden');
    } else {
        alert('Incorrect password');
    }
};

document.getElementById('addQuestionButton').onclick = function() {
    const questionText = document.getElementById('questionInput').value;
    const answerText = document.getElementById('answerInput').value;

    if (questionText && answerText) {
        questions.push({ question: questionText, answer: answerText });
        updateQuestionList();
        clearInputs();
    } else {
        alert('Please enter both question and answer');
    }
};

function updateQuestionList() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}: ${q.question} (Answer: ${q.answer})`;
        questionList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('questionInput').value = '';
    document.getElementById('answerInput').value = '';
}

// Quiz functionality
document.getElementById('submitQuiz').onclick = function() {
    let correctAnswers = 0;
    questions.forEach(q => {
        const userAnswer = prompt(q.question);
        if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
            correctAnswers++;
        }
    });
    document.getElementById('result').innerText = `You got ${correctAnswers} out of ${questions.length} correct!`;
};

// Load questions for quiz
window.onload = function() {
    if (questions.length === 0) {
        questions.push({ question: "What is the capital of France?", answer: "Paris" });
        questions.push({ question: "What is 2 + 2?", answer: "4" });
    }
};
