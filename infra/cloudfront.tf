locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "s3-portfolio-oac"
  description                       = "OAC para el portfolio de Antonio"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
  domain_name              = aws_s3_bucket.my_portfolio.bucket_regional_domain_name
  origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  origin_id                = "S3-Portfolio"
}

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for S3 bucket"
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = "dev"
    Project     = "PortfolioWebsite"
  }
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

