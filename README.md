Internet Banking Application - HCMUS

## Setup & Run

1. Install Docker, Docker Compose
2. At project folder, run:

```
# Setup for BE & FE
docker-compose -f docker-compose.yml -f docker-compose-app.yml up

# Only BE
docker-compose up

# Rebuild
docker-compose build
```

## Usage

Front-end

```
http://localhost:4200
``` 

Back-end:

```
http://localhost:8800
``` 

Database:

```
http://localhost:5432/banking
``` 
