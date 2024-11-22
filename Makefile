include ./.env.docker


#Builds the container
up:
	docker compose -f $(DOCKER_COMPOSE_FILE) --env-file .env.docker up --build

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) --env-file .env.docker down
	docker container prune
	docker image prune -a


node:
	  docker exec -it $(WEBSERVER_CONTAINER_NAME) /bin/sh