#!/usr/bin/env bash

set -e
npm run build
cp package.json ./dist
cd ./dist
npm pack