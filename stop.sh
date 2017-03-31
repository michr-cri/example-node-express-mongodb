#!/usr/bin/env bash

PROCESS_ID=$(ps aux|grep 'example-node-express-mongodb'|grep -v 'grep'|grep -v 'bash'|awk '{print $2}')
if [ ! -z "$PROCESS_ID" ];then
	echo "process id exists"
	kill -9 $PROCESS_ID
else
	echo "process id does not exists"
	exit 0
fi
