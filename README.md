# multipart-lambda-ts-v2

## Introduction

Parse multipart-form with this module for AWS Lambda. It supports files and fields using the lambda event object coming from AWS API Gateway. Works well parsing binary and text files.

This is a fork of [francismeynard/lambda-multipart-parser](https://github.com/francismeynard/lambda-multipart-parser) which integrates the following changes:

- Update busboy library to newest version (1.6.0)
- Support for lambda payload format V2.0 (`APIGatewayProxyEventV2`)
- Typescript support

## Installation

```bash
npm install multipart-lambda-ts-v2
```

## Description

```bash
@param {event} - an event containing the multipart-form in the body
@return {object} - a JSON object containing array of files and fields, sample below.

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
```

## Usage

```bash
const parser = require('multipart-lambda-ts-v2');

const result = await parser.parse(event);
console.log(result.files);
```

**Important**
Please make sure to enable the "Use Lambda Proxy integration" in API Gateway method Integration request.

If decided not to enable it for some reason, make sure to pass the required Lambda event parameters in Integration Request -> Mapping Templates section, such as body, headers and isBase64Encoded flag.

## Test

```bash
npm run test
```

## Releases / Changelogs

0.0.1 - Initial stable release.

0.0.2 - Updated readme. Added Usage and link to sample implementation.

1.0.0 - Formalized package release version. Add utf8 support.

1.0.1 - Added support for TypeScript typings.

1.1.0 - Added support for payload format V2.0. Updated Typescript bindings. Updated busboy to 1.6.0.
