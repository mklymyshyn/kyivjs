.PHONY: build style deploy

BASE=/home/apps/kyivjs.org.ua
SKIP_FILES=Makefile .git tools
HOST=apps@klymyshyn.com

update: 
	git pull origin master

deploy: 
	@echo Deploying...
	rsync $(foreach fl,$(SKIP_FILES),--exclude=$(fl)) \
		-avz ./ -e ssh $(HOST):$(BASE)


