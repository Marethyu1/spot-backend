# spot-backend
Backend for Spot

# Running Spot
## Local instance 
Running a local instance uses docker-compose to build the node app and a db.
Build the containers with:

```docker-compose up ```

Start the containers by running:

```docker-compose up ```

Or do it all in one with:

 ```docker-compose up --build```

### Dev Mode
Dev mode is slightly different to the local instance. It overlays the [docker-compose.yml](./docker-compose.yml) with the [docker-compose-dev.yml](docker-compose-dev.yml).
This enables hot reloading with [nodemon](https://www.npmjs.com/package/nodemon) by mounting the local file system to the docker container. 
Build the containers with:

``` docker-compose -f docker-compose.yml -f docker-compose-dev.yml build```

Start the containers by running:

``` docker-compose -f docker-compose.yml -f docker-compose-dev.yml up```

Or do it all in one with:

``` docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build ```
