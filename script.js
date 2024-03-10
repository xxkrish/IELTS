document.addEventListener("DOMContentLoaded", function() {
    var tableBody = document.querySelector("#answerTable tbody");

    // Generate rows
    for (var i = 1; i <= 40; i++) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td contenteditable="true" onkeydown="moveToNextRow(event)"></td>
            <td>
                <input type="radio" name="evaluation_${i}" value="correct"> Correct
                <input type="radio" name="evaluation_${i}" value="incorrect"> Incorrect
            </td>`;
        tableBody.appendChild(row);
    }

    // Load history from Local Storage
    loadHistory();
});

function moveToNextRow(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var cell = event.target;
        var nextRow = cell.parentNode.nextSibling;
        while (nextRow && nextRow.nodeType !== 1) {
            nextRow = nextRow.nextSibling;
        }
        if (nextRow) {
            var nextCell = nextRow.querySelector("td:nth-child(2)");
            if (nextCell) {
                nextCell.focus();
            }
        }
    }
}

function clearAnswers() {
    var answerCells = document.querySelectorAll("#answerTable tbody td:nth-child(2)");
    answerCells.forEach(function(cell) {
        cell.textContent = "";
    });
}

function checkAnswers() {
    var correctCount = 0;
    var evaluationRadioButtons = document.querySelectorAll('input[type="radio"][value="correct"]:checked');
    correctCount = evaluationRadioButtons.length;
    document.getElementById("result").textContent = correctCount + "/40";

    var bandScore = calculateBandScore(correctCount);
    document.getElementById("band-score").textContent = "Band Score: " + bandScore;
}

function saveResult() {
    var correctCount = parseInt(document.getElementById("result").textContent.split('/')[0]);
    var bandScore = calculateBandScore(correctCount);

    var result = correctCount + "/40";
    var historyList = document.getElementById("historyList");
    var listItem = document.createElement("li");
    listItem.textContent = "Result: " + result + ", Band Score: " + bandScore;
    historyList.appendChild(listItem);

    // Save history to Local Storage
    localStorage.setItem("history", historyList.innerHTML);
}


function loadHistory() {
    var historyList = document.getElementById("historyList");
    var savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
}

function clearHistory() {
    var historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    localStorage.removeItem("history");
}

function calculateBandScore(correctCount) {
    if (correctCount >= 39) {
        return 9;
    } else if (correctCount >= 37) {
        return 8.5;
    } else if (correctCount >= 35) {
        return 8;
    } else if (correctCount >= 32) {
        return 7.5;
    } else if (correctCount >= 30) {
        return 7;
    } else if (correctCount >= 26) {
        return 6.5;
    } else if (correctCount >= 23) {
        return 6;
    } else if (correctCount >= 18) {
        return 5.5;
    } else if (correctCount >= 16) {
        return 5;
    } else if (correctCount >= 13) {
        return 4.5;
    } else if (correctCount >= 10) {
        return 4;
    } else {
        return 0;
    }
}
