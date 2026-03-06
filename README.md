# MQTT Broker Setup Guide

A minimal Node.js demo for publishing and consuming MQTT messages. Use it to learn MQTT basics or to test your broker setup.

## What's in this repo

- **mqtt-producer.js** — Publishes JSON events to an MQTT topic every 3 seconds (event number + timestamp).
- **mqtt_consumer.js** — Subscribes to the same topic and prints every message it receives.

Both scripts use the same configurable broker URL and topic so you can run producer and consumer against any MQTT broker.

## Prerequisites

- **Node.js** (v14 or newer)
- An **MQTT broker** (local or remote). For example:
  - [Eclipse Mosquitto](https://mosquitto.org/) (local install or Docker)
  - Public test broker: `test.mosquitto.org` (no auth)
  - Your own broker (e.g. on port 5007)

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure broker and topic

Edit the broker URL and topic at the top of both files:

- **mqtt-producer.js** — set `brokerUrl` and `topic`
- **mqtt_consumer.js** — set `brokerUrl` and `topic`

Defaults:

- **Broker:** `mqtt://localhost:5007`
- **Topic:** `LINUX_LOGS`

To use the public test broker, uncomment and use:

```javascript
const brokerUrl = "mqtt://test.mosquitto.org";
```

### 3. Run the consumer

In one terminal:

```bash
node mqtt_consumer.js
```

You should see: `Connected to MQTT broker` and `Subscribed to topic: LINUX_LOGS`.

### 4. Run the producer

In another terminal:

```bash
node mqtt-producer.js
```

You should see: `Connected to MQTT broker` and repeated lines like:

`Event 0: HH:MM:SS published to topic LINUX_LOGS`.

Messages will appear in the consumer terminal.

## Project structure

```
.
├── README.md
├── package.json
├── mqtt-producer.js    # Publishes events every 3 seconds
└── mqtt_consumer.js    # Subscribes and logs messages
```

## Configuration reference

| Setting     | Producer / Consumer | Description                          |
|------------|----------------------|--------------------------------------|
| `brokerUrl`| Both                 | MQTT broker URL (e.g. `mqtt://host:port`) |
| `topic`    | Both                 | Topic name (default: `LINUX_LOGS`)   |

Message payload from the producer is JSON:

```json
{ "event": 0, "timestamp": "12:34:56" }
```

## Running a local broker (optional)

If you don’t have a broker yet, you can run Mosquitto with Docker:

```bash
docker run -d -p 1883:1883 -p 9001:9001 eclipse-mosquitto
```

Then in the scripts use:

```javascript
const brokerUrl = "mqtt://localhost:1883";
```

(Or keep `localhost:5007` if your broker is already bound to that port.)
