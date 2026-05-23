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
    subscribe("topic_esp");
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

// Called when a message arrives
function onMessageArrived(message) {
    // Log the received message payload to the console
    console.log("onMessageArrived: " + message.payloadString);
    
    // Extract topic and payload value from the message
    var topic = message.destinationName;
    var value = message.payloadString;

    var lectura = JSON.parse(message.payloadString);

    // Get the current date and time
    var date = new Date();
    
    // Append message information to the messages element
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML +=
        '<span>' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() +
        "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ": " +
        topic + '  | ' + value + '</span><br/>';

    // Call the updateScroll function
    updateScroll(lectura.iluminacion); 
    updateTemperature(lectura.temperatura); 

}

// Called when the disconnection button is pressed
function startDisconnect() {
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += '<span>Disconnected</span><br/>';
    client.disconnect();
}

// Updates #messages div to auto-scroll
function updateScroll(iluminacion) {
    document.getElementById("iluminacion").innerHTML = iluminacion + " mA";
    // cambia la saturación de color en función de la iluminación
    document.getElementById("ilu").style.backgroundColor = "hsl(50, " + iluminacion + "%, 49%)";
}

// example 7
function updateTemperature(temperatura){
    document.getElementById("temperatura").innerHTML = temperatura + " &ordm;C";
    // Cambia el color y el tamaño en función de la temperatura de azul a rojo
    color_R=(temperatura/100.0)*255;
    color_B=((100.0-temperatura)/100)*255;
    document.getElementById("temp").style.backgroundColor = "rgb("+color_R+",0,"+color_B+")";
    document.getElementById("temp").style.width=""+temperatura+"px";
}
