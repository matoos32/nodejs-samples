/*
* [json_to_obj.js]
*
* MIT License
* 
* Copyright (c) 2024 Matt E
*
* Usage:  node json_to_obj.js
* Output: logged creation and populating of new objects instantiated from prototype
*/

const WEATHER_JSON = `{
  "records": [
    {
      "recorded_at": "2024-02-12T00:27:38.495Z",
      "latitude": 44.750000,
      "longitude": -34.002300,
      "temperature": 31.78,
      "humidity": 56.1,
      "uv": 6
    },
    {
      "recorded_at": "2024-02-12T00:31:12.106Z",
      "latitude": 44.720000,
      "longitude": -34.470000,
      "temperature": 32.4,
      "humidity": 60.3,
      "uv": 5.34
    },
    {
      "recorded_at": "2024-02-12T00:35:53.708Z",
      "latitude": 44.730000,
      "longitude": -34.950000,
      "temperature": 32.29,
      "humidity": 59.79,
      "uv": 6.1
    }
  ]
}`;

const data = JSON.parse(WEATHER_JSON);

const weatherRecordPrototype = {
  recorded_at: null,
  latitude: 0.0,
  longitude: 0.0,
  temperature: 0.0,
  humidity: 0.0,
  uv: 0.0,

  // Alternative toString() definition but this way of adding it to the prototype makes toString() enumerable.
  // toString: function () { return `[ts:${this.recorded_at}, location:(${this.latitude},${this.longitude}), t:${this.temperature}, h:${this.humidity}, uv:${this.uv}]` }
}

// Adding toString will override the default Object.prototype.toString()
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

Object.defineProperty(weatherRecordPrototype, 'toString', {
  value: function () { return `[ts:${this.recorded_at}, location:(${this.latitude},${this.longitude}), t:${this.temperature}, h:${this.humidity}, uv:${this.uv}]` },
  writeable: false,
  configurable: false,
  enumerable: false // note the false enumerability!
});

console.log("\nWeather record prototype:");
console.log(weatherRecordPrototype);

const weatherRecords = data.records.map(record => {

  console.log("\nParsed record:");
  console.log(record);

  const weatherRecord = Object.create(weatherRecordPrototype);

  console.log(`New record instance: ${weatherRecord.toString()}`);

  Object.assign(weatherRecord, record);

  Object.freeze(weatherRecord);

  console.log(`Populated record:    ${weatherRecord.toString()}`);

  return weatherRecord;
});


if (weatherRecords.length > 0) {

  console.log("\nListing all records:\n");

  for (let i = 0; i < weatherRecords.length; i++) {
    console.log(`${i+1}. ${weatherRecords[i].toString()}`);
  }

  console.log("\nAttempting to modify a frozen record. We expect an exception ...");

  try {
    weatherRecords[0].temperature = 40.0;
  } catch (err) {
    console.log(`Exception while setting temperature value: ${err}`);
  }

} else {
  // Oh oh
  console.log("\nNo records processed :(");
}

console.log("\nRepeating with spread operator ...");

const weatherRecords2 = data.records.map(record => {

  // Assign enumerable properties (shallow-copy only as references to nested objects should be copied)
  const weatherRecord = {...record};

  Object.freeze(weatherRecord);

  console.log(`\nPopulated record toString():    ${weatherRecord.toString()}`);
  console.log(`Populated record:`);
  console.log(weatherRecord);

  return weatherRecord;
});

