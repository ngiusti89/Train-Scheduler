$(document).ready(function () {
    // initialize firebase
    var config = {
        apiKey: "AIzaSyD0GBvD-lVpJKBgkgIvQKBxU8PL1TuRM7w",
        authDomain: "click-demo-e04de.firebaseapp.com",
        databaseURL: "https://click-demo-e04de.firebaseio.com",
        projectId: "click-demo-e04de",
        storageBucket: "click-demo-e04de.appspot.com",
        messagingSenderId: "969383784321"
    };
    firebase.initializeApp(config);

    // variable to reference the database
    var database = firebase.database();

    // variables
    let train = "";
    let destination = "";
    let frequency = "";
    let arrival = "";
    let minutesAway = "";

    // button to add trains
    $('#submit-btn').on("click", function (event) {
        event.preventDefault();

        // user inputs
        train = $("#trainInput").val().trim();
        destination = $("#destinationInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        // TODO: finish user inputs
    });
})