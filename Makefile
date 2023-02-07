build:
	docker build -t aulianabil/onboarding-fe .

push:
	docker push aulianabil/onboarding-fe:latest

up:
	docker compose up

down:
	docker compose down

install:
	helm upgrade --install onboarding-fe ./chart --values ./chart/values-sub.yaml -n onboarding-nabil

uninstall:
	helm uninstall onboarding-fe -n onboarding-nabil

template:
	helm template onboarding-fe ./chart --values ./chart/values-sub.yaml -n onboarding-nabil

check:
	helm install --debug --dry-run onboarding-fe ./chart --values ./chart/values-sub.yaml -n onboarding-nabil

env:
	cat ./chart/values.yaml | envsubst | tee ./chart/values-sub.yaml