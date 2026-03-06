const mqtt = require("mqtt");

// const brokerUrl = "mqtt://test.mosquitto.org";
const brokerUrl = "mqtt://localhost:5007";
// const brokerUrl = "mqttbroker.bdata.ca:5007";
const topic = "LINUX_LOGS"; // Replace with your desired MQTT topic

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
    console.log("Connected to MQTT broker");

    // Subscribe to the MQTT topic
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
        } else {
            console.error("Error subscribing to topic:", err);
        }
    });
});

client.on("message", (receivedTopic, receivedMessage) => {
    // Log the received message
    console.log(`Received message on topic ${receivedTopic}: ${receivedMessage.toString()}`);
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
