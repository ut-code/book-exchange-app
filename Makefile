install/dependencies: server/install web/install 
	npm ci

all: server/build web/build

lint:
	npm run lint

lint/fix:
	npm run lint-fix

server/dev:
	cd packages/server && npm run dev

spellCheck:
	npm run spellCheck
	
web/dev:
	cd packages/web && npm run dev

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
