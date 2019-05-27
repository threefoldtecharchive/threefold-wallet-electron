dev:
	yarn dev

clean:
	rm -rf package-lock.json
	rm -rf node_modules
	yarn cache clean --force
	npm install
