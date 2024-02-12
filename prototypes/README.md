# json_to_obj.js

This app exercises multiple aspects of Node/JavaScript:

- Using [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  to convert JSON strings to objects.
- Defining an object prototype with default values.
- Using [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  to translate parsed JSON objects into new prototype instances.
- Using [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  static methods to:
  - Add a [non-enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
  method to the prototype using
  [defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  - [create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  new object instances from the prototype.
  - [assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  parsed JSON data to new object instances.
  - [freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
  the populated object instances to make them an immutable record.
- Using [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
  to test modifying the immutable record and expecting an exception.

The app defines a hard-coded JSON string representing some weather data records. It parses the string
into a consummable object with nested array test data.

A weather record prototype object is then defined. It defines a `toString()` function property on the
prototype to generate strings representing the records.

The app iterates over all test data records that were parsed and for each one maps the record to a new
instance of the weather record prototype. `Object.create()` then `Object.assign()` are used to
accomplish this. As a last step, `Object.freeze()` is used to make the new instances immutable (a true record).

The app logs the new instances with default values and the same instances after assigning and freezing.

As a final step, the app demonstrates the immutability by testing if it can assign a value to a property.
This operation fails as expected in a try/catch block.

## See Also

[Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

## Sample Usage and Output

`$ node prototypes/json_to_obj.js`

```text
Weather record prototype:
{
  recorded_at: null,
  latitude: 0,
  longitude: 0,
  temperature: 0,
  humidity: 0,
  uv: 0
}

Parsed record:
{
  recorded_at: '2024-02-12T00:27:38.495Z',
  latitude: 44.75,
  longitude: -34.0023,
  temperature: 31.78,
  humidity: 56.1,
  uv: 6
}
New record instance: [ts:null, location:(0,0), t:0, h:0, uv:0]
Populated record:    [ts:2024-02-12T00:27:38.495Z, location:(44.75,-34.0023), t:31.78, h:56.1, uv:6]

Parsed record:
{
  recorded_at: '2024-02-12T00:31:12.106Z',
  latitude: 44.72,
  longitude: -34.47,
  temperature: 32.4,
  humidity: 60.3,
  uv: 5.34
}
New record instance: [ts:null, location:(0,0), t:0, h:0, uv:0]
Populated record:    [ts:2024-02-12T00:31:12.106Z, location:(44.72,-34.47), t:32.4, h:60.3, uv:5.34]

Parsed record:
{
  recorded_at: '2024-02-12T00:35:53.708Z',
  latitude: 44.73,
  longitude: -34.95,
  temperature: 32.29,
  humidity: 59.79,
  uv: 6.1
}
New record instance: [ts:null, location:(0,0), t:0, h:0, uv:0]
Populated record:    [ts:2024-02-12T00:35:53.708Z, location:(44.73,-34.95), t:32.29, h:59.79, uv:6.1]

Listing all records:

1. [ts:2024-02-12T00:27:38.495Z, location:(44.75,-34.0023), t:31.78, h:56.1, uv:6]
2. [ts:2024-02-12T00:31:12.106Z, location:(44.72,-34.47), t:32.4, h:60.3, uv:5.34]
3. [ts:2024-02-12T00:35:53.708Z, location:(44.73,-34.95), t:32.29, h:59.79, uv:6.1]

Attempting to modify a frozen record. We expect an exception ...
Exception while setting temperature value: TypeError: Cannot assign to read only property 'temperature' of object '[object Object]'
```
