# Variables
DOCKER_COMPOSE_FILE=docker-compose.yml
TEST_APP_DIR=test-app
APP_DIR=app

# Targets
.PHONY: start start-infra stop start-dev test-e2e test-full

start:
	docker compose -f $(DOCKER_COMPOSE_FILE) build
	docker compose -f $(DOCKER_COMPOSE_FILE) up -d

start-infra:
	docker compose -f $(DOCKER_COMPOSE_FILE) up -d db adminer

start-dev: start-infra
	cd $(APP_DIR) && npm run start:dev

stop:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

test-e2e: start
	cd $(TEST_APP_DIR) && npm install && npm run test:watch

test-full: stop start-infra
	cd $(APP_DIR) && npm run test && cd .. && $(MAKE) stop &&$(MAKE) test-e2e