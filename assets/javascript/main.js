$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD0GBvD-lVpJKBgkgIvQKBxU8PL1TuRM7w",
        authDomain: "click-demo-e04de.firebaseapp.com",
        databaseURL: "https://click-demo-e04de.firebaseio.com",
        projectId: "click-demo-e04de",
        storageBucket: "click-demo-e04de.appspot.com",
        messagingSenderId: "969383784321"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();


    let train = "";
    let destination = "";
    let frequency = "";
    let arrival = "";
    let minutesAway = "";

    // capture button submit
    $('#submit-btn').on("click", function (event) {
        event.preventDefault();

        train = $("#trainInput").val().trim();
        destination = $("#destinationInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

    });
})