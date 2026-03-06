const mqtt = require("mqtt");

// const brokerUrl = "mqtt://test.mosquitto.org";
const brokerUrl = "mqtt://localhost:5007";
// const brokerUrl = "mqtt://v2.dev.bdata.ca:5007";
const topic = "LINUX_LOGS"; // Replace with your desired MQTT topic

const client = mqtt.connect(brokerUrl);

const formatTime = (timestamp) => {
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    const seconds = timestamp.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

let eventNumber = 0;

const produceEvent = () => {
    const timestamp = formatTime(new Date());

    client.publish(topic, JSON.stringify({ event: eventNumber, timestamp: timestamp }))
    console.log(`Event ${eventNumber}: ${timestamp} published to topic ${topic}`);


    // Increment the event number for the next event
    eventNumber++;

    // Schedule the next event after 3 seconds
    setTimeout(produceEvent, 3000);
};

client.on("connect", () => {
    console.log("Connected to MQTT broker");

    // Start producing events
    produceEvent();
});

client.on("error", (error) => {
    console.error("MQTT Error:", error);
    client.end();
});

client.on("close", () => {
    console.log("Connection to MQTT broker closed");
});

client.on("offline", () => {
    console.log("MQTT client is offline");
});
