docker compose up

psql postgresql://postgres_local_username:postgres_local_password@localhost:48832/book_exchange_app < docker-entrypoint-initdb.d/init.sql

cd packages/server && npx prisma db push && npx prisma db seed --preview-feature