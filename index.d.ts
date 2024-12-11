declare module "lambda-multipart-parser" {
    import {
        APIGatewayProxyEvent,
        APIGatewayProxyEventV2,
    } from "aws-lambda"

    interface MultipartFile {
        filename: string
        content: Buffer
        contentType: string
        encoding: string
        fieldname: string
    }

    type MultipartRequest = { files: MultipartFile[] } & Record<string, string>

    export function parse (event: APIGatewayProxyEvent | APIGatewayProxyEventV2): Promise<MultipartRequest>
}
