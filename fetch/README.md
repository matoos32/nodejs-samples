# fetch_image.js

This app exercises multiple aspects of Node/JavaScript:

- App input arguments with `process.argv[n]`
- `async` and `await`
- `try` / `catch` / `throw`
- HTTP Headers
- `fetch()`
- Byte arrays
- File-system with promises
- `console.log()` / `console.error()`
- Process exit codes

The app first tests if the user provided a URL to fetch. It assumes the supplied input argument is a
URL for a JPG image but it actually accepts any type of supported image by setting an HTTP `Accept`
[Header](https://developer.mozilla.org/en-US/docs/Web/API/Headers) to `image/*`.

It then creates a [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) options object
with a `GET` method and by nesting the headers object, then it invokes
[fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) using `await`.

If it receives an *OK* response it then `await`s for a response byte array representing the fetched
image.

As a final step it uses `await` to `async` write the received bytes to a file with hard-coded name.
The extension is always `.jpg`.

The app logs what is happening as operations progress towards completion.

## Possible Improvements

- Instead of always using `.jpg`, add a means to dynamically specify or determine the correct file
  extension when writing the file. Otherwise change the `Accept` header to only accept `jpeg`.

## Sample Usage and Output

Interacting with an image from <https://en.wikipedia.org/wiki/File:Red_Apple.jpg>

`$ node fetch/fetch_image.js https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg`

```text
Fetching https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg ...
Waiting for bytes ...
Got the bytes. Saving them to file ...
Wrote file ./fetched.jpg!
Done!
```
