#Quick Start

```
npm install
```

##To start the app
```
./start.sh
```

If mongodb is not downloaded, it will be downloaded into 'mongodb-download' directory

##To stop the app
```
./stop.sh
```

##To stop mongodb
```
npm run stopMongoDB
```
This will drop the whole database and shut down the mongodb server

##To Deploy
On the server you want to run this application, you need to set the following environment variables:

<PROJECT_NAME> below has to substituted with the project name specified by the "name" attribute of package.json where "-" characters are replaced by "_" and all the letters are capitalized.
 e.g.: name: example-node-express-mongodb then <PROJECT_NAME> is EXAMPLE_NODE_EXPRESS_MONGODB

1. <PROJECT_NAME>_DB_CONNECTION_STRING
2. <PROJECT_NAME>_LOG_FILE_DIR

These environment variables are read by env.variable.reader.js module so that file will always have the most up to date list of environment variables needed to be set.

