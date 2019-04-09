$(document).ready(function () {
    // initialize firebase
    var config = {
        apiKey: "AIzaSyB_raMKAxEDD7vzCeLRfxbR2dPTv0AR-1g",
        authDomain: "train-scheduler-cd375.firebaseapp.com",
        databaseURL: "https://train-scheduler-cd375.firebaseio.com",
        projectId: "train-scheduler-cd375",
        storageBucket: "",
        messagingSenderId: "491018036059"
    };
    firebase.initializeApp(config);

    // variable to reference the database
    var database = firebase.database();

    // variables
    var arrival = "";
    var minutesAway = "";

    // button to add trains
    $('#submit-btn').on("click", function (event) {
        event.preventDefault();

        // user inputs
        var train = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();
        var firstTrain = $("#firstTrainInput").val().trim();

        // local temp object for train data
        var newTrain = {
            name: train,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain
        };

        // uploads train data to database
        database.ref().push(newTrain);

        // logs all to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.firstTrain);

        // alert on add
        alert("Train Added");

        // clears user inputs
        $("#trainInput").val("");
        $("#destinationInput").val("");
        $("#frequencyInput").val("");
        $("#firstTrainInput").val("");
    })

    // firebase event adding train data to database and displays text in html
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // store in variable
        var train = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;

        // time variables and time conversions
        var currentTime = moment();
        var firstTrainConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        var remainder = timeDiff % frequency;
        var minutesAway = frequency - remainder;
        var nextTrain = moment().add(minutesAway, "minutes");
        var nextTrainDisplay = moment(nextTrain).format("HH:mm")



        // time info
        console.log("Current time: " + moment().format("HH:mm"));
        console.log(firstTrainConverted.format("HH:mm"));
        console.log("Difference in time: " + timeDiff);
        console.log("Time remaining: " + remainder)
        console.log("Minutes away: " + minutesAway);
        console.log("Next arrival: " + nextTrainDisplay);

        // train info
        console.log(train);
        console.log(destination);
        console.log(frequency);


        // add into to new table row
        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrainDisplay),
            $("<td>").text(minutesAway),
        );

        // add new row to table
        $("#train-table > tbody").append(newRow);
    })



})