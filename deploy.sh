#!/bin/bash

# Make all these env vars

cd ./client

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/x3j9d8d0
docker build -t template-ui .
docker tag template-ui:latest public.ecr.aws/x3j9d8d0/template-ui:latest
docker push public.ecr.aws/x3j9d8d0/template-ui:latest

cd ../server

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/x3j9d8d0
docker build -t template-server .
docker tag template-server:latest public.ecr.aws/x3j9d8d0/template-server:latest
docker push public.ecr.aws/x3j9d8d0/template-server:latest