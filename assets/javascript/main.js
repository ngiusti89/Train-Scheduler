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
        
        // time variables
        var currentTime = moment();

        // train info
        console.log(train);
        console.log(destination);
        console.log(frequency);

        // TODO: 

        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(),
            $("<td>").text(),
            );

            $("#train-table > tbody").append(newRow);
    })



})




// database.ref().on("child_added", function (childSnapshot) {
//     // console.log(childSnapshot.val());

//     var name = childSnapshot.val().name;
//     var number = childSnapshot.val().number;
//     var destination = childSnapshot.val().destination;
//     var time = childSnapshot.val().time;
//     var frequency = childSnapshot.val().frequency;

//     // console.log(name, number, destination, time, frequency);

//     //time formatting
//     //this required a LOT of googling to figure out
//     var frequency = parseInt(frequency);
//     var currentTime = moment();

//     //console.log("Current time: " + moment().format("HHmm"));

//     //originally used mil format of HHMM but that failed with a null value
//     //looked up potential faults and it turns out that moment.js must use
//     //HH:mm for mil/euro time format
//     var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

//     //console.log("DATE CONVERTED: " + dateConvert);

//     var trainTime = moment(dateConvert).format("HHmm");

//     //console.log("Train time : " + trainTime);

//     //difference bw the times
//     var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
//     var timeDifference = moment().diff(moment(timeConvert), "minutes");

//     //console.log("Difference in time: " + timeDifference);

//     //remainder
//     var timeRemaining = timeDifference % frequency;

//     //console.log("Time remaining: " + timeRemaining);

//     //time until next train
//     var timeAway = frequency - timeRemaining;

//     //console.log("Minutes until next train: " + timeAway);

//     //next train arrival
//     var nextArrival = moment().add(timeAway, "minutes");

//     //figured out that adding "A" at the end of HH:mm will add AM or PM
//     //given that this is mil/euro format, the AM/PM is not necessary
//     //console.log("Arrival time: " + moment(nextArrival).format("HHmm"));

//     var arrivalDisplay = moment(nextArrival).format("HHmm");

//     //append data to table
//     $("#boardText").append(
//         "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
//         "<td id='numberDisplay'>" + childSnapshot.val().number +
//         "<td id='destinationDisplay'>" + childSnapshot.val().destination +
//         "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
//         "<td id='arrivalDisplay'>" + arrivalDisplay +
//         "<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");

//     // console.log(arrivalDisplay);
//     // console.log(timeAway);
// });