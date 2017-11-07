// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxZgkKc6mQbmigQxvLLuCBXgET8-En5UQ",
    authDomain: "train-scheduler-1fd26.firebaseapp.com",
    databaseURL: "https://train-scheduler-1fd26.firebaseio.com",
    projectId: "train-scheduler-1fd26",
    storageBucket: "train-scheduler-1fd26.appspot.com",
    messagingSenderId: "349908273633"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = 0;
  var currentTime = moment();
  var index = 0;
  var trainIDs = [];




  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainTime = $("#first-input").val().trim();
  	var trainFrequency = $("#frequency-input").val().trim();
  	

  	var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  		console.log("traintimeconverted: " + trainTimeConverted);


  	var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  		console.log("Difference in time: " + diffTime);
  	
  	var tRemainder = diffTime % trainFrequency;
  		console.log("time remaining: " + tRemainder);

  	var minutesAway = trainFrequency - tRemainder;
  		console.log("min away: " + minutesAway);

  	var trainNext = moment().add(minutesAway, "minutes");
  		console.log("Arrival time: " + moment(trainNext).format("hh:mm"));


  	var addTrain = {
  		name: trainName,
  		destination: trainDestination,
  		time: trainTime,
  		frequency: trainFrequency,
  	};

  	database.ref().push(addTrain);

  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#first-input").val("");
  	$("#frequency-input").val("");
  });


 database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  
  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainTime = childSnapshot.val().time;
  	var trainFrequency = childSnapshot.val().frequency;

  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainTime);
  	console.log(trainFrequency);

  	var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  		console.log("traintimeconverted: " + trainTimeConverted);


  	var diffTime = moment().diff(moment.unix(trainTimeConverted), "minutes");
  		console.log("Difference in time: " + diffTime);
  	
  	var tRemainder = moment().diff(moment.unix(trainTimeConverted), "minutes") % trainFrequency;
  		console.log("time remaining: " + tRemainder);

  	var minutesAway = trainFrequency - tRemainder;
  		console.log("min away: " + minutesAway);

  	var trainNext = moment().add(minutesAway, "m").format("hh:mm A");
  		console.log("Arrival time: " + moment(trainNext).format("hh:mm"));

  	$("#train-table > tbody").append("<tr><td>" 
  		+ trainName + "</td><td>" + trainDestination + "</td><td>" 
  		+ trainFrequency + "</td><td>" + trainNext + "</td><td>" 
  		+ minutesAway + "</td></tr>");


	}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
	});


