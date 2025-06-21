.PHONY: help up setup install dev build test lint clean db-init spellcheck
.DEFAULT_GOAL := help

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start Docker containers
	docker-compose up

setup: install ## Full project setup
	npm run prisma:generate

install: ## Install all dependencies
	npm ci

dev: ## Start development servers
	npm run dev

server-dev: ## Start server in development mode
	npm run server:dev

web-dev: ## Start web app in development mode
	npm run web:dev

build: ## Build all packages
	npm run build

server-build: ## Build server
	npm run server:build

web-build: ## Build web app
	npm run web:build

test: ## Run all tests
	npm run test

typecheck: ## Run type checking
	npm run typecheck

lint: ## Run linting
	npm run lint

lint-fix: ## Fix linting issues
	npm run lint-fix

format: ## Format code
	npm run format

format-check: ## Check code formatting
	npm run format:check

spellcheck: ## Run spell checking
	npm run spellCheck

clean: ## Clean build artifacts and node_modules
	npm run clean

db-init: ## Initialize database with sample data
	psql postgresql://postgres_local_username:postgres_local_password@localhost:48833/book_exchange_app < sample_data.sql
