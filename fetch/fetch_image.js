/*
* [fetch_image.js]
*
* MIT License
* 
* Copyright (c) 2024 Matt E
*
* Usage:  node fetch_image.js <URL>
* Output: fetched.jpg
*/

import fs from 'node:fs/promises';

const writeBytes = async (filePath, bytes) => {
    try {
        await fs.writeFile(filePath, bytes);
        console.log(`Wrote file ${filePath}!`);
    } catch (err) {
        console.error("Failed to write bytes to file!");
        throw err;
    }
}

const url = process.argv[2];

if (!url) {
    console.error("Source URL not specified.");
    process.exit(1);
}

const headers = new Headers();
headers.append("Accept", "image/*");

const cfg = {
    method: "GET",
    headers,
    cache: "default",
};

console.log(`Fetching ${url} ...`);

const resp = await fetch(url, cfg);

let retcode = 0;

if (!(resp && resp.ok)) {

    console.error("Error while fetching!");
    retcode = 1;

} else {

    console.log("Waiting for bytes ...");

    const buf = await resp.arrayBuffer();

    const uint8ArrayView = new Uint8Array(buf);

    const imgFilename = "fetched.jpg";

    console.log("Got the bytes. Saving them to file ...");

    await writeBytes("./" + imgFilename, uint8ArrayView);

    console.log("Done!");
}

process.exit(retcode);
