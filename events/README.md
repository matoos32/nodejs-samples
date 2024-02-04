# emit_events.js

This app exercises multiple aspects of Node/JavaScript:

- `EventEmitter`
- UUID generation
- Pseudo-random number generation
- The global `setTimeout()` method to start timers
- Maps
- Classes
- Composing objets at runtime
- Logging of ISO-formatted timestamps and JSON-stringified objects

The app builds a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
of different event types that have different associated payloads. It also creates an
[EventEmitter](https://nodejs.org/api/events.html#class-eventemitter) and uses `on()` to hook an
event logging callback for each event type. A very simple *Weather* class is used to aggregate
weather dimensions for a *Weather* event payload.

It then loops to generate a
[pseudo-random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
timeout interval and to pseudo-randomly pick an event type to emit. A timer is started each
iteration whose ID is recorded and whose callback invokes `emit()` on the emitter.

A [UUID](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) is used to trace specific timer
initiations to specific event emissions. The UUIDs and random interval durations are added as
decorators to the event payload data-structure.

As timers are started with [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
the intervals logged appear random in magnitude but as timers elapse the shortest interval events
are emitted and logged first, followed by the longest interval ones. The UUIDs are a visual aid in
understanding the log sequence.

All log messages are prefixed with a standard [formatted UTC ISO timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

## Sample Usage and Output

`$ node events/emit_events.js`

```text
<2024-02-04T01:30:14.188Z> Started timer [timerId:8 uuid:809bd0e6-b648-466f-b3c5-8792780e51d1 interval(s):3.955]
<2024-02-04T01:30:14.198Z> Started timer [timerId:13 uuid:7b56a1cc-6441-4257-8fbf-1a38054c017a interval(s):2.932]
<2024-02-04T01:30:14.198Z> Started timer [timerId:14 uuid:734cb116-0afa-4147-826f-d33b4f02d655 interval(s):4.401]
<2024-02-04T01:30:14.199Z> Started timer [timerId:15 uuid:6a2e1fab-65e0-4b77-9bfe-c3b48f2d414b interval(s):2.968]
<2024-02-04T01:30:14.199Z> Started timer [timerId:16 uuid:55097bfa-884b-4b81-8d28-82d5f3806c63 interval(s):9.577]
<2024-02-04T01:30:17.132Z> New event: Weather [{"uuid":"7b56a1cc-6441-4257-8fbf-1a38054c017a","interval":"2.932s","data":{"temperature":32.7,"humidity":45.8,"uv":6}}]
<2024-02-04T01:30:17.169Z> New event: Weather [{"uuid":"6a2e1fab-65e0-4b77-9bfe-c3b48f2d414b","interval":"2.968s","data":{"temperature":32.7,"humidity":45.8,"uv":6}}]
<2024-02-04T01:30:18.155Z> New event: Hello [{"uuid":"809bd0e6-b648-466f-b3c5-8792780e51d1","interval":"3.955s","data":"World!"}]
<2024-02-04T01:30:18.616Z> New event: Calendar [{"uuid":"734cb116-0afa-4147-826f-d33b4f02d655","interval":"4.401s","data":"2024-02-04T01:30:14.187Z"}]
<2024-02-04T01:30:23.792Z> New event: Calendar [{"uuid":"55097bfa-884b-4b81-8d28-82d5f3806c63","interval":"9.577s","data":"2024-02-04T01:30:14.187Z"}]
```