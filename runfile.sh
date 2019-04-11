#!/bin/sh

docker kill 26hardekool.party.web
docker rm 26hardekool.party.web

set -e

docker run -d \
    --name 26hardekool.party.web \
    --restart always \
    -p 16700:80 \
    --cpuset-cpus "0,1" \
    4ply/26hardekool.party.web:latest
