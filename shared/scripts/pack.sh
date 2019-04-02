#!/usr/bin/env bash

set -e
ls -la
npm run build
cp package.json ./dist
cd ./dist
npm pack