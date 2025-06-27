/*
🖼️ 1. Mood-Based Theme
Change the background color or style of the page based on the selected mood.

Example:

Happy → Light yellow theme

Sad → Cool blue

Angry → Red/Orange

Excited → Bright pink

Tired → Soft grey

📌 Update showForm() to apply a theme class to <body> dynamically.
*/


// Common function to create textarea + save button
function showForm(moodText, mood,color) {
    let bod=document.querySelector("body");
   
    bod.style.background=color;
    const b = document.querySelector("main");
    b.innerHTML = `
        <h2 style="color:white">${moodText}</h2>
        <h3>Write your journal entry below:</h3>
        <textarea id="ta" placeholder="Enter your journal..."></textarea><br>
        <button onclick="saveEntry('${mood}')">Save Entry</button>
    `;
}

// Modify each mood function
function happy() {
    showForm("Hey I'm very happy that you are happy!", "Happy","#FFF9C4");
    
}
function sad() {
    showForm("Hey I'm very sorry that you are sad.", "Sad","#BBDEFB");
}
function excited() {
    showForm("Hey I'm very happy that you are excited!", "Excited","#F8BBD0");
}
function tired() {
    showForm("Hey I'm here to comfort you as you're tired.", "Tired","#E0E0E0");
}
function angry() {
    showForm("Hey, express your anger here.", "Angry","#FFCDD2");
}

// Save the journal entry
function saveEntry(mood) {
    const text = document.getElementById("ta").value;
    const datetime = new Date().toLocaleString();

    if (!text.trim()) {
        alert("Please write something!");
        return;
    }

    const entry = { mood, text, datetime };
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    goBackToMain();
    displayEntries();
}

// Return to main mood selection view
function goBackToMain() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <div class="container"> 
            <div id="happy" onclick="happy()">&#128512Happy</div>
            <div id="sad" onclick="sad()">&#128532Sad</div>
            <div id="excited" onclick="excited()">&#128526Excited</div>
            <div id="tired" onclick="tired()">&#128531Tired</div>
            <div id="angry" onclick="angry()">&#128545Angry</div>
        </div>
        <section id="entries"></section>
    `;
}

// Display saved entries
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const section = document.getElementById("entries");
    if (!section) return;

    section.innerHTML = "<h2 style='color:white'>Your Journal Entries</h2>";

    entries.slice().reverse().forEach(entry => {
        section.innerHTML += `
            <div style="background: rgba(255,255,255,0.1); margin: 10px; padding: 10px; border-radius: 8px;">
                <strong>${entry.mood}</strong> – ${entry.datetime}<br>
                <p>${entry.text}</p>
            </div>
        `;
    });
}

// Show entries on page load
window.onload = () => {
    displayEntries();
};
