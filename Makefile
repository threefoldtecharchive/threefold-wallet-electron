all: tfchain-py dev

dev:
	yarn dev

tfchain-py:
	yarn build-py

clean:
	rm -rf package-lock.json
	rm -rf node_modules
	yarn cache clean --force
	npm install
