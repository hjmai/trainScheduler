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
    var firstTime = $('#firstTime').val().trim();
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
    console.log(childSnapshot);
    var row = $('<tr>');
    var trainNameCell = $('<td>').text(childSnapshot.val().trainName);
    var destinationCell = $('<td>').text(childSnapshot.val().destination);
    var firstTimeCell = $('<td>').text(childSnapshot.val().firstTime);
    var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
    row.append(trainNameCell);
    row.append(destinationCell);
    row.append(frequencyCell);
    
    $('.tableBody').append(row);
});

function nextArrival(firstArrival){
    var timeFormat = "HH:mm";
    
}

function convertTime(date){
    var dateFormat = "DD/MM/YY";
    var convertedDate = moment(date, dateFormat);
    return Math.abs(moment(convertedDate).diff(moment(), 'months'));
}