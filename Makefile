
docker-build:
	docker-compose build

docker-up:
	docker-compose -f docker-compose.yaml up -d
	@sleep 2
	@docker logs fable

docker-down:
	docker-compose down --remove-orphans -v

docker-test:
	docker-compose -f docker-compose.test.yaml up
