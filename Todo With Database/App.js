import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyA7EpRRV_sXowqcCInfKeUuvl5fROGKF3Q",
    authDomain: "todo-list-app-hammad.firebaseapp.com",
    projectId: "todo-list-app-hammad",
    storageBucket: "todo-list-app-hammad.appspot.com",
    messagingSenderId: "747769400024",
    appId: "1:747769400024:web:42005f3b2b11942ea1e5ad",
    measurementId: "G-7TTWG0X46J"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var database = getDatabase(app);
var hahaha = document.getElementById("hhuuu");
var card = document.getElementById("cards-main");
var inp = document.getElementById("sha");

// Initialize the array from localStorage or create an empty one
var arrayOfTasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.dataShow = function() {
    arrayOfTasks.push({ text: inp.value });
    card.innerHTML = "";
    Show();
    var referId = ref(database);
    var ID = push(referId).key;
    arrayOfTasks.id = ID;
    var reference = ref(database, `todolist/${arrayOfTasks.id}`);
    set(reference, arrayOfTasks);

    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

window.Show = function Show() {
    for (var i = 0; i < arrayOfTasks.length; i++) {
        var task = arrayOfTasks[i];
        card.innerHTML += `
            <div class="task d-flex">
                <p>${task.text}</p>
                <button onclick="editTask(${i})">Edit</button>
                <button onclick="del(${i})">Delete</button>
            </div>`;
    }
    inp.value = "";
}

window.del = function del(index) {
    arrayOfTasks.splice(index, 1);
    card.innerHTML = "";
    Show();
    // Update tasks in localStorage after deletion
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

window.editTask = function editTask(index) {
    var newText = prompt("Edit the task:", arrayOfTasks[index].text);
    if (newText !== null) {
        arrayOfTasks[index].text = newText;
        card.innerHTML = "";
        Show();
        // Update tasks in localStorage after editing
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    }
}

// Load tasks from localStorage on page load
window.addEventListener('load', function() {
    Show();
});