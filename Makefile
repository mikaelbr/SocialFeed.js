all: deps bundle

deps:
	npm install && bower install

resources:
	node make resources

bundle:
	node make all

.PHONY: deps bundle