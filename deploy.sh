#!/bin/sh
set -e

npm run-script build
aws s3 cp --recursive --acl public-read build/ s3://26hardekool.party
