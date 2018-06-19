var config = {
    apiKey: "AIzaSyAIdZY2VqpdRt0YPBPVUaufUGd42wqCXKw",
    authDomain: "trainscheduler-3dadf.firebaseapp.com",
    databaseURL: "https://trainscheduler-3dadf.firebaseio.com",
    projectId: "trainscheduler-3dadf",
    storageBucket: "trainscheduler-3dadf.appspot.com",
    messagingSenderId: "1097938106041"
};

firebase.initializeApp(config);
var database = firebase.database();

$('#add-employee-btn').on('click', function () {
    event.preventDefault();
    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = moment($("#firstTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    console.log(firstTime);
    var frequency = $('#frequency').val().trim();
    
    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTime').val('');
    $('#frequency').val('');
    
    database.ref().push({
        trainName : trainName,
        destination : destination,
        firstTime : firstTime,
        frequency : frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on('child_added', function(childSnapshot){
    var row = $('<tr>');
    var trainNameCell = $('<td>').text(childSnapshot.val().trainName);
    var destinationCell = $('<td>').text(childSnapshot.val().destination);
    var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
    
    // Calculate Times
    var timeRemainder = moment().diff(moment.unix(childSnapshot.val().firstTime), "minutes") % childSnapshot.val().frequency;
    var minutes = childSnapshot.val().frequency - timeRemainder;
    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
    var minutesAwayCell = $('<td>').text(minutes);
    var nextArrivalCell = $('<td>').text(nextTrainArrival);
    
    row.append(trainNameCell);
    row.append(destinationCell);
    row.append(frequencyCell);
    row.append(nextArrivalCell);
    row.append(minutesAwayCell);
    $('.tableBody').append(row);
});