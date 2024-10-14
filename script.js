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
document.getElementById('startQuiz').onclick = function() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>
                                <input type="text" class="answerInput" placeholder="Your Answer">`;
        quizContainer.appendChild(questionDiv);
    });

    quizContainer.classList.remove('hidden');
    document.getElementById('submitQuiz').classList.remove('hidden');
};

// Submit quiz button functionality
document.getElementById('submitQuiz').onclick = function() {
    let correctAnswers = 0;
    const answerInputs = document.querySelectorAll('.answerInput');

    answerInputs.forEach((input, index) => {
        const userAnswer = input.value;
        if (userAnswer.toLowerCase() === questions[index].answer.toLowerCase()) {
            correctAnswers++;
        }
    });

    document.getElementById('result').innerText = `You got ${correctAnswers} out of ${questions.length} correct!`;
};

// Load questions for quiz (default questions)
window.onload = function() {
    if (questions.length === 0) {
        questions.push({ question: "What is the capital of France?", answer: "Paris" });
        questions.push({ question: "What is 2 + 2?", answer: "4" });
    }
};
