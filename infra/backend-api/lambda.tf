data "archive_file" "lambda_zip" {
    type = "zip"
    source_file = "${path.module}/lambda-src/index.js"
    output_path = "${path.module}/lambda_function.zip"
}

resource "aws_lambda_function" "track_clicks" {
    filename      = data.archive_file.lambda_zip.output_path
    function_name = "track-project-clicks"
    handler       = "index.handler"
    runtime       = "nodejs20.x"
    role          = aws_iam_role.lambda_role.arn
    source_code_hash = data.archive_file.lambda_zip.output_base64sha256
}