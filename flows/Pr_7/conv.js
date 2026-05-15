// Scale the temperature
var temperature = msg.payload.temp / 10;

// Create two separate messages for the chart
var msgTemp = { 
    topic: "Room Temperature", 
    payload: temperature 
};

var msgCount = { 
    topic: "Message Count", 
    payload: msg.payload.count 
};

// Return both messages to be plotted as two lines
return [ [msgTemp, msgCount] ];