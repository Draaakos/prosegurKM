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
# cp -rfv src/client/assets/webfonts/* static/$HASH_FOLDER/webfonts
# cp -vrf src/client/js/vendor/* static/$HASH_FOLDER/js/vendor

# cat node_modules/react-toastify/dist/ReactToastify.min.css >> static/$HASH_FOLDER/css/colors.css
