include ./.env.docker

#Builds the container
up:
	docker compose -f $(DOCKER_COMPOSE_FILE) --env-file .env.docker up --build

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) --env-file .env.docker down
	docker container prune
	docker image prune -a
env:
	$(MAKE) fix-env
	cat $(PWD)/.env.local >> $(PWD)/src/.env

fix-env:
	if [ -a $(PWD)/src/.env ]; \
		then rm -f $(PWD)/src/.env; \
	fi
	touch $(PWD)/src/.env

generate-database-types:
	docker exec -it $(WEBSERVER_CONTAINER_NAME) npm run database:generate-types

init:
	echo "Microservice Template Initializing"
	$(MAKE) env
	$(MAKE) up
	$(MAKE) generate-database-types

node:
	  docker exec -it $(WEBSERVER_CONTAINER_NAME) /bin/sh