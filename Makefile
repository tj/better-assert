
test: node_modules
	@./node_modules/.bin/mocha \
		--reporter spec \
		--bail

node_modules:
	@npm install

.PHONY: test
