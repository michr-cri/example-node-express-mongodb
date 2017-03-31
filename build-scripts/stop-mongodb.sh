#!/usr/bin/env bash
mongodb-download/bin/mongo example-node-express-mongodb --eval "db.dropDatabase()"
mongodb-download/bin/mongo --eval "db.getSiblingDB('admin').shutdownServer()"