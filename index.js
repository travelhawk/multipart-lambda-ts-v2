'use strict';

const busboy = require('busboy');

/*
 * This module will parse the multipart-form containing files and fields from the lambda event object.
 * @param {event} - an event containing the multipart-form in the body
 * @return {object} - a JSON object containing array of files and fields, sample below.
    {
        files: [
            {
                filename: 'test.pdf',
                content: <Buffer 25 50 6f 62 ... >,
                contentType: 'application/pdf',
                encoding: '7bit',
                fieldname: 'uploadFile1'
            }
        ],
        field1: 'VALUE1',
        field2: 'VALUE2',
    }
 */
const parse = (event) => new Promise((resolve, reject) => {
    const bb = busboy({
        headers: event.headers
    });
    const result = {
        files: []
    };

    bb.on('file', (name, file, info) => {
        const uploadFile = {};

        file.on('data', data => {
            uploadFile.content = data;
        });

        file.on('close', () => {
            if (uploadFile.content) {
                uploadFile.filename = info.filename;
                uploadFile.contentType = info.mimeType;
                uploadFile.encoding = info.encoding;
                uploadFile.fieldname = name;
                result.files.push(uploadFile);
            }
        });
    });

    bb.on('field', (name, val, info) => {
        result[name] = val;
    });

    bb.on('error', error => {
        reject(error);
    });

    bb.on('close', () => {
        resolve(result);
    });

    const encoding = event.encoding || (event.isBase64Encoded ? "base64" : "binary");

    bb.write(event.body, encoding);
    bb.end();
});

module.exports.parse = parse;