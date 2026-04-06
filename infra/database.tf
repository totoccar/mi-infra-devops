resource "aws_dynamodb_table" "project_clicks" {
  name         = "portfolio-project-clicks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "project-analytics"
  }
}