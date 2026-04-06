resource "aws_iam_role" "lambda_role" {
  name = "portfolio_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "dynamo_policy" {
  name        = "lambda_dynamo_policy"
  description = "Policy to allow Lambda to write to DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
        Effect   = "Allow"
        Resource = aws_dynamodb_table.project_clicks.arn
        }, {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })

}

resource "aws_iam_role_policy_attachment" "attach_dynamo" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.dynamo_policy.arn
}