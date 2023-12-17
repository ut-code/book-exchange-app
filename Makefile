up: 
	docker-compose up
	# psql postgresql://postgres_local_username:postgres_local_password@localhost:48832/book_exchange_app < docker-entrypoint-initdb.d/init.sql

setup: server/install web/install 
	npm install
	npm ci
	cd packages/server && npm run prisma:generate

all: server/build web/build

make dev: server/dev web/dev 

server/dev:
	cd packages/server && npm install && npm run dev

spellCheck:
	npm run spellCheck

lint:
	npm install
	npm run lint

lint/fix:
	npm install
	npm run lint-fix
	
web/dev:
	cd packages/web && npm install && npm run dev

server/build:
	cd packages/server && npm run build

web/build:
	cd packages/web && npm run build

server/install:
	cd packages/server && npm ci

web/install:
	cd packages/web && npm ci

# DATABASE_URL="postgresql://postgres_local_username:postgres_local_password@localhost:48832/book_exchange_app"
# データベースにサンプルデータを投入する
db/init:
	psql postgresql://postgres_local_username:postgres_local_password@localhost:48832/book_exchange_app < sample_data.sql
