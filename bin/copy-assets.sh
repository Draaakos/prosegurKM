#!/bin/bash

echo "removing static files"
rm -rf static
rm -rfv static
rm -rfv static/*

echo "creating hash code"
node bin/create-hash.js
HASH_FOLDER=$(cat bin/hash.txt)

mkdir -p static/$HASH_FOLDER
mkdir -p static/$HASH_FOLDER/css
mkdir -p static/$HASH_FOLDER/js
mkdir -p static/$HASH_FOLDER/js/vendor
mkdir -p static/$HASH_FOLDER/webfonts

cp -rvf src/images static/$HASH_FOLDER/images
cp -rvf src/fonts static/$HASH_FOLDER/fonts
