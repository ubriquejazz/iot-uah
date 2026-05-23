var client = null;

// Called after form input is processed
function startConnect() {
    
    var status = document.getElementById("boilerStatus");
    status.style.color = "#f1c40f"; // Yellow
    status.innerText = "● Conectando...";

    // Generate a random client ID
    var clientID = "clientID-" + parseInt(Math.random() * 1000);
    var host = "192.168.1.104";  //document.getElementById("host").value;
    var port = "8083"; 			//document.getElementById("port").value;

    // Print output for the user in the messages div
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    messagesDiv.innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection, callback handlers
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect,
    });
}

function subscribe(topic) { 
    var messagesDiv = document.getElementById("messages");
    client.subscribe(topic);  
    messagesDiv.innerHTML += `<span>Subscribing to: ${topic}</span><br/>`;
}

// Called when the client connects
function onConnect() {
    
    var status = document.getElementById("boilerStatus");
    status.style.color = "#2ecc71"; // Green
    status.innerText = "● Conectado";

    // Subscribe to the requested topic
    subscribe("hello");
    subscribe("topic_disco");
    subscribe("topic_threshold");
    subscribe("topic_relay");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    
    var status = document.getElementById("boilerStatus");
    status.style.color = "#e74c3c"; // Red
    status.innerText = "● Desconectado";

    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

function debug_response(topic, value) {
    var date = new Date();
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML +=
        '<span>' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() +
        "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ": " +
        topic + '  | ' + value + '</span><br/>';
}

// Called when a message arrives
function onMessageArrived(message) {
    // Log the received message payload to the console
    console.log("onMessageArrived: " + message.payloadString);
    var lectura = JSON.parse(message.payloadString);

    var topic = message.destinationName;
    var value = message.payloadString;
    debug_response(topic, value);

    {
        updateCurrent(lectura.temp, 20.0); 
        document.getElementById("timestamp").innerHTML = lectura.count;
    }

}

// Called when the disconnection button is pressed
function startDisconnect() {
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += '<span>Disconnected</span><br/>';
    client.disconnect();
}

// Updates #messages div to auto-scroll
function updateCurrent(corriente, threshold) {
    var tempNum = parseFloat(corriente);
    if (isNaN(tempNum)) {
        console.error("Invalid value received:", corriente);
        return; 
    }
    document.getElementById("corriente").innerHTML = tempNum + " mA";

    if (tempNum < threshold) {
        barColor = "#3498db"; // Cold -> Blue
    } else {
        barColor = "#e74c3c"; // Too Hot / Danger -> Red
    }
    // Apply the selected color to the element
    document.getElementById("ilu").style.backgroundColor = barColor;

}

function updateTemperature(temperatura) {
    var tempNum = parseFloat(temperatura);
    if (isNaN(tempNum)) {
        console.error("Invalid value received:", temperatura);
        return; 
    }
    document.getElementById("temperatura").innerHTML = tempNum + " &ordm;C";
    
    // Calculate and round colors using our clean number
    var color_R = Math.round((tempNum / 100.0) * 255);
    var color_B = Math.round(((100.0 - tempNum) / 100.0) * 255);
    document.getElementById("temp").style.backgroundColor = "rgb(" + color_R + ", 0, " + color_B + ")";
    
    // Update the progress bar width
    document.getElementById("temp").style.width = tempNum + "px";
}