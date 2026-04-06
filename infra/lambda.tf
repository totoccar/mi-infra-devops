data "archive_file" "lambda_zip" {
    type = "zip"
    source_dir = "${path.module}/lambda-src"
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

resource "aws_lambda_function_url" "track_clicks_url" {
    function_name = aws_lambda_function.track_clicks.function_name
    authorization_type = "NONE"

    cors {
        allow_origins = ["*"]
        allow_methods = ["POST"]
        allow_headers = ["content-type"]
        max_age = 3600
    }
}

output "lambda_url" {
  value       = aws_lambda_function_url.track_clicks_url.function_url
}
