# Definir el proovedor
provider "aws" {
    region = "us-east-1"
}

# Configurar el bloque de acceso público para permitir el acceso público al bucket
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.my_portfolio.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Crear el bucket de S3
resource "aws_s3_bucket" "my_portfolio" {
    bucket = "portfolio-antonio-carlos-2000"   
}

# Crear el bucket de S3 para hosting estático
resource "aws_s3_bucket_website_configuration" "config" {
    bucket = aws_s3_bucket.my_portfolio.id

    index_document {
        suffix = "index.html"
    }

    error_document {
        key = "error.html"
    }    
}

resource "aws_s3_bucket_policy" "allow_public_access"{
    bucket = aws_s3_bucket.my_portfolio.id
    depends_on = [aws_s3_bucket_public_access_block.public_access]
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Sid = "PublicReadGetObject"
                Effect = "Allow"
                Principal = "*"
                Action = "s3:GetObject"
                Resource = "${aws_s3_bucket.my_portfolio.arn}/*"
            }
        ]
    })
}

output "website_url" {
     value = aws_s3_bucket_website_configuration.config.website_endpoint
}

# CloudFront para distribuir el contenido del bucket
locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
    origin {
        domain_name = aws_s3_bucket.my_portfolio.bucket_regional_domain_name
        origin_id   = local.s3_origin_id
    }
    
    enabled             = true
    is_ipv6_enabled     = true
    comment             = "CloudFront distribution for S3 bucket"
    default_root_object = "index.html"
    
    # Configurar el comportamiento de caché para redirigir a HTTPS y permitir solo GET y HEAD
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

 output "cloudfront_url"{
        value = aws_cloudfront_distribution.s3_distribution.domain_name
    }

