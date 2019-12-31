DB_NAME=demo

docker-up:
	docker-compose -f ./docker-compose.yml up -d --build
docker-down:
	docker-compose -f ./docker-compose.yml down
create-schema:
	docker exec -it postgres psql -U admin -c "CREATE DATABASE $(DB_NAME)"
breakdown:
	docker exec -it postgres psql -U admin -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$(DB_NAME)';"
	${MAKE} drop-db
drop-db:
	docker exec -it postgres psql -U admin -c "DROP DATABASE IF EXISTS $(DB_NAME)"
create-tables:
	node ./db/builder/create-tables.js
setup:
	${MAKE} create-schema
	${MAKE} create-tables