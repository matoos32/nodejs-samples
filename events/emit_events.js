/*
* [emit_events.js]
*
* MIT License
* 
* Copyright (c) 2024 Matt E
*
* Usage:  node emit_events.js
* Output: logged simulation of generated and emitted events
*/

import EventEmitter from "node:events";
import crypto from "node:crypto";

class Weather {

    temperature;
    humidity;
    uv;

    constructor(temperature, humidity, uv) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.uv = uv;
    }
}

let randInt = (minInclusive, maxExclusive) => {
    return Math.floor((Math.random() * (maxExclusive - minInclusive)) + minInclusive);
}

let getTimestampString = () => {
    return (new Date()).toISOString();
}

let logMessage = (message) => {
    console.log(`<${getTimestampString()}> ${message}`);
}

let logEvent = (eventName, payload) => {
    logMessage(`New event: ${eventName} [${ JSON.stringify(payload) }]`);
}

const events = new Map();

const EVT_HELLO = "Hello";
const EVT_WEATHER = "Weather";
const EVT_CALENDAR = "Calendar";

events.set(EVT_HELLO, "World!");
events.set(EVT_WEATHER, new Weather(32.7, 45.8, 6));
events.set(EVT_CALENDAR, new Date());

const emitter = new EventEmitter();

events.forEach((payload, eventName) => {
    emitter.on(eventName, (payload) => {
        logEvent(eventName, payload);
    });
});

const NUM_EVENTS_TO_EMIT = 5;
const MIN_INTERVAL_MS = 100;
const MAX_INTERVAL_MS = 10_000;

const eventNames = Array.from(events.keys());

for(let n = 0; n < NUM_EVENTS_TO_EMIT; n++) {

    const nameIdx = randInt(0, eventNames.length);
    const intervalMillis = randInt(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
    
    const uid = crypto.randomUUID();

    const timerId = setTimeout(() => {

        const eventName = eventNames[nameIdx];

        let payload = events.get(eventName);

        emitter.emit(eventName, {uuid: uid, interval: intervalMillis/1000 + "s", data: payload} );

    }, intervalMillis);

    logMessage(`Started timer [timerId:${timerId} uuid:${uid} interval(s):${intervalMillis/1000}]`);
}
