#!/usr/bin/env bash

if [ ! -d mongodb-download ]; then
    node ./node_modules/mongodb-download/built/mongodb-download-cli.js --downloadDir=./
fi

if [ -f mongodb-download/*.tgz ];
then
    tar xzvf mongodb-download/*.tgz -C mongodb-download
    rm -rf mongodb-download/*.tgz
    mv mongodb-download/mongodb*/* mongodb-download/
    rmdir mongodb-download/mongodb*
fi

mongodb-download/bin/mongo --eval "db.stats()"

RESULT=$?   # returns 0 if mongo eval succeeds

if [ $RESULT -ne 0 ]; then
    mkdir -p mongodb-download/data/db
    mongodb-download/bin/mongod --dbpath mongodb-download/data/db/ &
    mongodb-download/bin/mongoimport -d example-node-express-mongodb -c applications --jsonArray < data/application.json
fi
