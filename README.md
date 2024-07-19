# Medical Appointment App

This medical appointment application is designed to facilitate the management of appointments between patients and doctors. It uses a microservices architecture to have high scalability and modular maintenance.

## Technologies

- NestJS: node.js framework
- MongoDB: database
- Docker: deploy

## Architecture

The application is composed of the following microservices:

- User Microservice: Manages user information, registration and authentication for a secure app.
- Appointment Microservice: Handles the creation, modification, and cancellation of medical appointments.
- Gateway: Is a single entry point for the application, routing requests to the appropriate microservices.

## Environment Variables

### For each microservices:

- Open microservice folder

  ```
  cd [microservice name]
  ```

- Copy the ".env.example" file to ".env"

  ```
  cp .env.example .env
  ```

- Finally open the ".env" file and set the required variables.

## Installation

You need to have a Mongodb database running

- Clone and open the repository

  ```
  git clone https://github.com/Gonza0922/NestJS-Microservices-Medical-Appointment-App
  cd NestJS-Microservices-Medical-Appointment-App
  ```

- Install dependencies for each microservice:

  ```
  cd user-microservice
  npm install

  cd ../appointment-microservice
  npm install

  cd ../gateway
  npm install
  ```

- Start the microservices and the gateway:

  ```
  cd user-microservice
  npm run start

  cd ../appointment-microservice
  npm run start

  cd ../gateway
  npm run start
  ```

## Installation with Docker

- Clone and open the repository

  ```
  git clone https://github.com/Gonza0922/NestJS-Microservices-Medical-Appointment-App
  cd NestJS-Microservices-Medical-Appointment-App
  ```

- In the root, copy the ".env.example" file to ".env"

  ```
  cp .env.example .env
  ```

- Finally open the ".env" file and set the required variables.

- Run docker-compose:

  ```
  docker compose up
  ```

## API Documentation

This project uses Swagger to generate the API documentation. Swagger provides a interface to explore and test the API endpoints.

### Accessing the API Documentation

- Ensure the gateway server is running.
- Open your web browser and navigate to the following URL: http://localhost:3000/api-docs
- You should see the Swagger UI with the complete documentation of the API gateway.
