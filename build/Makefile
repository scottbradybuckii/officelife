# Basic Settings
# See https://docs.docker.com/compose/reference/envvars/
export COMPOSE_FILE=docker-compose.yml
export COMPOSE_PROJECT_NAME=example
export LOCAL_DOMAIN=$(COMPOSE_PROJECT_NAME).localhost
export LARAVEL_VERSION=9.*

# Paths
export SRC_ROOT=../src

# Image Build Settings
export DOCKER_BUILDKIT=1

# App Settings
export APP_NAME=example
export APP_ENV=local
export APP_KEY=base64:NTrXToqFZJlv48dgPc+kNpc3SBt333TfDnF1mDShsBg=
export APP_DEBUG=true
export APP_LOG_LEVEL=debug
export APP_URL=https://$(LOCAL_DOMAIN)

# DB Settings
export DB_CONNECTION=pgsql
export DB_HOST=db
export DB_DATABASE=laravel
export DB_USERNAME=laravel
export DB_PASSWORD=laravel
export DB_PORT=5432

# Email Settings
export MAIL_DRIVER=smtp
export MAIL_HOST=mailhog
export MAIL_PORT=1025
export MAIL_USERNAME=null
export MAIL_PASSWORD=null
export MAIL_ENCRYPTION=null

# Cache settings
export MEMCACHED_HOST=memcached
export CACHE_DRIVER=memcached
export SESSION_DRIVER=memcached

# Container execs
DB_CONTAINER_NAME=docker ps --format '{{.Names}}' --filter "name=$(COMPOSE_PROJECT_NAME)_db | head -n1"
DOCKER_WEB_EXEC=docker compose exec --user=application web
DOCKER_DB_EXEC=docker compose exec db
DOCKER_DB_COMMAND=docker compose exec -T db

# SQL related
PG_DUMP=pg_dump -Fc -U $$POSTGRES_USER $$POSTGRES_USER
PG_DUMP_SSH=pg_dump -Fc -U \$$POSTGRES_USER \$$POSTGRES_USER
PG_RESTORE=pg_restore -U $$POSTGRES_USER --single-transaction -d $$POSTGRES_USER
SQL_BACKUP_FILE=backup.psql

# Environment Specific Variable Overrides
-include env.mk

up:
ifndef NO_PULL
	docker compose pull
endif
	docker compose up -d

logs:
	docker compose logs -f --tail=100

down:
	docker compose down
	docker compose rm

web-shell:
	$(DOCKER_WEB_EXEC) bash

seed:
	$(DOCKER_WEB_EXEC) php artisan migrate --seed

watch:
	$(DOCKER_WEB_EXEC) yarn watch

install-packages:
	$(DOCKER_WEB_EXEC) composer install
	$(DOCKER_WEB_EXEC) yarn

# DB Management
db-shell:
	$(DOCKER_DB_EXEC) psql -U $(DB_USERNAME)

drop-db:
	$(DOCKER_DB_COMMAND) psql -U $(DB_USERNAME) -c "drop schema if exists public cascade; create schema if not exists public"

import-db: drop-db
	-$(DOCKER_DB_COMMAND) sh -c '$(PG_RESTORE)' < $(SQL_BACKUP_FILE)

export-db:
	$(DOCKER_DB_COMMAND) sh -c '$(PG_DUMP)' > $(SQL_BACKUP_FILE)
