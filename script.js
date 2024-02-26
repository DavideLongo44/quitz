// Funktion zum Weiterleiten zur Seite quiz.html
function goToQuiz() {

    // Deklarieren und initialisieren der Variablen username mit dem Wert des Eingabefelds mit der ID username
    var username = document.getElementById('username').value;

    // Prüfen, ob der Wert der Variablen username nicht leer ist
    if (username.trim() !== '') {

        // Speichern des Namens des Benutzers im lokalen Speicher
        localStorage.setItem('username', username);

        // Speichern der URL der Seite quiz.html in der Variablen page2Url
        var page2Url = "quiz.html";

        // Umleitung des Benutzers zur Seite quiz.html
        window.location.href = page2Url;
    } else {

        // Anzeigen eines Alert-Fensters mit der Meldung "vor dem Start einen Namen eingeben"
        alert('vor dem Start einen Namen eingeben');
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Abrufen des Benutzernamens aus localStorage
var username = localStorage.getItem('username');

//Eine Willkommensnachricht auf Seite 2 anzeigen
if (username) {
    document.getElementById('welcome-message').innerText = 'Herzlich willkommen, ' + username + '!';
} else {
    document.getElementById('welcome-message').innerText = 'Benutzername nicht verfügbar.';
}
const startTime = performance.now();


// Einfügen von verschiedenen Fragen, von denen 10 mit Hilfe der Funktion shuffleArray zufällig ausgewählt werden
let questions = [
    {
        question: "Was ist die Hauptstadt von Italien?",
        options: ["Berlin", "Madrid", "Paris", "Roma"],
        answer: "Roma"
    },
    {
        question: "Welches ist die beste Mannschaft in Italien?",
        options: ["Juventus", "Napoli", "Inter", "Lazio"],
        answer: "Juventus"
    },
    {
        question: "Wie viele Meisterschaften hat Juventus in Folge gewonnen?",
        options: ["5", "7", "9", "3"],
        answer: "9"
    },
    {
        question: "Welches ist das größte Land der Erde?",
        options: ["Russland", "China", "Kanada", "USA"],
        answer: "Russland"
    },
    {
        question: "Welches ist das Nationalgericht von Italien?",
        options: ["pizza", "pasta", "gelato", "banana"],
        answer: "pizza"
    },
    {
        question: "Welches ist das höchste Gebirge der Welt?",
        options: ["K2", "Mount Everest", "Kangchendzönga", "lhotse"],
        answer: "Mount Everest"
    },
    {
        question: "Welche ist die Hauptstadt von Frankreich?",
        options: ["Marseille", "Lyon", "Paris", "bordeaux"],
        answer: "Paris"
    },
    {
        question: "Wer ist der Erfinder des Telefons?",
        options: ["Davide Longo", "Nikola Tesla", "Paris Hilton", "Alexander Graham Bell"],
        answer: "Alexander Graham Bell"
    },
    {
        question: "Wer ist der bekannteste Italiener der Welt?",
        options: ["Super Mario", "Leonardo Da Vinci", "Berlusconi", "Davide Longo"],
        answer: "Leonardo Da Vinci"
    },
    {
        question: "der berühmteste Anime der Welt?",
        options: ["Dragon Ball", "Naruto", "Barbapapa", "Onepiece"],
        answer: "Dragon Ball"
    },
    {
        question: "RAM ist ein Nur-Lese-Speicher?",
        options: ["Ja", "Nein"],
        answer: "Ja"
    },
    {
        question: "Ist das ein gutes Programm?",
        options: ["Ja", "Nein"],
        answer: "Ja"
    },
    {
        question: "Japan aus vier Hauptinseln besteht?",
        options: ["Ja", "Nein"],
        answer: "Nein"
    },

];
// Wir geben die maximale Anzahl von fragen an
const maxQuestions = 10;
// Aktueller Index der Frage
let currentQuestionIndex = 0;
//Aktueller korrekten Atworten
let correctAnswers = 0;
//timer variable
let timer;
//HTML Elemente
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");
const totalTimeElement = document.getElementById("totalTime");

nextButton.style.display = "none";
// Funktion zum Zurücksetzen des Timers auf eine bestimmte Anzahl von Sekunden
function resetTimer(seconds) {
    clearInterval(timer);
    timerElement.textContent = seconds;
}
//funktion zu Starten des Timers
function startTimer(seconds) {
    let timeRemaining = seconds;
    //timer aktualizieren
    function updateTimer() {
        timerElement.textContent = `Hast du noch: ${timeRemaining} Sekunden`;
        //wenn die Zeit auf 0 fällt, wird eine Nullantwort simuliert
        if (timeRemaining === 0) {
            clearInterval(timer);
            checkAnswer(null);
        } else {
            timeRemaining--;
        }
    }
    // aktualisierung timer 1000 ms = 1 sec
    timer = setInterval(updateTimer, 1000);
}
//Random fragen funktion array
function shuffleQuestions(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
// Funktion zur Anzeige der aktuellen frage
function showQuestion() {
    //Es wird geprüft, ob die Anzahl der aktuellen frage geringer ist als die maximale Anzahl der fragen.
    if (currentQuestionIndex < maxQuestions) {
        //timer neustarten
        resetTimer(15); 
        startTimer(15);
        //aktuelle frage abrufen
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        // vermischt die Antworten
        //const shuffledQuestion = shuffleArray(currentQuestion.question);
        const shuffledOptions = shuffleQuestions(currentQuestion.options);
        //macht Atworten als Buttons für jede 
        shuffledOptions.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            optionsElement.appendChild(button);
        });

        nextButton.disabled = true;
        currentQuestionIndex++;
    } else {
        //wenn wir 10 Antworten erreicht haben, gelangen wir zu der Funktion showResult um die Ergebnisse zu zeigen
        showResult(username);
    }
}
// Funktion zum Überprüfen der Antwort
function checkAnswer(selectedOption) {
    //timer stoppen
    clearInterval(timer);
    //abrufen aktuellen frage
    const currentQuestion = questions[currentQuestionIndex - 1];
    //überprüfung korrekte Antwort
    if (selectedOption === currentQuestion.answer) {
        //Zähler, der ausgelöst wird, wenn die Antwort richtig ist
        correctAnswers++;

        showFeedback("richtige Antwort");
    
    }
    else {
        showFeedback("Falsche Antwort");
    }
    //wiederholt die Funktion, wenn der aktuelle Index der Anträge kleiner ist als die maximale Anzahl der Anträge
    if (currentQuestionIndex < maxQuestions) {
        showQuestion();
    // sonst Ergebnisse anzeigen   
    } else {
        showResult(username);
    }
    
}
//feedback funtion
function showFeedback(message) {
    feedbackElement.textContent = message;
    //entfernt die Rückmeldung nach 2 Sekunden
    setTimeout(() => {
        feedbackElement.textContent = "";
    }, 2000);
}
// Funktion zum Anzeigen der Ergebnisse
function showResult(username) {
    //// Frage- und Options-Elemente leeren
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    //// Ergebnisse anzeigen
    resultElement.textContent = `${username}, du hast ${correctAnswers} von 10 Fragen richtig beantwortet.`;
    nextButton.style.display = "none";
    //feedback leeren
    feedbackElement.textContent = "";
    //endzeit des spiel
    const endTime = performance.now();
    //rechnen und zeigen das gesamtezeit
    const totalTime = (endTime - startTime) / 1000;
    totalTimeElement.textContent = `Verbrauchte Zeit ${totalTime.toFixed(2)} Sekunden`;
    timerElement.textContent = "";
}
//quiz start
//frage randomizer
questions = shuffleQuestions(questions);
showQuestion();
//zurück zum homepage
function goBack() {
    window.location.href = "index.html";
}