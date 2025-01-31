# Appointment Booking Challenge

## Setup

1. Ensure you have Docker and Docker Compose installed.
2. Clone the repository and navigate to the project directory.

## Makefile Targets

- `make start`: Build and start all services defined in the Docker Compose file.
- `make start-infra`: Start only the database and adminer services.
- `make start-dev`: Start the infrastructure and run the development server.
- `make stop`: Stop all running services.
- `make test-e2e`: Start the services, install dependencies, and run end-to-end tests in watch mode.
- `make test-full`: Start the services, run application tests (unit, integration), and then run end-to-end tests.

## Running Tests

- To run e2e tests in watch mode, use:
  ```sh
  make test-e2e
  ```
- To run e2e tests once, make sure server is running then run:

  ```sh
  cd test-app && npm run test
  ```

## License

This project is licensed under the ISC License.
