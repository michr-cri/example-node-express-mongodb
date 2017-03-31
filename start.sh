#!/bin/bash

if [ ! -z "$EXAMPLE_NODE_EXPRESS_MONGODB_DB_CONNECTION_STRING" ];then 
	nohup npm start -- --pname=example-node-express-mongodb >/dev/null 2>&1 &
else
    git pull --rebase
    npm install
	npm run start:local -- --pname=example-node-express-mongodb &
fi
