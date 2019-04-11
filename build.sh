#!/bin/sh

set -e

docker build -t 4ply/26hardekool.party.web --no-cache -f=docker/Dockerfile .
