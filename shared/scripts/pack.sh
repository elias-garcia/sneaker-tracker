#!/usr/bin/env bash

npm run build
cp package.json ./dist
sed 's#"main": "dist/index.js"#"main": "index.js"#;s#"types": "dist/index.d.ts"#"types": "index.d.ts"#' package.json > ./dist/package.json
cd ./dist
npm pack