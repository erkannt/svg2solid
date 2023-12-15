.PHONY: clean dev format typescript watch-typescript build

dev: node_modules
	npx parcel -p 8080 src/index.html

node_modules: package.json package-lock.json
	npm install
	touch node_modules

format: node_modules
	npx prettier --ignore-unknown --write '**'

typescript: node_modules
	npx tsc --noEmit

watch-typescript: node_modules
	npx tsc --noEmit --watch

build:
	npx parcel build src/index.html --no-source-maps --public-url https://erkannt.github.io/svg2solid/

clean:
	rm -rf node_modules
	rm -rf .parcel-cache
	rm -rf dist